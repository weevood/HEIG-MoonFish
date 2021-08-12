<template>
  <div v-if="message" role="alert"
       class="bg-teal-100 border-t-4 border-teal-500 rounded-b px-4 py-3 my-5 shadow-md">
    <div class="flex">
      <div class="py-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 30 30" stroke="#38b2ac">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <div>
        <p class="font-bold text-teal-500">{{ title }}</p>
        <p class="text-sm">{{ $t(message) }}</p>
        <p class="text-sm" v-html="garnish"></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AlertSuccess',
  props: {
    title: {
      type: String,
      default: 'All done!'
    },
    message: String,
    garnish: String
  }
};
</script>

