<template>
  <section class="container mb-6">
    <Form class="flex flex-col" @submit="updateOrCreate" :validation-schema="schema" v-slot="{ errors }">
      <Field hidden id="uuid" name="uuid" type="text" :value="uuid"/>
      <div class="mb-6 pt-3 rounded bg-gray-200">
        <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="name">{{ $t('name') }}</label>
        <Field id="name" name="name" type="text" :value="name"
               class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
        <ErrorMessage name="name" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
      </div>
      <div class="mb-6 pt-3 rounded bg-gray-200">
        <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="color">{{ $t('color') }}</label>
        <Field id="color" name="color" type="text" :value="color"
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
</template>

<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import TeamsService from "@/services/teams.service";
import request from "@/utils/request";

export default {
  name: 'EditOrCreateTeam',
  components: { Form, Field, ErrorMessage },
  emits: ['done'],

  props: {
    uuid: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },

  data() {
    const schema = yup.object().shape({
      name: yup
          .string()
          .required(this.$t('required', { item: this.$t('name') }))
          .max(60, this.$t('maxChars', { max: 60 })),
      color: yup
          .string()
          .required(this.$t('required', { item: this.$t('color') }))
          .max(60, this.$t('maxChars', { max: 60 }))
    });
    return {
      schema,
      loading: false,
      errorMessage: this.$route.query.error,
      message: this.$route.query.message,
    };
  },

  methods: {

    async updateOrCreate(team) {
      this.loading = true;
      team.color = team.color.toLowerCase()
      if (team.uuid) {
        // Update existing team
        request(TeamsService.update(team), this)
      }
      else {
        // Create a new team
        team = await request(TeamsService.create(team), this)
      }
      this.$emit('done', team);
    }

  }

};
</script>
