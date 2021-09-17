<template>
  <header class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-teal-600">
    <SidebarButton @show-sidebar="showSidebar"/>
    <Search/>
    <Notification :open="notificationOpen" @show-notification="showNotification" @refresh="this.$emit('refresh')"/>
  </header>
</template>

<script>
import Notification from "@/components/ui/Notification";
import SidebarButton from "@/components/ui/SidebarButton";
import Search from "@/components/ui/Search";

export default {
  name: 'Header',
  components: { Notification, SidebarButton, Search },
  emits: ['refresh', 'show-sidebar', 'show-notification'],

  props: {
    sidebarOpen: {
      type: Boolean,
      default: false
    },
    notificationOpen: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    showSidebar(state = true) {
      this.$emit('show-sidebar', state);
    },
    showNotification(state = true) {
      this.$emit('show-notification', state);
    }
  }

}
</script>
