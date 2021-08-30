<template>
  <div class="flex flex-col">
    <button v-if="inArray(team.uuid, myTeams.STATUS_INACTIVE)" disabled
            class="bg-gray-500 text-white font-bold py-1 px-3 rounded inline-flex items-center cursor-not-allowed">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"/>
      </svg>
      <span>{{ $t('Teams.requested') }}</span>
    </button>
    <div v-else-if="!inArray(team.uuid, myTeams.STATUS_ACTIVE)" class="flex flex-col">
      <button @click="join(team.uuid)" :disabled="inArray(team.uuid, myTeams.STATUS_BANNED)"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded inline-flex items-center disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 " fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
        </svg>
        <span>{{ $t('Teams.join') }}</span>
      </button>
      <span v-if="inArray(team.uuid, myTeams.STATUS_BANNED)"
            class="mt-2 text-xs italic text-gray-500">{{ $t('Teams.banned') }}</span>
    </div>
    <div v-else class="flex flex-col">
      <button @click="leave(team.uuid)" :disabled="inArray(team.uuid, myTeams.OWNERSHIP)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded inline-flex items-center disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"/>
        </svg>
        <span>{{ $t('Teams.leave') }}</span>
      </button>
      <span v-if="inArray(team.uuid, myTeams.OWNERSHIP)"
            class="mt-2 text-xs italic text-gray-500">{{ $t('Teams.owner') }}</span>
    </div>
  </div>
</template>

<script>
import TeamsService from "@/services/teams.service";
import request from "@/utils/request";
import inArray from "@/utils/inArray";

export default {
  name: 'JoinOrLeaveTeam',
  emits: ['msg', 'join', 'leave'],

  props: {
    team: Object,
    myTeams: Object
  },

  methods: {
    inArray,

    async join(uuid) {
      this.$emit('join', uuid);
      await request(TeamsService.join(uuid), this);
    },

    async leave(uuid) {
      this.$emit('leave', uuid);
      await request(TeamsService.leave(uuid), this);
    }

  }

};
</script>
