<template>
  <div class="flex items-center">
    <div class="relative">
      <button @click="$emit('show-notification', !open)"
              class="flex text-blue-900 focus:outline-none">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
              :stroke="open ? '#39B1A1' : 'currentColor'" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
          </path>
        </svg>
      </button>

      <div :class="open ? 'block' : 'hidden'" @click="$emit('show-notification', false)"
           class="fixed inset-0 h-full w-full z-10"></div>

      <div :class="open ? 'block' : 'hidden'"
           class="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-10 bg-blue-900"
           style="width: 20rem;">
        <a href="#"
           class="flex items-center px-4 py-3 text-white hover:text-white hover:bg-teal-600 -mx-2">
          <img class="h-8 w-8 rounded-full object-cover mx-1"
               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
               alt="avatar">
          <p class="text-sm mx-2">
            <span class="font-bold" href="#">Abc AAA</span> replied on the <span
              class="font-bold text-teal-500" href="#">Image</span> - 2m
          </p>
        </a>
        <a href="#"
           class="flex items-center px-4 py-3 text-white hover:text-white hover:bg-teal-600 -mx-2">
          <img class="h-8 w-8 rounded-full object-cover mx-1"
               src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
               alt="avatar">
          <p class="text-sm mx-2">
            <span class="font-bold" href="#">Babd DDD</span> start following you - 45m
          </p>
        </a>
        <a href="#"
           class="flex items-center px-4 py-3 text-white hover:text-white hover:bg-teal-600 -mx-2">
          <img class="h-8 w-8 rounded-full object-cover mx-1"
               src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
               alt="avatar">
          <p class="text-sm mx-2">
            <span class="font-bold" href="#">Cdf SSS</span> Like Your reply on <span
              class="font-bold text-teal-500" href="#">Test</span> - 1h
          </p>
        </a>
        <a href="#"
           class="flex items-center px-4 py-3 text-white hover:text-white hover:bg-teal-600 -mx-2">
          <img class="h-8 w-8 rounded-full object-cover mx-1"
               src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=398&amp;q=80"
               alt="avatar">
          <p class="text-sm mx-2">
            <span class="font-bold" href="#">ddse CXD</span> start following you - 3h
          </p>
        </a>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'Notification',

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

};
</script>

