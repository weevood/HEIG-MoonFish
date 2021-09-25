<template>
  <div id="app">

    <!-- Main pages-->
    <div v-if="currentUser" class="flex w-screen h-screen bg-gray-100">
      <Sidebar :open="sidebarOpen" @show-sidebar="showSidebar" :key="sidebarKey"/>
      <div class="flex-1 flex flex-col relative">
        <Header @refresh="refresh" :sidebarOpen="sidebarOpen" @show-sidebar="showSidebar"
                :notificationOpen="notificationOpen" @show-notification="showNotification"/>
        <div class="container absolute">
          <AlertSuccess :title="successMessage().title" :message="successMessage().message"
                        :garnish="successMessage().garnish" @clear="msg = null" :can-close="true"/>
          <AlertError :title="errorMessage().title" :message="errorMessage().message"
                      @clear="msg = null" :can-close="true"/>
        </div>
        <div class="container overflow-y-auto no-scrollbar">
          <router-view @msg="getMessage" @refresh="refresh"/>
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
import AlertError from "@/components/ui/AlertError";
import AlertSuccess from "@/components/ui/AlertSuccess";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default {
  components: { AlertSuccess, AlertError, Sidebar, Header },

  data() {
    return {
      msg: null,
      sidebarKey: 'sidebar-initial',
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

    refresh(item) {
      // Changing the sidebarKey value will rerender it
      this.sidebarKey = item + Math.ceil(Math.random() * 10 ** 5)
    },

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

    getErrorMsg(msg) {
      if (Array.isArray(msg)) {
        // For validation errors
        let message = 'Validation error :'
        for (const error of msg) {
          message += `${ error.param }: ${ error.msg }, `
        }
        return message
      }
      if (this.$te(msg)) {
        return this.$t(msg)
      }
      else if (this.$te(`error.${ msg }`)) {
        return this.$t(`error.${ msg }`)
      }
      return msg
    },

    errorMessage() {
      if (this.msg && this.msg.status !== 'OK')
      {
        if (this.msg.data && this.msg.data.error && this.msg.data.error.msg) {
          return { message: `[${ this.msg.status }] ${ this.getErrorMsg(this.msg.data.error.msg) }` }
        }
        return {
          title: this.msg.title,
          message: this.getErrorMsg(this.msg.message)
        }
      }
      return {}
    }
  }

};
</script>
