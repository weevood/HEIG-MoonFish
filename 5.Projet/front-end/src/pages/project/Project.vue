<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8 flex justify-between items-center">
      <h1 class="text-blue-900 text-3xl font-medium">{{ project.title }}</h1>
      <button v-if="!edition && inMyProjects(mandates)" @click="edition = true"
              class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
        <span>{{ $t('Projects.edit') }}</span>
      </button>
    </div>
    <EditOrCreateProject v-if="edition" @done="edition = false" :uuid="project.uuid" :title="project.title"
                         :description="project.description" :deadline="project.deadline" :tags="project.tags"/>
    <section class="container" v-if="!edition">
      <div>
        <span class="font-bold text-gray-600">{{ project.status?.toUpperCase() }}</span>
        <ul class="my-2" style="margin-left: -4px; margin-right: -4px">
          <li v-for="(tag, j) in project.tags" :key="`Project-${i}-tags-${j}`"
              class="mx-1 text-xs inline-flex items-center font-bold leading-sm px-3 py-1 bg-blue-900 text-white rounded">
            {{ tag }}
          </li>
        </ul>
        <p class="text-sm font-normal text-gray-700 my-2">{{ project.description }}</p>
        <p class="text-xs font-bold text-blue-900">Deadline: {{ format(project.deadline) }}</p>
      </div>
    </section>
    <div v-if="!inMyProjects(mandates) && project.status === 'proposal'" class="container my-6"
         style="margin-left: -8px; margin-right: -8px">
      <button v-for="(team, i) in myTeams.STATUS_ACTIVE" :key="`MyTeams-${i}`"
              :disabled="hasTeamApply(team.uuid)" @click="apply(team.uuid)"
              :class="!team.relation.isOwner && 'hidden'"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded inline-flex items-center m-2 disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"/>
        </svg>
        <span>{{ `${ team.name } ${ $t('Projects.apply').toLowerCase() }` }}</span>
      </button>
    </div>
    <section class="container my-6" v-if="!edition && teams.length">
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
                <p class="text-sm font-medium text-gray-900">{{ team.name }}<span
                    class="text-gray-600 uppercase"> - {{ team.relation.name }}</span></p>
                <div v-if="project.status === 'proposal'">
                  <p class="text-sm font-medium text-gray-900">$ {{ team.price }}</p>
                  <router-link :to="`/resources/${team.specifications}`" class="text-sm font-medium text-gray-900">
                    {{ $t('Projects.specifications') }} ->
                  </router-link>
                </div>
              </div>
            </router-link>
            <button @click="accept(team.uuid)" v-if="project.status === 'proposal' && inMyProjects(mandates)"
                    class="justify-center bg-green-500 hover:bg-green-600 text-white mt-3 font-bold py-1 px-3 rounded inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>{{ $t('Projects.accept') }}</span>
            </button>
          </div>
        </li>
      </ul>
    </section>
    <section class="container my-6" v-if="!edition">
      <div class="flex justify-between items-center">
        <h2 class="py-4 text-blue-900 text-2xl font-medium">{{ $t('Resources.title') }}</h2>
        <div class="flex justify-between items-center">
          <button v-if="inMyProjects(mandates)" @click="onAddFeedback = true"
                  :disabled="onAddResource || onAddFeedback"
                  class="mr-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded inline-flex items-center disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            <span>{{ $t('Resources.feedback') }}</span>
          </button>
          <button v-if="inMyProjects()" @click="onAddResource = true" :disabled="onAddResource || onAddFeedback"
                  class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded inline-flex items-center disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span>{{ $t('Resources.new') }}</span>
          </button>
        </div>
      </div>
      <div v-if="onAddFeedback" class="mb-4 flex flex-col">
        <StarRating :increment=0.01 :padding=1 :rounded-corners=true v-model:rating="grade"/>
      </div>
      <DropZone v-if="onAddResource || grade > 0" @close="setGrade"/>
    </section>
  </main>
</template>

<script>

import ProjectsService from "@/services/projects.service";
import DropZone from "@/components/ui/DropZone";
import inArray from "@/utils/inArray";
import EditOrCreateProject from "@/components/layout/EditOrCreateProject";
import { RELATION_ARBITRATES, RELATION_DEVELOPS, RELATION_MANDATES } from "@/enums/relations";
import TeamsService from "@/services/teams.service";
import StarRating from "vue-star-rating";
import request from "@/utils/request";
import dateFormat from "dateformat";

export default {
  name: 'Project',
  components: { DropZone, EditOrCreateProject, StarRating },
  watch: {
    $route() {
      if (this.$route.name === 'project') {
        this.retrieveProject();
        this.retrieveTeams();
      }
    }
  },

  data() {
    return {
      mandates: RELATION_MANDATES,
      edition: false,
      onAddFeedback: false,
      onAddResource: false,
      grade: 0,
      project: { uuid: '', title: '' },
      myTeams: { STATUS_ACTIVE: [] },
      myProjects: [],
      teams: [],
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
    this.retrieveProject();
    this.retrieveTeams();
    this.retrieveMyProjects();
    this.retrieveMyTeams();
  },

  methods: {
    inArray,

    format(date) {
      if (date) {
        return dateFormat(new Date(date), 'dd.mm.yyyy')
      }
    },

    inMyProjects(relation = 0) {
      if (relation) {
        return inArray(this.project.uuid, this.myProjects[relation]);
      }
      return (inArray(this.project.uuid, this.myProjects[RELATION_ARBITRATES]) ||
          inArray(this.project.uuid, this.myProjects[RELATION_DEVELOPS]) ||
          inArray(this.project.uuid, this.myProjects[RELATION_MANDATES]));
    },

    hasTeamApply(uuid) {
      return inArray(uuid, this.teams.map(team => {return team['uuid']}));
    },

    setGrade() {
      if (!this.onAddFeedback)
      {
        this.onAddResource = false;
        return;
      }
      else if (this.grade > 0 && this.grade <= 5)
      {
        const feedback = 0; // TODO
        request(ProjectsService.feedback(this.project.uuid, { mark: this.grade, feedback }), this)
        this.grade = 0;
        this.onAddResource = false;
        this.onAddFeedback = false;
      }
    },

    async retrieveProject() {
      this.project = await request(ProjectsService.get(this.$route.params.uuid), this);
    },

    async retrieveTeams() {
      this.teams = await request(ProjectsService.getTeams(this.$route.params.uuid), this);
    },

    async retrieveMyProjects() {
      this.myProjects = await request(ProjectsService.getMine(), this);
      for (const s in this.myProjects) {
        if (this.projects[s]) {
          this.myProjects[s] = this.myProjects[s].map(project => { return project.uuid });
        }
      }
    },

    async retrieveMyTeams() {
      this.myTeams = await request(TeamsService.getMine(), this);
    },

    async apply(uuid) {
      const price = 0; // TODO
      const specifications = 0; // TODO
      await request(ProjectsService.apply(this.project.uuid, { teamUuid: uuid, price, specifications }), this);
    },

    async accept(uuid) {
      await request(ProjectsService.accept(this.project.uuid, uuid), this);
    },

  }
};
</script>
