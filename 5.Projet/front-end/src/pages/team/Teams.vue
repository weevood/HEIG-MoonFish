<template>
  <AlertError :message="error && $t(error)"/>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-blue-900 text-3xl font-medium">{{ $t('Teams.title') }}</h1>
    </div>
    <div class="container">
      <div v-for="(team, i) in teams.data" :key="`Lang${i}`"
           class="flex items-center p-4 mb-3 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
        <div class="p-3 mr-4 bg-blue-500 text-white rounded-full">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg>
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-900">{{ team.name }}</p>
          <p class="text-sm font-normal text-gray-800">{{ team.uuid }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import TeamsService from '@/services/teams.service';
import { STATUS_ACTIVE } from '@/enums/status';
import AlertError from "@/components/ui/AlertError";

export default {
  name: 'Teams',
  components: { AlertError },

  data() {
    return {
      error: '',
      teams: [],
    };
  },

  mounted() {
    this.retrieveTeams();
  },

  methods: {
    async retrieveTeams() {
      this.teams = await TeamsService.getAll(STATUS_ACTIVE);
    }
  }
};
</script>
