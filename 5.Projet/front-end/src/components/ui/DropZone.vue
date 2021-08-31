<template>
  <div class="border-dashed border-4 border-gray-400">
    <div v-bind="getRootProps()" class="p-12">
      <input v-bind="getInputProps()">
      <p v-if="isDragActive" class="italic text-gray-600 text-center">{{ $t('Dropzone.drop') }}</p>
      <p v-else class="italic text-gray-600 text-center">{{ $t('Dropzone.drag-n-drop') }}</p>
    </div>
  </div>
</template>

<script>
import { useDropzone } from 'vue3-dropzone'
import NotificationsService from "@/services/notifications.service";
import ResourcesService from "@/services/resources.service";
import capitalize from "@/utils/capitalize";
import request from "@/utils/request";

export default {
  name: 'DropZone',
  emits: ['msg', 'close'],

  props: {
    type: String,
    project: Object,
    ownerUuid: String
  },

  setup(_, { emit }) {

    // eslint-disable-next-line no-unused-vars
    const saveFiles = (files) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async(resolve, reject) => {
        try {
          const formData = new FormData(); // pass data as a form
          let uploaded = [], filesNames = [];
          for (const file of files) {
            filesNames.push(file.name)
            formData.append("files[]", file);
            const prefix = (_.type === 'feedback' ? '[Feedback] ' : (_.type === 'apply' ? '[Specifications] ' : ''));
            uploaded.push(await request(ResourcesService.create({
              projectUuid: _.project.uuid,
              name: prefix + file.name,
              type: file.type,
              size: file.size,
              link: '#' // TODO
            }), null, emit));
          }

          // TODO Post the formData to your backend where storage is processed.
          // In the backend, loop through the array and save each file through the loop.
          // axios.post(API_BASE_URL, formData, { headers: { 'Content-Type': 'multipart/form-data', } })
          //      .then((response) => { console.info(response.data) })
          //      .catch((err) => { console.error(err) });

          await creatNotif(filesNames);
          resolve(uploaded)
        } catch (error) {
          reject([])
        }
      })
    };

    function onDrop(acceptFiles, rejectReasons) {
      if ((_.type === 'feedback' || _.type === 'apply') && acceptFiles.length !== 1) {
        emit('msg', { status: 'KO', message: 'Please select only one file' });
      }
      else if (rejectReasons.length) {
        console.log(rejectReasons);
        emit('msg', { status: 'KO', message: 'Files rejected' });
      }
      else {
        saveFiles(acceptFiles).then((files) => emit('upload', _.type, files));
      }
    }

    function fullName(user) {
      return capitalize(user.firstName) + ' ' + capitalize(user.lastName)
    }

    async function creatNotif(filesNames) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && user.user && user.user.uuid !== _.ownerUuid) {
        await request(NotificationsService.create({
          userUuid: _.ownerUuid,
          lang: 'en', // owner.lang
          title: 'New file uploaded', // $t('Resources.newFile'),
          description: `${ fullName(user.user) } upload ${ filesNames.length > 1 ? 'new files' : 'a new file' } (${ filesNames.join(', ') }) on project "${ _.project.title }".`,
          // $t('Resources.newFileDesc', { name: fullName(user), file: filesNames.join(', '), project: _.project.title })
          link: '/projects/' + _.project.uuid
        }), null, emit);
      }
    }

    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop })

    return {
      getRootProps,
      getInputProps,
      ...rest
    }
  }
}
</script>
