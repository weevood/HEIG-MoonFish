<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8 flex justify-between items-center">
      <h1 class="text-blue-900 text-3xl font-medium">{{ user.firstName }} {{ user.lastName }}</h1>
    </div>
    <section class="container">
      <pre>
        {{ user }}
      </pre>
    </section>
    <section class="container my-6">
      <h2 class="py-4 text-blue-900 text-2xl font-medium">{{ $t('Teams.title') }}</h2>
      <ul class="flex flex-wrap items-center" style="margin-left: -8px; margin-right: -8px">
        <li v-for="(team, i) in teams" :key="`Teams-${i}`"
            class="flex flex-col w-1/3 mb-4">
          <div
              class="flex flex-col px-4 py-6 mx-2 content-center bg-white border-2 border-gray-200 rounded-lg shadow-sm">
            <router-link :to="`/teams/${team.uuid}`" class="flex items-center">
              <div :class="`p-3 mr-4 bg-${team.color}-500 text-white rounded-full`">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ team.name }}</p>
              </div>
            </router-link>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>

import UsersService from "@/services/users.service";
import request from "@/utils/request";

export default {
  name: 'User',
  watch: {
    $route() {
      if (this.$route.name === 'user') {
        this.retrieveUser();
        this.retrieveUserTeams();
      }
    }
  },

  data() {
    return {
      user: {},
      teams: [],
    };
  },

  mounted() {
    this.retrieveUser();
    this.retrieveUserTeams();
  },

  methods: {

    async retrieveUser() {
      this.user = await request(UsersService.get(this.$route.params.uuid), this);
    },

    async retrieveUserTeams() {
      this.teams = await request(UsersService.getTeams(this.$route.params.uuid), this);
    }

  }
};
</script>
