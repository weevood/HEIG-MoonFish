<template>
  <section class="container mb-6">
    <Form class="flex flex-col" @submit="updateOrCreate" :validation-schema="schema" v-slot="{ errors }">
      <Field hidden id="uuid" name="uuid" type="text" :value="uuid"/>
      <div class="mb-6 pt-3 rounded bg-gray-200">
        <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="title">{{ $t('title') }}</label>
        <Field id="title" name="title" type="text" :model="title"
               class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
        <ErrorMessage name="title" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
      </div>
      <div class="mb-6 pt-3 rounded bg-gray-200">
        <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="description">{{
            $t('description')
          }}</label>
        <Field id="description" name="description" type="text" :model="description"
               class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
        <ErrorMessage name="description" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
      </div>
      <div class="mb-6 pt-3 rounded bg-gray-200">
        <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="deadline">{{ $t('deadline') }}</label>
        <Field id="deadline" name="deadline" type="text" :model="deadline"
               class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
        <ErrorMessage name="deadline" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
      </div>
      <div class="mb-6 pt-3 rounded bg-gray-200">
        <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="tags">{{ $t('tags') }}</label>
        <Field id="tags" name="tags" type="text" :model="tags"
               class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
        <ErrorMessage name="tags" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
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
// import request from "@/utils/request";
// import ProjectsService from "@/services/projects.service";

export default {
  name: 'EditOrCreateProject',
  components: { Form, Field, ErrorMessage },
  emits: ['done'],

  props: {
    uuid: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    deadline: {
      type: Date,
      default: new Date()
    },
    tags: {
      type: String,
      default: ''
    }
  },

  data() {
    const schema = yup.object().shape({
      name: yup
          .string()
          .required(this.$t('required', { item: this.$t('name') }))
          .max(120, this.$t('maxChars', { max: 120 })),
      description: yup
          .string()
          .required(this.$t('required', { item: this.$t('description') }))
          .max(1024, this.$t('maxChars', { max: 1024 })),
      deadline: yup
          .date() // TODO
          .required(this.$t('required', { item: this.$t('deadline') })),
      tags: yup
          .string()
          .required(this.$t('required', { item: this.$t('tags') }))
          .max(1024, this.$t('maxChars', { max: 1024 }))
    });
    return {
      schema,
      loading: false,
      errorMessage: this.$route.query.error,
      message: this.$route.query.message,
    };
  },

  methods: {

    async updateOrCreate(project) {
      this.loading = true;
      if (project.uuid) {
        // Update existing project
        // request(ProjectsService.update(project), this)
      }
      else {
        // Create a new project
        // project = await request(ProjectsService.create(project), this)
      }
      this.$emit('done', project);
    }

  }

};
</script>
