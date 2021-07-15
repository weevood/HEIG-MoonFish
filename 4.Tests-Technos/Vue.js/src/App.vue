<template>
  <a v-if="currentUser" class="ui-button" @click.prevent="logOut">LogOut</a>
  <div class="container">
    <router-view/>
  </div>
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
