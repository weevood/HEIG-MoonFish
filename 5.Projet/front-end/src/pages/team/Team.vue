<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8 flex justify-between items-center">
      <div>
        <h1 class="text-blue-900 text-3xl font-medium pb-4">{{ team.name }}</h1>
        <StarRating :rating="grade" rounded-corners="true" padding="1" read-only="true" star-size="25" increment="0.01"
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
    </div>
    <EditOrCreateTeam v-if="edition" :name="team.name" :color="team.color" @done="edition = false"/>
    <section class="container">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est massa, interdum non laoreet quis, vehicula
        eget ligula. Mauris a est metus. Aliquam auctor est non nunc tempus, non vehicula justo gravida. Morbi nec
        sollicitudin magna. Morbi iaculis iaculis erat a fermentum. Cras vitae ipsum urna. Mauris ac mi vehicula,
        tincidunt diam vel, posuere elit. Sed non feugiat magna. Vivamus gravida pretium ipsum, ut tempus diam cursus
        vel. Aliquam malesuada felis eu accumsan malesuada. In mattis faucibus lorem, eget consequat risus tincidunt ac.
        Sed accumsan venenatis purus, id egestas leo. Suspendisse a convallis nulla. Donec cursus ligula sed risus
        posuere, a malesuada est viverra. In eu sem egestas, scelerisque lacus in, venenatis dui. Mauris dignissim
        placerat odio, id feugiat ipsum efficitur sed.</p>
    </section>
    <section class="container my-6">
      <h2 class="py-4 text-blue-900 text-2xl font-medium">{{ $t('Projects.title') }}</h2>
      <ul class="flex flex-wrap items-center" style="margin-left: -8px; margin-right: -8px">
        <li v-for="(project, i) in projects" :key="`Projects-${i}`"
            class="flex flex-col w-1/3 mb-4">
          <div
              class="flex justify-between items-center p-4 mx-2 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
            <router-link :to="`/projects/${project.uuid}`" class="flex items-center">
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ project.title }}<span class="text-gray-600"> - {{ project.status.toUpperCase() }}</span>
                </p>
                <ul class="my-2" style="margin-left: -4px; margin-right: -4px">
                  <li v-for="(tag, j) in project.tags" :key="`Project-${i}-tags-${j}`"
                      class="mx-1 text-xs inline-flex items-center font-bold leading-sm px-3 py-1 bg-blue-900 text-white rounded">
                    {{ tag }}
                  </li>
                </ul>
                <div v-if="inArray(project.status, finishedStatus)">
                  <p class="text-sm font-normal text-gray-700 my-2">
                    {{ `${ $t('Projects.end') }: ${ project.endDate }` }}</p>
                  <StarRating :rating="project.mark" rounded-corners="true" read-only="true" star-size="20"
                              increment="0.5" :show-rating="false" style="margin-left: -5px"/>
                  <router-link :to="`/resources/${project.feedback}`" class="text-sm font-medium text-gray-900">
                    {{ $t('Projects.feedback') }} ->
                  </router-link>
                </div>
                <p v-else class="text-sm font-normal text-gray-700 my-2">{{ project.description }}</p>
              </div>
            </router-link>
          </div>
        </li>
      </ul>
    </section>
    <section class="container my-6">
      <h2 class="py-4 text-blue-900 text-2xl font-medium">{{ $t('Teams.members') }}</h2>
      <ul class="flex flex-wrap items-center" style="margin-left: -8px; margin-right: -8px">
        <li v-for="(member, i) in members.STATUS_ACTIVE" :key="`Members-ACTIVE-${i}`"
            class="flex flex-col w-1/3 mb-4">
          <div
              class="flex flex-col px-4 py-6 mx-2 content-center bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
            <router-link :to="`/users/${member.uuid}`" class="flex items-center">
              <div :class="`p-3 mr-4 bg-${team.color}-500 text-white rounded-full`">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <p class="mb-2 text-sm font-medium text-gray-900">
                  {{ member.firstName }} {{ member.lastName }}
                  <span v-if="isOwner(member.uuid)" class="text-gray-500">- {{ $t('owner') }}</span>
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
        <ul class="flex flex-wrap items-center" style="margin-left: -8px; margin-right: -8px">
          <li v-for="(member, i) in members.STATUS_INACTIVE" :key="`Members-INACTIVE-${i}`"
              class="flex flex-col w-1/3 mb-4">
            <div class="flex flex-col p-4 mx-2 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
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
  </main>
</template>

<script>
import inArray from '@/utils/inArray';
import TeamsService from "@/services/teams.service";
import EditOrCreateTeam from "@/components/layout/EditOrCreateTeam";
import { PROJECT_STATUS_ABANDONED, PROJECT_STATUS_ENDED } from "@/enums/projectStatus";
import StarRating from "vue-star-rating";
import request from "@/utils/request";
import { STATUS_ACTIVE, STATUS_INACTIVE } from "@/enums/status";

export default {
  name: 'Team',
  components: { EditOrCreateTeam, StarRating },
  watch: {
    $route() {
      this.retrieveTeam();
      this.retrieveTeamMembers();
      this.retrieveTeamProjects();
    }
  },

  data() {
    return {
      edition: false,
      team: { uuid: '', name: '', color: '', ownerUuid: '' },
      grade: 3,
      members: { STATUS_INACTIVE: [], STATUS_ACTIVE: [] },
      projects: [],
      finishedStatus: [PROJECT_STATUS_ABANDONED, PROJECT_STATUS_ENDED],
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
    this.retrieveTeamMembers();
    this.retrieveTeamProjects();
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },

  methods: {
    inArray,

    async retrieveTeam() {
      this.team = await request(TeamsService.get(this.$route.params.uuid), this);
    },

    async retrieveTeamProjects() {
      this.projects = await request(TeamsService.getProjects(this.$route.params.uuid), this);
    },

    async retrieveTeamMembers() {
      const members = await request(TeamsService.getMembers(this.$route.params.uuid), this);
      for (const member of members) {
        switch (member.relation.status)
        {
          case STATUS_INACTIVE:
            this.members.STATUS_INACTIVE.push(member)
            break
          case STATUS_ACTIVE:
            this.members.STATUS_ACTIVE.push(member)
            break
        }
      }
      this.isOwner();
    },

    // eslint-disable-next-line no-unused-vars
    isOwner(uuid = this.currentUser.uuid) {
      for (const member of this.members.STATUS_ACTIVE) {
        if (member.relation.isOwner && member.uuid === uuid) {
          return true;
        }
      }
      return false;
    },

    accept(uuid) {
      TeamsService.accept(this.team.uuid, uuid);
    },

    ban(uuid) {
      TeamsService.ban(this.team.uuid, uuid);
    },

    giveOwnership(uuid) {
      TeamsService.giveOwnership(this.team.uuid, uuid);
    },

  }

};
</script>
