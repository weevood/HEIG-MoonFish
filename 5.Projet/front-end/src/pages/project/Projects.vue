<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8 flex justify-between items-center">
      <h1 class="text-blue-900 text-3xl font-medium">{{ creation ? $t('Projects.new') : $t('Projects.title') }}</h1>
      <button v-if="!creation" @click="creation = true"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>{{ $t('Projects.new') }}</span>
      </button>
    </div>
    <EditOrCreateProject v-if="creation" :teams="myTeams" @msg="transfer" @done="refresh"/>
    <div v-if="!creation" class="container">
      <ul class="flex flex-wrap items-center" style="margin-left: -8px; margin-right: -8px">
        <li v-for="(project, i) in projects" :key="`Project${i}`"
            class="flex flex-col w-1/3 mb-4">
          <div
              class="flex justify-between items-center p-4 mx-2 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
            <router-link :to="`/projects/${project.uuid}`" class="flex items-center w-full">
              <div class="relative w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute top-0 right-0" fill="none"
                     viewBox="-4 -4 32 32"
                     stroke="#f1c40f" v-if="inArray(project.uuid, myProjects)">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
                <p class="text-sm font-medium text-gray-900">
                  {{ project.title }}<span class="text-gray-600"> - {{ project.status?.toUpperCase() }}</span>
                </p>
                <ul class="my-2" style="margin-left: -4px; margin-right: -4px">
                  <li v-for="(tag, j) in tags(project.tags)" :key="`Tags-${i}-tags-${j}`"
                      class="mx-1 text-xs inline-flex items-center font-bold leading-sm px-3 py-1 bg-blue-900 text-white rounded">
                    {{ tag }}
                  </li>
                </ul>
                <p class="text-sm font-normal text-gray-700 my-2">{{ project.description }}</p>
                <p class="text-xs font-bold text-blue-900">Deadline: {{ format(project.deadline) }}</p>
              </div>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import ProjectsService from '@/services/projects.service';
import inArray from '@/utils/inArray';
import dateFormat from 'dateformat';
import EditOrCreateProject from "@/components/layout/EditOrCreateProject";
import request from "@/utils/request";
import TeamsService from "@/services/teams.service";

export default {
  name: 'Projects',
  components: { EditOrCreateProject },
  emits: ['msg'],

  data() {
    return {
      creation: false,
      projects: [],
      myProjects: [],
      myTeams: [],
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
    this.retrieveProjects();
    this.retrieveMyProjects();
    this.retrieveMyTeams();
  },

  methods: {
    inArray,

    format(date) {
      return dateFormat(new Date(date), 'dd.mm.yyyy');
    },

    tags(tags) {
      return tags && !Array.isArray(tags) ? tags.split(';') : tags;
    },

    transfer(msg) {
      this.$emit('msg', msg);
    },

    refresh(project) {
      if (project) {
        this.projects.unshift(project);
        this.retrieveMyProjects();
      }
      this.creation = false;
    },

    async retrieveProjects() {
      this.projects = await request(ProjectsService.getAll(), this);
    },

    async retrieveMyProjects() {
      const myProjects = await request(ProjectsService.getMine(), this);
      for (const s in myProjects) {
        myProjects[s].map(project => {
          this.myProjects.push(project.uuid);
        });
      }
    },

    async retrieveMyTeams() {
      this.myTeams = (await request(TeamsService.getMine(), this)).OWNERSHIP;
    },

  }
};
</script>
