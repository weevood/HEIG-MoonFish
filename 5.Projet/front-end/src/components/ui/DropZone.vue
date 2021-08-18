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

export default {
  name: 'DropZone',
  emits: ['close'],

  setup(_, { emit }) {
    function onDrop(acceptFiles, rejectReasons) {
      console.log(acceptFiles)
      console.log(rejectReasons)
      emit('close')
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
