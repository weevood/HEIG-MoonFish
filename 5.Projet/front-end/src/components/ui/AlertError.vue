<template>
  <div v-if="message" role="alert"
       class="bg-red-100 border-t-4 border-red-500 rounded-b px-4 py-3 my-5 shadow-md">
    <div class="flex">
      <div class="py-1">
        <svg class="h-6 w-6 mr-1" xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 30 30" stroke="#f56565">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>
      <div>
        <p class="font-bold text-red-500">{{ title }}</p>
        <p class="text-sm">{{ message }}</p>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'AlertError',
  props: {
    title: {
      type: String,
      default: 'Error!'
    },
    message: String
  }
};
</script>

