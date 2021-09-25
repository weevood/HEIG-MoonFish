<template>
  <div :class="open ? 'block' : 'hidden'" @click="$emit('show-sidebar', false)"
       class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"></div>

  <div :class="open ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
       class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-blue-900 lg:translate-x-0 lg:static lg:inset-0">

    <router-link to="/" class="flex items-center justify-center mt-8">
      <img class="w-1/4 rounded" src="@/assets/images/MoonFish-logo.png" alt="MoonFish logo">
      <span class="text-white text-2xl mx-3 font-semibold">MoonFish</span>
    </router-link>

    <Navigation/>

    <footer class="flex justify-between items-center py-4 px-6 border-t-2 border-teal-600 w-full fixed bottom-0">
      <div class="flex items-center">
        <div class="relative block h-10 w-10 mr-4 rounded-full overflow-hidden">
          <img class="h-full w-full object-cover"
               src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
               alt="Your avatar">
        </div>
        <div class="relative block text-white text-sm">
          <span class="block font-bold">{{ fullName() }}</span>
          <router-link to="/profile" class="text-gray-400 hover:text-teal-500">{{ $t('Profile.view') }}</router-link>
        </div>
      </div>
      <Logout/>
    </footer>

  </div>
</template>

<script>
import Logout from "@/components/ui/Logout";
import Navigation from "@/components/layout/Navigation";
import formatName from "@/utils/formatName";

export default {
  name: 'Sidebar',
  components: { Navigation, Logout },
  emits: ['show-sidebar'],

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    currentUser() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.user;
      }
      return false;
    }
  },

  methods: {
    formatName,

    fullName() {
      return formatName(this.currentUser.firstName, this.currentUser.lastName)
    }
  }

}
</script>
