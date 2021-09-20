<template>
  <main class="flex-1 bg-gray-100">
    <AlertSuccess v-if="!errorMessage" :message="message"/>
    <AlertError :message="errorMessage && $t(`error.${ errorMessage }`)"/>
    <div class="container mx-auto px-6 py-8">
      <h1 class="text-blue-900 text-3xl font-medium">{{ $t('Profile.changePassword') }}</h1>
    </div>
    <section class="container">
      <Form class="flex flex-col" @submit="changePassword" :validation-schema="schema"
            v-slot="{ errors }">
        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="oldPassword">{{
              $t('password.old')
            }}</label>
          <Field id="oldPassword" name="oldPassword" type="password" autocomplete="current-password"
                 class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
          <ErrorMessage name="oldPassword" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
        </div>
        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="password">{{
              $t('password.new')
            }}</label>
          <Field id="password" name="password" type="password" autocomplete="new-password"
                 class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
          <ErrorMessage name="password" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
        </div>
        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3"
                 for="confirmPassword">{{ $t('password.confirm') }}</label>
          <Field id="confirmPassword" name="confirmPassword" type="password" autocomplete="new-password"
                 class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
          <ErrorMessage name="confirmPassword" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
        </div>
        <button :disabled="loading || Object.keys(errors).length"
                class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 focus:outline-none focus:ring disabled:opacity-50 inline-flex items-center justify-center">
          <svg v-show="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ $t('password.change') }}</span>
        </button>
      </Form>
    </section>
  </main>
</template>

<script>
import AlertSuccess from "@/components/ui/AlertSuccess";
import AlertError from "@/components/ui/AlertError";
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';
import request from "@/utils/request";
import ProfileService from "@/services/profile.service";

export default {
  name: 'ChangePassword',
  components: { AlertSuccess, AlertError, Form, Field, ErrorMessage },

  data() {
    const schema = yup.object().shape({
      oldPassword: yup
          .string()
          .required(this.$t('required', { item: this.$t('password.old') }))
          .min(8, this.$t('minChars', { min: 8 }))
          .max(40, this.$t('maxChars', { max: 40 })),
      password: yup
          .string()
          .required(this.$t('required', { item: this.$t('password.pwd') }))
          .min(8, this.$t('minChars', { min: 8 }))
          .max(40, this.$t('maxChars', { max: 40 })),
      confirmPassword: yup
          .string()
          .required(this.$t('required', { item: this.$t('password.confirm') }))
          .oneOf([yup.ref('password'), null], this.$t('password.match'))
          .min(8, this.$t('minChars', { min: 8 }))
          .max(40, this.$t('maxChars', { max: 40 })),
    });
    return {
      loading: false,
      errorMessage: this.$route.query.error,
      message: this.$route.query.message,
      schema
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
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },

  methods: {

    async changePassword(user) {
      this.loading = true;
      this.$emit('msg', { status: 'OK', message: 'password.updated' })
      await request(ProfileService.updatePwd(
          {
            old: user.oldPassword,
            new: user.confirmPassword,
          }
      ), this)
      this.loading = false;
    }

  }

};
</script>
