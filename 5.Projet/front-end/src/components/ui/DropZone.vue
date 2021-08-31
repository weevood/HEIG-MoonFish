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
import capitalize from "@/utils/capitalize";
import axios from 'axios';
import { API_BASE_URL } from '/config/constants'
import request from "@/utils/request";

export default {
  name: 'DropZone',
  emits: ['close'],

  props: {
    project: Object,
    ownerUuid: String
  },

  setup(_, { emit }) {

    // eslint-disable-next-line no-unused-vars
    const saveFiles = (files) => {
      const formData = new FormData(); // pass data as a form
      for (let x = 0; x < files.length; x++) {
        // append files as array to the form, feel free to change the array name
        formData.append("images[]", files[x]);
      }

      // post the formData to your backend where storage is processed. In the backend, you will need to loop through the array and save each file through the loop.
      axios.post(API_BASE_URL, formData, { headers: { 'Content-Type': 'multipart/form-data', } })
           .then((response) => { console.info(response.data) })
           .catch((err) => { console.error(err) });
    };

    function onDrop(acceptFiles, rejectReasons) {
      console.log(acceptFiles);
      console.log(rejectReasons);

      // saveFiles(acceptFiles); // TODO

      let filesNames = [];
      acceptFiles.forEach((file) => { filesNames.push(file.name) });
      creatNotif(filesNames);
      emit('close');
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
        }), this);
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
