<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8 flex justify-between items-center">
      <h1 class="text-blue-900 text-3xl font-medium">{{ fullName() }}</h1>
    </div>
    <section class="container">
      <ul>
        <li v-for="(value, key) in clean(user)" :key="`UserKey-${key}`">
          <span class="font-bold">- {{ capitalize(key) }}:&nbsp;</span>{{ value }}
        </li>
      </ul>
    </section>
    <section class="container my-6">
      <h2 class="py-4 text-blue-900 text-2xl font-medium">{{ $t('Teams.title') }}</h2>
      <p v-if="!teams?.length" class="italic text-gray-600">{{ $t('noItems') }}</p>
      <ul class="flex flex-wrap items-center" style="margin-left: -8px; margin-right: -8px">
        <li v-for="(team, i) in teams" :key="`Teams-${i}`"
            class="flex flex-col w-1/3 mb-4">
          <div
              class="flex flex-col px-4 py-6 mx-2 content-center bg-white border-2 border-gray-200 rounded-lg shadow-sm">
            <router-link :to="`/teams/${team.uuid}`" class="flex items-center">
              <div class="p-3 mr-4 bg-gray-500 text-white rounded-full" :class="`bg-${team.color}-500`">
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
    <ProjectsList :projects="projects"/>
  </main>
</template>

<script>

import UsersService from "@/services/users.service";
import request from "@/utils/request";
import { STATUS_ACTIVE } from "@/enums/status";
import inArray from "@/utils/inArray";
import clean from "@/utils/clean";
import capitalize from "@/utils/capitalize";
import ProjectsList from "@/components/layout/ProjectsList";

export default {
  name: 'User',
  components: { ProjectsList },
  watch: {
    $route() {
      if (this.$route.name === 'user') {
        this.retrieveUser();
        this.retrieveUserTeams();
        this.retrieveUserProjects();
      }
    }
  },

  data() {
    return {
      user: {},
      teams: [],
      projects: []
    };
  },

  mounted() {
    this.retrieveUser();
    this.retrieveUserTeams();
    this.retrieveUserProjects();
  },

  methods: {
    inArray,
    capitalize(word) { return capitalize(word) },

    clean(obj) {
      return clean({
        ...obj,
        id: null,
        uuid: null,
        firstName: null,
        lastName: null
      })
    },

    fullName() {
      return capitalize(this.user.firstName) + ' ' + capitalize(this.user.lastName)
    },

    async retrieveUser() {
      this.user = await request(UsersService.get(this.$route.params.uuid), this);
    },

    async retrieveUserTeams() {
      const teams = await request(UsersService.getTeams(this.$route.params.uuid), this);
      for (const team of teams) {
        // Keep only active groups
        if (parseInt(team.relation.status) === STATUS_ACTIVE) {
          this.teams.push(team);
        }
      }
    },

    async retrieveUserProjects() {
      this.projects = await request(UsersService.getProjects(this.$route.params.uuid), this);
    }

  }
};
</script>
