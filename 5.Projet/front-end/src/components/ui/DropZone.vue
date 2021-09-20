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
import request from "@/utils/request";
import inArray from "@/utils/inArray";
import formatName from "@/utils/formatName";
import { useDropzone } from 'vue3-dropzone'
import NotificationsService from "@/services/notifications.service";
import ResourcesService from "@/services/resources.service";

export default {
  name: 'DropZone',
  emits: ['msg', 'close'],

  props: {
    type: String,
    project: Object,
    resources: Object,
    ownerUuid: String
  },

  setup(_, { emit }) {

    let filesNames = _.resources.map(resource => { return resource.name });

    // eslint-disable-next-line no-unused-vars
    const saveFiles = (files) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async(resolve, reject) => {
        try {
          const formData = new FormData(); // pass data as a form
          let uploaded = [], newFilesNames = [];
          for (const file of files) {
            formData.append("files[]", file);
            const prefix = (_.type === 'feedback' ? '[Feedback] ' : (_.type === 'apply' ? '[Specifications] ' : ''));
            const namePart = file.name.split('.')
            const extension = '.' + namePart[namePart.length - 1];
            let version = ''
            let fileName = (prefix + namePart[0] + version + extension); // add extension, ignore middle if name contains other points
            while (inArray(fileName, filesNames)) {
              version = (version === '' ? 1 : ++version);
              fileName = (prefix + namePart[0] + '_v' + version + extension);
            }
            uploaded.push(await request(ResourcesService.create({
              projectUuid: _.project.uuid,
              name: fileName,
              type: file.type,
              size: file.size,
              link: '#'
            }), null, emit));
            newFilesNames.push(fileName);
            filesNames.push(fileName);
          }

          // TODO Post the formData to your backend where storage is processed.
          // In the backend, loop through the array and save each file through the loop.
          // axios.post(process.env.VUE_APP_API_BASE_URL, formData, { headers: { 'Content-Type': 'multipart/form-data', } })
          //      .then((response) => { console.info(response.data) })
          //      .catch((err) => { console.error(err) });

          await creatNotif(newFilesNames);
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

    async function creatNotif(filesNames) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && user.user && user.user.uuid !== _.ownerUuid) {
        await request(NotificationsService.create({
          userUuid: _.ownerUuid,
          lang: 'en', // owner.lang
          title: 'New file uploaded', // $t('Resources.newFile'),
          description: `${ formatName(user.firstName, user.lastName) } upload ${ filesNames.length > 1 ? 'new files' : 'a new file' } (${ filesNames.join(', ') }) on project "${ _.project.title }".`,
          // $t('Resources.newFileDesc', { name: formatName(user.firstName, user.lastName), file: filesNames.join(', '), project: _.project.title })
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
