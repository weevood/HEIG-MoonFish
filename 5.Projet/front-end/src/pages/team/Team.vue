<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <AlertSuccess :message="message"/>
    <AlertError :message="errorMessage && $t(`error.${ errorMessage }`)"/>
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-blue-900 text-3xl font-medium">{{ team.name }}</h1>
    </div>
    <section v-if="isOwner" class="container">
      <Form class="flex flex-col" @submit="updateTeam" :validation-schema="schema" v-slot="{ errors }">
        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="name">{{ $t('name') }}</label>
          <Field id="name" name="name" type="text" v-model="team.name"
                 class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
          <ErrorMessage name="name" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
        </div>
        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="color">{{ $t('color') }}</label>
          <Field id="color" name="color" type="text" v-model="team.color"
                 class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
          <ErrorMessage name="color" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
        </div>
        <button :disabled="loading || Object.keys(errors).length"
                class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 focus:outline-none focus:ring disabled:opacity-50 inline-flex items-center justify-center">
          <svg v-show="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ $t('save') }}</span>
        </button>
      </Form>
    </section>
    <section class="container my-6">
      <h2 class="py-4 text-blue-900 text-2xl font-medium">{{ $t('Teams.members') }}</h2>
      <ul class="flex flex-wrap items-center" style="margin-left: -8px; margin-right: -8px">
        <li v-for="(member, i) in members.STATUS_ACTIVE" :key="`Members-ACTIVE-${i}`"
            class="flex flex-col w-1/3 mb-4">
          <div class="flex flex-col px-4 py-6 mx-2 h-48 content-center bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
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
            <div class="flex flex-col mt-4">
              <button v-if="false" @click="accept(member.uuid)"
                      class="justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ $t('Teams.accept') }}</span>
              </button>
              <button v-if="!isOwner(member.uuid)" @click="ban(member.uuid)"
                      class="justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <span>{{ $t('Teams.ban') }}</span>
              </button>
              <button v-if="!isOwner(member.uuid)" @click="giveOwnership(member.uuid)"
                      class="mt-2 justify-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ $t('Teams.giveOwnership') }}</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <h3 class="py-2 text-blue-900 text-1xl font-medium">{{ $t('Teams.requests') }}</h3>
      <ul class="flex flex-wrap items-center" style="margin-left: -8px; margin-right: -8px">
        <li v-for="(member, i) in members.STATUS_INACTIVE" :key="`Members-INACTIVE-${i}`"
            class="flex flex-col w-1/3 mb-4">
          <div class="flex flex-col p-4 mx-2 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
            <router-link :to="`/users/${member.uuid}`" class="flex items-center">
              <div :class="`p-3 mr-4 bg-${team.color}-500 text-white rounded-full`">
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
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ $t('Teams.accept') }}</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import AlertSuccess from "@/components/ui/AlertSuccess";
import AlertError from "@/components/ui/AlertError";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import inArray from '@/utils/inArray';
import TeamsService from "@/services/teams.service";

export default {
  name: 'Team',
  components: { AlertSuccess, AlertError, Form, Field, ErrorMessage },

  data() {
    const schema = yup.object().shape({
      name: yup
          .string()
          .required(this.$t('required', { item: this.$t('firstName') }))
          .max(60, this.$t('maxChars', { max: 60 })),
      color: yup
          .string()
          .required(this.$t('required', { item: this.$t('lastName') }))
          .max(60, this.$t('maxChars', { max: 60 }))
    });
    return {
      loading: false,
      errorMessage: this.$route.query.error,
      message: this.$route.query.message,
      schema,
      team: { uuid: '', name: '', color: '', ownerUuid: '' },
      members: [],
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
    this.retrieveTeamAndMembers();
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },

  methods: {
    inArray,

    async retrieveTeamAndMembers() {
      this.team = await TeamsService.get(this.$route.params.uuid);
      this.members = await TeamsService.getMembers(this.team.uuid);
    },

    isOwner(uuid = this.currentUser.uuid) {
      return this.team.ownerUuid === uuid
    },

    updateTeam(team) {
      this.loading = true;
      console.log(team);
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
