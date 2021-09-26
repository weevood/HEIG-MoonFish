<template>
  <main class="flex-1 bg-gray-100">
    <div class="container mx-auto px-6 py-8 flex justify-between items-center">
      <div>
        <h1 class="text-blue-900 text-3xl font-medium pb-4">{{ team.name }}</h1>
        <StarRating v-if="team.grade" :rating=team.grade :rounded-corners=true :padding=1 :read-only=true :star-size=25
                    :increment=0.1
                    style="margin-left: -5px"/>
      </div>
      <button v-if="!edition && isOwner()" @click="edition = true"
              class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
        <span>{{ $t('Teams.edit') }}</span>
      </button>
      <JoinOrLeaveTeam v-if="isActive && !edition && !isOwner()" :team="team" :myTeams="myTeams" @msg="transfer"
                       @join="join"
                       @leave="leave"/>
    </div>
    <EditOrCreateTeam v-if="edition" :uuid="team.uuid" :name="team.name" :color="team.color" @msg="transfer"
                      @done="refresh"/>
    <section class="container">
      <p class="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est massa, interdum non
        laoreet quis, vehicula
        eget ligula. Mauris a est metus. Aliquam auctor est non nunc tempus, non vehicula justo gravida. Morbi nec
        sollicitudin magna. Morbi iaculis iaculis erat a fermentum. Cras vitae ipsum urna. Mauris ac mi vehicula.</p>
    </section>
    <section class="container my-6">
      <h2 class="py-4 text-blue-900 text-2xl font-medium">{{ $t('Teams.members') }}</h2>
      <ul class="flex flex-wrap items-center" style="margin-left: -8px; margin-right: -8px">
        <li v-for="(member, i) in members.STATUS_ACTIVE" :key="`Members-ACTIVE-${i}`"
            class="flex flex-col w-1/3 mb-4">
          <div
              class="flex flex-col px-4 py-6 mx-2 content-center bg-white border-2 border-gray-200 rounded-lg shadow-sm">
            <router-link :to="`/users/${member.uuid}`" class="flex items-center">
              <div class="p-3 mr-4 bg-gray-500 text-white rounded-full" :class="team.color && `bg-${team.color}-500`">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <p class="mb-2 text-sm font-medium text-gray-900">
                  {{ member.firstName }} {{ member.lastName }}
                  <span v-if="isOwner(member.uuid)" class="text-gray-600">- {{ $t('owner') }}</span>
                </p>
                <p class="text-sm font-normal text-gray-800">{{ member.phone }}</p>
              </div>
            </router-link>
            <div v-if="isOwner() && !isOwner(member.uuid)" class="flex flex-col mt-4">
              <button @click="ban(member.uuid)"
                      class="justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                </svg>
                <span>{{ $t('Teams.ban') }}</span>
              </button>
              <button @click="giveOwnership(member.uuid)"
                      class="mt-2 justify-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>{{ $t('Teams.giveOwnership') }}</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="isOwner()">
        <h3 class="py-2 text-blue-900 text-1xl font-medium">{{ $t('Teams.requests') }}</h3>
        <p v-if="!members.STATUS_INACTIVE.length" class="italic text-gray-600">{{ $t('Teams.noRequest') }}</p>
        <ul class="flex flex-wrap items-center" style="margin-left: -8px; margin-right: -8px">
          <li v-for="(member, i) in members.STATUS_INACTIVE" :key="`Members-INACTIVE-${i}`"
              class="flex flex-col w-1/3 mb-4">
            <div class="flex flex-col p-4 mx-2 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
              <router-link :to="`/users/${member.uuid}`" class="flex items-center">
                <div class="p-3 mr-4 bg-gray-500 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ member.firstName }} {{ member.lastName }}
                  </p>
                </div>
              </router-link>
              <div class="flex flex-col mt-4">
                <button @click="accept(member.uuid)"
                        class="justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>{{ $t('Teams.accept') }}</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="container my-6">
      <h2 class="py-4 text-blue-900 text-2xl font-medium">{{ $t('Projects.title') }}</h2>
      <p v-if="!projects?.length" class="italic text-gray-600">{{ $t('noItems') }}</p>
      <ProjectsList :projects="projects" @msg="transfer"/>
    </section>
  </main>
</template>

<script>
import EditOrCreateTeam from "@/components/layout/EditOrCreateTeam";
import JoinOrLeaveTeam from "@/components/layout/JoinOrLeaveTeam";
import NotificationsService from "@/services/notifications.service";
import ProjectsList from "@/components/ui/ProjectsList";
import StarRating from 'vue-star-rating';
import TeamsService from "@/services/teams.service";
import inArray from '@/utils/inArray';
import request from "@/utils/request";
import { STATUS_ACTIVE, STATUS_INACTIVE } from "@/enums/status";

export default {
  name: 'Team',
  components: { ProjectsList, JoinOrLeaveTeam, EditOrCreateTeam, StarRating },
  emits: ['refresh', 'msg'],
  watch: {
    $route() {
      if (this.$route.name === 'team') {
        this.edition = false;
        this.retrieveTeam();
        this.retrieveTeamMembers();
        this.retrieveTeamProjects();
      }
    }
  },

  data() {
    return {
      edition: false,
      isActive: false,
      team: { uuid: '', name: '', color: '', ownerUuid: '' },
      myTeams: { STATUS_ACTIVE: [], STATUS_INACTIVE: [], STATUS_BANNED: [], OWNERSHIP: [] },
      members: { STATUS_INACTIVE: [], STATUS_ACTIVE: [] },
      projects: []
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
    this.retrieveTeam();
    this.retrieveMyTeams();
    this.retrieveTeamMembers();
    this.retrieveTeamProjects();
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },

  methods: {
    inArray,

    transfer(msg) {
      if (msg.status !== 'OK') {
        this.retrieveTeam();
      }
      this.$emit('msg', msg);
    },

    refresh(team) {
      this.$emit('refresh', 'teams');
      this.team.name = team.name;
      this.team.color = team.color;
      this.edition = false;
    },

    isOwner(uuid = this.currentUser.uuid) {
      for (const member of this.members.STATUS_ACTIVE) {
        if (member.relation.isOwner && member.uuid === uuid) {
          return true;
        }
      }
      return false;
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

    async retrieveTeam() {
      this.team = await request(TeamsService.get(this.$route.params.uuid), this);
      this.isActive = (this.team.status === STATUS_ACTIVE);
    },

    async retrieveMyTeams() {
      this.myTeams = await request(TeamsService.getMine(), this)
      for (const s in this.myTeams) {
        this.myTeams[s] = this.myTeams[s].map(team => { return team.uuid });
      }
    },

    async retrieveTeamProjects() {
      this.projects = await request(TeamsService.getProjects(this.$route.params.uuid), this);
    },

    async retrieveTeamMembers() {
      this.members = { STATUS_INACTIVE: [], STATUS_ACTIVE: [] };
      const members = await request(TeamsService.getMembers(this.$route.params.uuid), this);
      for (const member of members) {
        switch (member.relation.status)
        {
          case STATUS_INACTIVE:
            this.members.STATUS_INACTIVE.push(member)
            break
          case STATUS_ACTIVE:
            if (member.relation.isOwner) {
              this.members.STATUS_ACTIVE.unshift(member)
            }
            else {
              this.members.STATUS_ACTIVE.push(member)
            }
            break
        }
      }
      this.isOwner();
    },

    async accept(uuid) {
      this.members.STATUS_INACTIVE.some(function(user, i) {
        if (user.uuid === uuid) {
          this.members.STATUS_ACTIVE.push(user);
          this.members.STATUS_INACTIVE.splice(i, 1);
          return true;
        }
      }, this);
      await request(TeamsService.accept(this.team.uuid, uuid));
      await request(NotificationsService.create({
        userUuid: uuid,
        lang: 'en', // user.lang
        title: this.$t('Teams.notification.accepted.title'),
        description: this.$t('Teams.notification.accepted.desc', { team: this.team.name }),
        link: '/teams/' + this.team.uuid
      }), this);
    },

    async ban(uuid) {
      this.members.STATUS_ACTIVE.some(function(user, i) {
        if (user.uuid === uuid) {
          this.members.STATUS_ACTIVE.splice(i, 1);
          return true;
        }
      }, this);
      await request(TeamsService.ban(this.team.uuid, uuid));
      await request(NotificationsService.create({
        userUuid: uuid,
        lang: 'en', // user.lang
        title: this.$t('Teams.notification.banned.title'),
        description: this.$t('Teams.notification.banned.desc', { team: this.team.name }),
      }), this);
    },

    async giveOwnership(uuid) {
      this.members.STATUS_ACTIVE.some(function(user, i) {
        if (user.uuid === uuid) {
          this.members.STATUS_ACTIVE[i].relation.isOwner = true;
          return true;
        }
      }, this);
      this.members.STATUS_ACTIVE.some(function(user, i) {
        if (user.uuid === this.currentUser.uuid) {
          this.members.STATUS_ACTIVE[i].relation.isOwner = false;
          return true;
        }
      }, this);
      await request(TeamsService.giveOwnership(this.team.uuid, uuid));
      await request(NotificationsService.create({
        userUuid: uuid,
        lang: 'en', // user.lang
        title: this.$t('Teams.notification.ownershiped.title'),
        description: this.$t('Teams.notification.ownershiped.desc', { team: this.team.name }),
        link: '/teams/' + this.team.uuid
      }), this);
      await this.retrieveMyTeams();
    }

  }

};
</script>
