<template>
  <ul class="top-12 right-8 w-80 rounded-lg w-full" style="min-width: 20rem;"
      :class="!history && 'absolute bg-blue-900 shadow-xl overflow-hidden z-10'">
    <li v-if="!notifications?.length" class="text-sm italic text-gray-600" :class="!history && 'px-4 py-3 text-white'">
      {{ $t('noItems') }}
    </li>
    <li v-for="(notif, i) in notifications" :key="`Notif-${i}`">
      <router-link v-if="notif.link" :to="notif.link" @click.prevent="remove(notif.id, false)"
                   class="flex items-center px-2 py-2 text-sm hover:bg-teal-600 hover:text-white rounded"
                   :class="!history && 'text-white px-4 py-3'">
        <img class="h-8 w-8 rounded-full object-cover mx-1" alt="avatar"
             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80">
        <p class="text-sm mx-2">
          <span class="font-bold">{{ notif.title }}&nbsp;</span>{{ notif.description }}<span v-if="!history" class="text-xs"> [<em>{{
            $t('Notifications.view')
          }}</em>]</span><span class="text-gray-600"> - {{ timeAgo(history ? notif.createdAt : notif.updatedAt) }}</span>
        </p>
      </router-link>
      <div v-else class="flex items-center px-2 py-2 text-sm" :class="!history && 'text-white px-4 py-3'">
        <img class="h-8 w-8 rounded-full object-cover mx-1" alt="avatar"
             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80">
        <p class="text-sm mx-2">
          <span class="font-bold">{{ notif.title }}&nbsp;</span>{{ notif.description }}<span
            class="text-gray-600"> - {{ timeAgo(history ? notif.createdAt : notif.updatedAt) }}</span>
        </p>
        <span @click.prevent="remove(notif.id)" class="p-2 cursor-pointer" v-if="!history">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="-4 -4 32 32"
                   stroke="#c0392b">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </span>
      </div>
    </li>
  </ul>
</template>

<script>
import inArray from "@/utils/inArray";

export default {
  name: 'NotificationsList',
  emits: ['remove'],

  props: {
    history: {
      type: Boolean,
      default: false
    },
    notifications: Array
  },

  data() {
    return {
      finishedStatus: ['ended', 'abandoned'],
    };
  },

  methods: {
    inArray,

    timeAgo(datetime) {
      const date = new Date(datetime);
      const seconds = Math.floor((new Date() - date) / 1000);
      let interval = seconds / 31536000;
      if (interval > 1) {
        return `${ Math.floor(interval) } years ago`;
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return `${ Math.floor(interval) } months ago`;
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return `${ Math.floor(interval) } days ago`;
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return `${ Math.floor(interval) } hours ago`;
      }
      interval = seconds / 60;
      if (interval > 1) {
        return `${ Math.floor(interval) } minutes ago`;
      }
      return `${ Math.floor(seconds) } seconds ago`;
    },

    remove(id, show = true) {
      this.$emit('remove', id, show)
    }

  }

};
</script>
