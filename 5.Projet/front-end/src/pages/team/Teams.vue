<template>
  <main class="flex-1 bg-gray-100">
    <div class="container mx-auto px-6 py-8 flex justify-between items-center">
      <h1 class="text-blue-900 text-3xl font-medium">{{ creation ? $t('Teams.new') : $t('Teams.title') }}</h1>
      <button v-if="!creation" @click="creation = true"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>{{ $t('Teams.new') }}</span>
      </button>
    </div>
    <EditOrCreateTeam v-if="creation" @msg="transfer" @done="refresh"/>
    <div v-if="!creation" class="container">
      <ul>
        <li v-for="(team, i) in teams" :key="`Teams${i}`"
            class="flex justify-between items-center p-4 mb-3 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
          <router-link :to="`/teams/${team.uuid}`" class="flex items-center">
            <div class="p-3 mr-4 bg-gray-500 text-white rounded-full" :class="team.color && `bg-${team.color}-500`">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-medium text-gray-900">{{ team.name }}
                <span class="text-xs italic font-normal text-gray-600">- {{
                    team.members
                  }} {{ $t('Teams.members').toLowerCase() }}</span></p>
              <StarRating :rating="team.grade" :rounded-corners=true :read-only=true :star-size=20 :increment=0.5
                          :show-rating=false style="margin-left: -5px"/>
            </div>
          </router-link>
          <JoinOrLeaveTeam :team="team" :myTeams="myTeams" @msg="transfer" @join="join" @leave="leave"/>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import TeamsService from '@/services/teams.service';
import { STATUS_ACTIVE } from '@/enums/status';
import inArray from "@/utils/inArray";
import request from "@/utils/request";
import EditOrCreateTeam from "@/components/layout/EditOrCreateTeam";
import StarRating from "vue-star-rating";
import JoinOrLeaveTeam from "@/components/layout/JoinOrLeaveTeam";

export default {
  name: 'Teams',
  components: { JoinOrLeaveTeam, EditOrCreateTeam, StarRating },
  emits: ['msg', 'refresh'],

  data() {
    return {
      creation: false,
      teams: [],
      myTeams: { STATUS_ACTIVE: [], STATUS_INACTIVE: [], STATUS_BANNED: [], OWNERSHIP: [] },
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
    this.retrieveMyTeams();
  },

  methods: {
    inArray,

    transfer(msg) {
      this.$emit('msg', msg);
    },

    refresh(team) {
      this.$emit('refresh', 'teams');
      if (team) {
        this.retrieveMyTeams();
        this.teams.unshift(team);
      }
      this.creation = false;
    },

    join(uuid) {
      this.myTeams.STATUS_INACTIVE.push(uuid);
    },

    leave(uuid) {
      this.$emit('refresh', 'teams');
      this.myTeams.STATUS_ACTIVE.some(function(id, i) {
        if (uuid === id) {
          this.myTeams.STATUS_ACTIVE.splice(i, 1);
          return true;
        }
      }, this);
    },

    async retrieveTeams() {
      const options = [`filters[status]=${ STATUS_ACTIVE }`, `limit=50`, 'orders[createdAt]=DESC']
      this.teams = await request(TeamsService.getAll(options), this);
    },

    async retrieveMyTeams() {
      this.myTeams = await request(TeamsService.getMine(), this)
      for (const s in this.myTeams) {
        this.myTeams[s] = this.myTeams[s].map(team => { return team.uuid });
      }
    }

  }
};
</script>
