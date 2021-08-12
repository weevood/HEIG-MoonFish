<template>
  <div id="app">

    <!-- Main pages-->
    <div v-if="currentUser" class="flex w-screen h-screen bg-gray-100">
      <Sidebar :open="sidebarOpen" @show-sidebar="showSidebar"/>
      <div class="flex-1 flex flex-col overflow-hidden">
        <Header :sidebarOpen="sidebarOpen" @show-sidebar="showSidebar"
                :notificationOpen="notificationOpen" @show-notification="showNotification"/>
        <div class="container">
          <router-view/>
        </div>
      </div>
    </div>

    <!-- Login pages-->
    <div v-if="!currentUser" class="container">
      <router-view/>
    </div>

  </div>
</template>



<script>

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default {
  components: { Sidebar, Header },

  data() {
    return {
      sidebarOpen: false,
      notificationOpen: false,
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
    showSidebar(show = true) {
      this.sidebarOpen = show
    },
    showNotification(show = true) {
      this.notificationOpen = show
    }
  }

};
</script>
