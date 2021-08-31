<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <div class="container mx-auto px-6 py-8 flex justify-between items-center">
      <h1 class="text-blue-900 text-3xl font-medium">{{ project.title }}</h1>
      <button v-if="!edition && inMineProjects" @click="edition = true"
              class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
        <span>{{ $t('Projects.edit') }}</span>
      </button>
    </div>
    <EditOrCreateProject v-if="edition" :uuid="project.uuid" :title="project.title" :tags="project.tags"
                         :teams="[{uuid: mandateTeamUuid}]" :description="project.description"
                         :deadline="project.deadline" @msg="transfer" @done="refresh"/>
    <section class="container" v-if="!edition">
      <div>
        <span class="font-bold text-gray-600">{{ project.status?.toUpperCase() }}</span>
        <ul class="my-2" style="margin-left: -4px; margin-right: -4px">
          <li v-for="(tag, j) in tags(project.tags)" :key="`Tags-${i}-tags-${j}`"
              class="mx-1 text-xs inline-flex items-center font-bold leading-sm px-3 py-1 bg-blue-900 text-white rounded">
            {{ tag }}
          </li>
        </ul>
        <pre class="text-sm font-normal text-gray-700 my-2" v-html="project.description"></pre>
        <div v-if="inArray(project.status, finishedStatus)">
          <p class="text-sm font-normal text-gray-700 mt-4 my-2">
            {{ `${ $t('Projects.end') }: ${ project.endDate && format(project.endDate) }` }}</p>
          <StarRating :rating="project.mark" :rounded-corners=true :read-only=true :star-size=20
                      :increment=0.5 :show-rating=false style="margin-left: -5px" class="my-2"/>
          <router-link :to="`/resources/${project.feedback}`"
                       class="flex text-sm font-medium text-gray-900 hover:text-blue-900 my-2">
            {{ $t('Projects.feedback') }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="-4 -2 32 32"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>
        <div v-else>
          <p class="text-xs font-bold text-blue-900">Deadline: {{ format(project.deadline) }}</p>
        </div>
      </div>
    </section>
    <section class="container my-6" v-if="!edition && teams.length">
      <div v-if="!inMyProjects && project.status === 'proposal' && !teamUuid"
           style="margin-left: -8px; margin-right: -8px">
        <button v-for="(team, i) in myTeams.STATUS_ACTIVE" :key="`MyTeams-${i}`"
                :disabled="hasTeamApply(team.uuid)" @click="teamUuid = team.uuid"
                class="text-white font-bold py-2 px-3 rounded inline-flex items-center m-2 disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                :class="[!team.relation.isOwner && 'hidden', team.color ? `bg-${team.color}-500 hover:bg-${team.color}-600` : 'bg-green-500 hover:bg-green-600']">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"/>
          </svg>
          <span>{{ `${ $t('Projects.apply') } ${ $t('with') } &laquo; ${ team.name } &raquo;` }}</span>
        </button>
      </div>
      <Form v-if="teamUuid" class="flex flex-col my-6" :validation-schema="schema" v-slot="{ errors }">
        <h3 class="py-4 text-blue-900 text-2xl font-medium">{{ $t('Projects.apply') }}</h3>
        <div class="pt-3 rounded bg-gray-200">
          <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="price">{{
              $t('Projects.price')
            }}</label>
          <Field id="price" name="price" type="number" v-model="price"
                 class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
          <ErrorMessage name="price" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
        </div>
        <div v-if="teamUuid && price && !Object.keys(errors).length">
          <label class="block text-gray-700 text-sm font-bold mt-4 mb-2"
                 for="specs">{{ $t('Projects.specs') }}</label>
          <DropZone id="specs" :project="project" :ownerUuid="ownerUuid" type="apply" @msg="transfer" @upload="upload"/>
        </div>
      </Form>
      <h2 class="py-4 text-blue-900 text-2xl font-medium">{{ $t('Teams.title') }}</h2>
      <ul class="flex flex-wrap items-center" style="margin-left: -8px; margin-right: -8px">
        <li v-for="(team, i) in teams" :key="`Teams-${i}`"
            class="flex flex-col w-1/3 mb-4">
          <div
              class="flex flex-col px-4 py-6 mx-2 content-center bg-white border-2 border-gray-200 rounded-lg shadow-sm">
            <router-link v-if="team.relation.name === 'ARBITRATES'" :set="user = team"
                         :to="`/users/${user.uuid}`" class="flex items-center">
              <div class="p-3 mr-4 bg-gray-500 text-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ user.firstName }} {{ user.lastName }} <span
                    class="text-gray-600 uppercase"> - {{ user.relation.name }}</span></p>
              </div>
            </router-link>
            <router-link v-else :to="`/teams/${team.uuid}`" class="flex items-center">
              <div class="p-3 mr-4 bg-gray-500 text-white rounded-full" :class="team.color && `bg-${team.color}-500`">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ team.name }}<span
                    class="text-gray-600 uppercase"> - {{ team.relation.name }}</span></p>
                <div v-if="project.status === 'proposal' && team.relation.name !== 'MANDATES' ">
                  <p class="text-sm font-medium text-gray-900">$ {{ team.relation.price }}</p>
                  <router-link :to="`/resources/${team.relation.specifications}`"
                               class="flex text-sm font-medium text-gray-900 hover:text-blue-900">
                    {{ $t('Projects.specifications') }}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="-4 -2 32 32"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </router-link>
                </div>
              </div>
            </router-link>
            <button @click="accept(team.uuid)"
                    v-if="project.status === 'proposal' && inMineProjects && team.relation.name !== 'MANDATES' "
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
          <button v-if="inMineProjects && project.status === 'ongoing'" @click="onAddFeedback = true"
                  :disabled="onAddResource || onAddFeedback"
                  class="mr-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded inline-flex items-center disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            <span>{{ $t('Resources.feedback') }}</span>
          </button>
          <button v-if="inMyProjects" @click="onAddResource = true" :disabled="onAddResource || onAddFeedback"
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
      <DropZone v-if="onAddResource || grade > 0" :project="project" :ownerUuid="ownerUuid"
                :type="grade > 0 ? 'feedback' : 'upload'"
                @msg="transfer" @upload="upload"/>
      <p v-if="!resources.length && !onAddResource && !grade" class="italic text-gray-600">{{
          $t('noItems')
        }}</p>
      <ul class="flex flex-wrap items-center mt-3" style="margin-left: -8px; margin-right: -8px">
        <li v-for="(resource, i) in resources" :key="`Resources-${i}`"
            class="w-full mb-1">
          <div class="px-4 py-1 mx-2 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
            <router-link :to="`/resource/${resource.id}`" class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">
                {{ resource.name }}<span class="text-gray-600"> - {{ resource.privacy?.toUpperCase() }}</span>
              </p>
              <a href="{{resource.link}}"
                 class="flex text-xs font-medium text-blue-900 hover:text-teal-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="-4 -2 32 32"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                <span class="mt-1 ml-1">{{ $t('Resources.link') }}</span>
              </a>
            </router-link>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>

import ProjectsService from "@/services/projects.service";
import DropZone from "@/components/ui/DropZone";
import inArray from "@/utils/inArray";
import EditOrCreateProject from "@/components/layout/EditOrCreateProject";
import TeamsService from "@/services/teams.service";
import StarRating from "vue-star-rating";
import request from "@/utils/request";
import dateFormat from "dateformat";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { RELATION_MANDATES } from "@/enums/relations";
import NotificationsService from "@/services/notifications.service";

export default {
  name: 'Project',
  components: { ErrorMessage, Field, Form, DropZone, EditOrCreateProject, StarRating },
  emits: ['msg'],
  watch: {
    $route() {
      if (this.$route.name === 'project') {
        this.edition = false;
        this.getProject();
        this.retrieveTeams();
        this.retrieveResources();
      }
    }
  },

  data() {
    const schema = yup.object().shape({
      price: yup.number().required(this.$t('required', { item: this.$t('name') }))
    });
    return {
      schema,
      edition: false,
      onApply: false,
      onAddFeedback: false,
      onAddResource: false,
      inMineProjects: false,  // Projects that I mandates
      inMyProjects: false,    // All projects linked with my teams
      grade: 0,
      price: 0,
      ownerUuid: '',
      teamUuid: 0,
      mandateTeamUuid: '',
      teams: [],
      resources: [],
      myTeams: { STATUS_ACTIVE: [] },
      project: { title: '', description: '', deadline: '' },
      finishedStatus: ['ended', 'abandoned'],
      myProjects: {
        RELATION_APPLIES: [],
        RELATION_ARBITRATES: [],
        RELATION_DEVELOPS: [],
        RELATION_MANDATES: []
      },
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
    this.getProject();
    this.retrieveTeams();
    this.retrieveMyTeams();
    this.retrieveResources();
  },

  methods: {
    inArray,

    format(date) {
      if (date) {
        return dateFormat(new Date(date), 'dd.mm.yyyy')
      }
    },

    tags(tags) {
      return tags && !Array.isArray(tags) ? tags.split(';') : tags;
    },

    transfer(msg) {
      if (msg.status !== 'OK') {
        this.retrieveProject();
      }
      this.$emit('msg', msg);
    },

    refresh(project) {
      this.project.title = project.title;
      this.project.description = project.description;
      this.project.deadline = project.deadline;
      this.project.tags = project.tags;
      this.edition = false;
    },

    hasTeamApply(uuid) {
      return inArray(uuid, this.teams.map(team => {return team['uuid']}));
    },

    async getProject() {
      this.retrieveProject().then(() => this.retrieveMyProjects().then(() =>
      {
        this.inMineProjects = inArray(this.project.uuid, this.myProjects.RELATION_MANDATES);
        this.inMyProjects = (
            inArray(this.project.uuid, this.myProjects.RELATION_MANDATES) ||
            inArray(this.project.uuid, this.myProjects.RELATION_DEVELOPS) ||
            inArray(this.project.uuid, this.myProjects.RELATION_ARBITRATES)
        );
      }));
    },

    upload(type, files = []) {
      for (const file of files) {
        this.resources.push(file);
      }
      if (type === 'apply' && this.teamUuid && this.price && files.length)
      {
        this.apply(files[0].id);
      }
      else if (type === 'feedback' && this.onAddFeedback && files.length && this.grade > 0 && this.grade <= 5)
      {
        this.feedback(this.grade, files[0].id);
      }
      this.teamUuid = 0;
      this.price = 0;
      this.grade = 0;
      this.onApply = false;
      this.onAddResource = false;
      this.onAddFeedback = false;
    },

    async retrieveProject() {
      this.project = await request(ProjectsService.get(this.$route.params.uuid), this);
    },

    async retrieveResources() {
      this.resources = await request(ProjectsService.getResources(this.$route.params.uuid), this);
    },

    async retrieveTeams() {
      this.teams = await request(ProjectsService.getTeams(this.$route.params.uuid), this);
      this.teams.some(function(team) {
        if (team.relation.name === RELATION_MANDATES) {
          this.ownerUuid = team.ownerUuid;
          return true;
        }
      }, this);
    },

    async retrieveMyProjects() {
      this.myProjects = await request(ProjectsService.getMine(), this);
      this.myProjects.RELATION_MANDATES.some(function(project) {
        if (this.project.uuid === project.uuid) {
          this.mandateTeamUuid = project.team.uuid;
          return true;
        }
      }, this);
      for (const s in this.myProjects) {
        this.myProjects[s] = this.myProjects[s].map(project => { return project.uuid });
      }
    },

    async retrieveMyTeams() {
      this.myTeams = await request(TeamsService.getMine(), this);
    },

    async accept(uuid) {
      await request(ProjectsService.accept(this.project.uuid, uuid), this);
      await this.retrieveTeams();
      await this.retrieveProject();
      const members = await request(TeamsService.getMembers(uuid), this);
      for (const user of members) {
        await request(NotificationsService.create({
          userUuid: user.uuid,
          lang: 'en', // user.lang
          title: this.$t('Projects.notification.accepted.title'),
          description: this.$t('Projects.notification.accepted.desc', { project: this.project.title }),
          link: '/projects/' + this.project.uuid
        }), this);
      }
    },

    async apply(specifications) {
      if (specifications) {
        await request(ProjectsService.apply(this.project.uuid, {
          teamUuid: this.teamUuid,
          price: this.price,
          specifications
        }), this);
        await this.retrieveTeams();
        await this.retrieveResources();
      }
    },

    async feedback(mark, feedback) {
      if (mark && feedback) {
        await request(ProjectsService.feedback(this.project.uuid, { mark, feedback }), this);
        await this.retrieveProject();
        await this.retrieveResources();
      }
    },

  }
};
</script>
