<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-blue-900 text-3xl font-medium">{{ welcome() }}</h1>
    </div>
    <div class="container">
      <pre>{{ content }}</pre>
    </div>
  </main>
</template>

<script>

import capitalize from "@/utils/capitalize";

export default {
  name: 'Home',

  data() {
    return {
      content: '',
    };
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
    welcome() {
      return this.$t('Dashboard.title', {
        firstName: capitalize(this.currentUser.firstName)
      })
    }
  }

};
</script>
