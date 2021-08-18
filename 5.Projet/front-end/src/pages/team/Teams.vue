<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8 flex justify-between items-center">
      <h1 class="text-blue-900 text-3xl font-medium">{{ $t('Teams.title') }}</h1>
      <button @click="create"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ $t('Teams.new') }}</span>
      </button>
    </div>
    <div class="container">
      <ul>
      <li v-for="(team, i) in teams" :key="`Lang${i}`"
          class="flex justify-between items-center p-4 mb-3 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
        <router-link :to="`/teams/${team.uuid}`" class="flex items-center">
          <div :class="`p-3 mr-4 bg-${team.color}-500 text-white rounded-full`">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-900">{{ team.name }}</p>
            <p class="text-sm font-normal text-gray-800">7 {{ $t('Teams.members').toLowerCase() }}</p>
          </div>
        </router-link>
        <div class="flex flex-col">
          <button v-if="inArray(team.uuid, mineTeams.STATUS_INACTIVE)" disabled
                  class="bg-gray-500 text-white font-bold py-1 px-3 rounded inline-flex items-center cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"/>
            </svg>
            <span>{{ $t('Teams.requested') }}</span>
          </button>
          <div v-else-if="!inArray(team.uuid, mineTeams.STATUS_ACTIVE)" class="flex flex-col">
            <button @click="join(team.uuid)" :disabled="inArray(team.uuid, mineTeams.STATUS_BANNED)"
                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded inline-flex items-center disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 " fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
              <span>{{ $t('Teams.join') }}</span>
            </button>
            <span v-if="inArray(team.uuid, mineTeams.STATUS_BANNED)"
                  class="mt-2 text-xs italic text-gray-500">{{ $t('Teams.banned') }}</span>
          </div>
          <button v-else @click="leave(team.uuid)"
                  class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"/>
            </svg>
            <span>{{ $t('Teams.leave') }}</span>
          </button>
        </div>
      </li>
    </ul>
    </div>
  </main>
</template>

<script>
import TeamsService from '@/services/teams.service';
import { STATUS_ACTIVE } from '@/enums/status';
import inArray from "@/utils/inArray";

export default {
  name: 'Teams',

  data() {
    return {
      teams: [],
      mineTeams: { STATUS_ACTIVE: [], STATUS_INACTIVE: [], STATUS_BANNED: [] },
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

  mounted() {
    this.retrieveTeams();
    this.retrieveMineTeams();
  },

  methods: {
    inArray,
    async retrieveTeams() {
      this.teams = await TeamsService.getAll(STATUS_ACTIVE);
    },
    async retrieveMineTeams() {
      this.mineTeams = await TeamsService.getMine(this.currentUser.uuid, 'uuid');
    },
    join(uuid) {
      TeamsService.join(uuid);
    },
    leave(uuid) {
      TeamsService.leave(uuid);
    },
    create() {
      TeamsService.create([]);
    }
  }
};
</script>
