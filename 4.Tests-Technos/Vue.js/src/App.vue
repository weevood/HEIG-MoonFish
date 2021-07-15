<template>
  <body id="app" style="background-position: center;background-size: cover;background-image: url('assets/images/ocean.jpg')"
        class="w-screen h-screen overflow-hidden bg-blue-900 flex flex-col h-screen">

  <a v-if="currentUser" class="ui-button" @click.prevent="logOut">LogOut</a>

  <div class="container">
    <router-view/>
  </div>

  <footer class="max-w-lg mx-auto mb-8 md:my-3">
    <div class="text-white uppercase font-bold text-sm">
      <a href="#" class="hover:underline">Contact</a>
      <span class="mx-3">•</span>
      <a href="#" class="hover:underline">Privacy</a>
    </div>
    <span class="max-w-lg mb-2 mr-4 text-gray-600 text-xs absolute bottom-0 right-0 italic">Photo by <a
        href="https://unsplash.com/@conorsexton?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Conor Sexton</a> on <a
        href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">unsplash.com</a></span>
  </footer>

  </body>
</template>

<script>
export default {

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
