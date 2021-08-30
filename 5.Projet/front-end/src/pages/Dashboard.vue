<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-blue-900 text-3xl font-medium">{{ welcome() }}</h1>
    </div>
    <div class="container">
      <h2 class="py-4 text-blue-900 text-2xl font-medium">{{ $t('Notifications.title') }}</h2>
      <NotificationsList :notifications="notifications" :modal="false" @remove="remove"/>
    </div>
  </main>
</template>

<script>

import capitalize from "@/utils/capitalize";
import NotificationsList from "@/components/layout/NotificationsList";
import request from "@/utils/request";
import NotificationsService from "@/services/notifications.service";

export default {
  name: 'Home',
  components: { NotificationsList },

  data() {
    return {
      content: '',
      notifications: [],
    };
  },

  mounted() {
    this.retrieveNotifications();
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
    },

    async remove(id, show) {
      console.log(id)
      console.log(show)
    },

    async retrieveNotifications() {
      this.notifications = await request(NotificationsService.getMine(), this)
    }
  }

};
</script>
