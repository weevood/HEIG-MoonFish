<template>
  <main class="flex-1 bg-gray-100">
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-blue-900 text-3xl font-medium">{{ welcome() }}</h1>
    </div>
    <div class="bg-blue-900 rounded shadow-lg">
      <Recommendations :number="3" @msg="transfer"/>
    </div>
    <div class="container">
      <h2 class="py-4 text-blue-900 text-2xl font-medium">{{ $t('Notifications.activity') }}</h2>
      <NotificationsList :notifications="notifications" :history="true"/>
    </div>
  </main>
</template>

<script>

import capitalize from "@/utils/capitalize";
import request from "@/utils/request";
import NotificationsList from "@/components/ui/NotificationsList";
import NotificationsService from "@/services/notifications.service";
import Recommendations from "@/components/layout/Recommendations";

export default {
  name: 'Dashboard',
  components: { NotificationsList, Recommendations },

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

    transfer(msg) {
      this.$emit('msg', msg);
    },

    welcome() {
      return this.$t('Dashboard.title', {
        firstName: capitalize(this.currentUser.firstName)
      })
    },

    async retrieveNotifications() {
      this.notifications = await request(NotificationsService.getMine(true), this)
    }
  }

};
</script>
