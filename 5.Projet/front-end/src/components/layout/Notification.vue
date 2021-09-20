<template>
  <div class="flex items-center">
    <div class="relative">
      <button @click="$emit('show-notification', !open)"
              class="flex text-blue-900 p-3 focus:outline-none relative">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
              :stroke="open ? '#39B1A1' : 'currentColor'" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
          </path>
        </svg>
        <span v-if="notifications?.length" class="absolute rounded bg-red-500 w-2 h-2 top-0 right-0 m-4"></span>
      </button>
      <div :class="open ? 'block' : 'hidden'" @click="$emit('show-notification', false)"
           class="fixed inset-0 h-full w-full z-10"></div>
      <div :class="open ? 'inline' : 'hidden'">
        <NotificationsList :notifications="notifications" @remove="remove"/>
      </div>
    </div>
  </div>
</template>


<script>

import request from "@/utils/request";
import NotificationsService from "@/services/notifications.service";
import NotificationsList from "@/components/ui/NotificationsList";
import CacheService from "@/services/cache.service";

export default {
  name: 'Notification',
  components: { NotificationsList },
  emits: ['refresh', 'show-notification'],

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      notifications: [],
    };
  },

  mounted() {
    this.retrieveNotifications();
    let _this = this;
    setInterval(function() {
      _this.retrieveNotifications()
    }, 60 * 1000); // Look for new notifications every minute
  },

  methods: {

    async retrieveNotifications() {
      const oldLength = this.notifications.length
      this.notifications = await request(NotificationsService.getMine(), this);
      console.log(oldLength)
      console.log(this.notifications.length)
      if (this.notifications.length > oldLength)
      {
        CacheService.flush();
        this.$emit('refresh');
      }
    },

    async remove(id, show) {
      this.$emit('show-notification', show)
      this.notifications.some(function(notif, i) {
        if (notif.id === id) {
          this.notifications.splice(i, 1);
          return true;
        }
      }, this);
      await request(NotificationsService.delete(id), this)
    },

  }

};
</script>

