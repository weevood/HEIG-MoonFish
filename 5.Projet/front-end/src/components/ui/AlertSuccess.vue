<template>
  <div v-if="message" role="alert"
       class="flex relative bg-teal-100 border-t-4 border-teal-500 rounded-b px-4 py-3 my-5 shadow-md">
    <div class="py-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 30 30" stroke="#38b2ac">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <div>
      <p class="font-bold text-teal-500">{{ title ? title : $t('Alert.done') }}</p>
      <p class="text-sm">{{ $t(message) }}</p>
      <p v-if="garnish" class="text-sm" v-html="garnish"></p>
    </div>
    <span v-if="canClose" class="absolute top-0 bottom-0 right-0 px-4 py-5 cursor-pointer" @click="$emit('clear')">
      <svg class="fill-current h-6 w-6 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <title>Close</title>
        <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  name: 'AlertSuccess',
  props: {
    canClose: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'All done!'
    },
    message: String,
    garnish: String
  }

};
</script>

