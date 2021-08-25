<template>
  <div v-if="message" role="alert"
       class="flex relative bg-red-100 border-t-4 border-red-500 rounded-b px-4 py-3 my-5 shadow-md">
    <div class="py-1">
      <svg class="h-6 w-6 mr-1" xmlns="http://www.w3.org/2000/svg"
           fill="none" viewBox="0 0 30 30" stroke="#f56565">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>
    </div>
    <div>
      <p class="font-bold text-red-500">{{ title ? title : $t('Alert.error') }}</p>
      <p class="text-sm">{{ message }}</p>
    </div>
    <span v-if="canClose" class="absolute top-0 bottom-0 right-0 px-4 py-5 cursor-pointer" @click="$emit('clear')">
      <svg class="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <title>Close</title>
        <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
      </svg>
    </span>
  </div>
</template>


<script>

export default {
  name: 'AlertError',
  emits: ['clear'],
  props: {
    canClose: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Error!'
    },
    message: String
  }
};
</script>

