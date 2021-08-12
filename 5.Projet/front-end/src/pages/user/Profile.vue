<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-blue-900 text-3xl font-medium">{{ currentUser.firstName }} {{ currentUser.lastName }}</h1>
    </div>
    <div class="container">
      {{ currentUser }}
      <p><strong>id: </strong>{{ currentUser.id }}</p>
      <p><strong>uuid: </strong>{{ currentUser.uuid }}</p>
      <p>
        <strong>Token:</strong>
        {{ token && token.substring(0, 20) }} ...
        {{ token && token.substr(token.length - 20) }}
      </p>

    </div>
  </main>
</template>

<script>
export default {
  name: 'Profile',

  computed: {
    token() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.token;
      }
      return '';
    },
    currentUser() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.user;
      }
      return false;
    },
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
