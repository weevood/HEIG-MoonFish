<template>
  <div id="app">

    <!-- Main pages-->
    <div v-if="currentUser" class="flex w-screen h-screen bg-gray-100">
      <Sidebar :open="sidebarOpen" @show-sidebar="showSidebar"/>
      <div class="flex-1 flex flex-col overflow-hidden relative">
        <Header :sidebarOpen="sidebarOpen" @show-sidebar="showSidebar"
                :notificationOpen="notificationOpen" @show-notification="showNotification"/>
        <div class="container absolute">
          <AlertSuccess :title="successMessage().title" :message="successMessage().message"
                        :garnish="successMessage().garnish" @clear="msg = null" :can-close="true"/>
          <AlertError :title="errorMessage().title" :message="errorMessage().message"
                      @clear="msg = null" :can-close="true"/>
        </div>
        <div class="container">
          <router-view @msg="getMessage"/>
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
import AlertSuccess from "@/components/ui/AlertSuccess";
import AlertError from "@/components/ui/AlertError";

export default {
  components: { AlertSuccess, AlertError, Sidebar, Header },

  data() {
    return {
      msg: null,
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
    },
    successMessage() {
      if (this.msg && this.msg.status === 'OK')
      {
        return {
          title: this.msg.title,
          message: this.msg.message,
          garnish: this.msg.garnish,
        }
      }
      return {}
    },
    getMessage(msg) {
      this.msg = msg
    },
    errorMessage() {
      if (this.msg && this.msg.status !== 'OK')
      {
        return {
          title: this.msg.title,
          message: this.msg.message.startsWith('error.') ? this.$t(`error.${ this.msg.message }`) : this.msg.message,
        }
      }
      return {}
    }
  }

};
</script>
