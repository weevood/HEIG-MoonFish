<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
    <AlertSuccess :message="message"/>
    <AlertError :message="errorMessage && $t(`error.${ errorMessage }`)"/>
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-blue-900 text-3xl font-medium">{{ $t('Profile.title') }}</h1>
    </div>
    <section v-if="false" class="container">
      <p><strong>id: </strong>{{ currentUser.id }}</p>
      <p><strong>uuid: </strong>{{ currentUser.uuid }}</p>
      <p>
        <strong>Token:</strong>
        {{ token && token.substring(0, 20) }} ...
        {{ token && token.substr(token.length - 20) }}
      </p>
    </section>
    <section class="container">
      <Form class="flex flex-col" @submit="updateUser" :validation-schema="schema" v-slot="{ errors }">
        <div class="overflow-y-auto" style="max-height: 60vh">
          <div v-for="(value, key) in profile" :key="`UserKey-${key}`">
            <div v-if="inArray(key, whiteList)" class="mb-6 pt-3 rounded bg-gray-200">
              <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" :for="`${key}`">{{ $t(key) }}</label>
              <Field :id="`${key}`" :name="`${key}`" type="text" :value="value && `${value}`"
                     class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
              <ErrorMessage :name="`${key}`" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
            </div>
          </div>
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
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              @click="changePassword">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
        </svg>
        <span>{{ $t('Profile.changePassword') }}</span>
      </button>
    </section>
  </main>
</template>

<script>
import AlertSuccess from "@/components/ui/AlertSuccess";
import AlertError from "@/components/ui/AlertError";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import inArray from '@/utils/inArray';
import request from "@/utils/request";
import ProfileService from "@/services/profile.service";

export default {
  name: 'Profile',
  components: { AlertSuccess, AlertError, Form, Field, ErrorMessage },

  data() {
    const schema = yup.object().shape({
      firstName: yup
          .string()
          .required(this.$t('required', { item: this.$t('firstName') }))
          .max(60, this.$t('maxChars', { max: 60 })),
      lastName: yup
          .string()
          .required(this.$t('required', { item: this.$t('lastName') }))
          .max(60, this.$t('maxChars', { max: 60 })),
      lang: yup
          .string()
          .required(this.$t('required', { item: this.$t('lang') }))
          .min(2, this.$t('minChars', { min: 2 }))
          .max(2, this.$t('maxChars', { max: 2 })),
    });
    return {
      schema,
      whiteList: ['city', 'country', 'firstName', 'lang', 'lastName', 'phone', 'state', 'street', 'zipCode'],
      loading: false,
      errorMessage: this.$route.query.error,
      message: this.$route.query.message,
      profile: null
    };
  },

  computed: {
    token() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.token;
      }
      return '';
    },
    currentUser() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.user;
      }
      return false;
    }
  },

  mounted() {
    this.retrieveProfile();
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },

  methods: {
    inArray,

    changePassword() {
      this.$router.push('/profile/changePassword');
    },

    async retrieveProfile() {
      this.profile = await request(ProfileService.get(), this);
    },

    async updateUser(user) {
      this.loading = true;
      this.$emit('msg', { status: 'OK', message: 'Profile.updated' })
      await request(ProfileService.update(user), this)
      await this.retrieveProfile();
      this.loading = false;
    }

  }

};
</script>
