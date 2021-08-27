<template>
  <div class="relative block text-white text-sm">
    <button class="hover:text-teal-500" @click.prevent="logOut">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  name: 'Logout',

  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login?message=SIGNED_OUT');
    }
  }
}
</script>
