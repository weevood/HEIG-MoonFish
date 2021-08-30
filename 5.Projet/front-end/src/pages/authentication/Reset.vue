<template>
  <AuthHeader/>
  <main class="max-w-lg mx-auto flex-grow w-9/12">
    <div class="bg-gray-100 p-8 md:p-12 my-5 rounded-lg shadow-2xl flex-grow">
      <section>
        <h3 class="text-blue-900 text-3xl font-medium">{{ $t('Reset.title') }}</h3>
      </section>
      <hr class="border-blue-900 border-t-2 w-1/4 mt-3"/>
      <AlertError :message="message && $t(`error.${ message }`)"/>
      <section class="mt-10">
        <Form class="flex flex-col" @submit="handleReset" :validation-schema="schema" v-slot="{ errors }">
          <div class="mb-6 pt-3 rounded bg-gray-200 opacity-50">
            <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="email">{{ $t('email.your') }}</label>
            <Field id="email" name="email" type="text" v-model="email" disabled
                   class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
            <ErrorMessage name="email" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
          </div>
          <div class="mr-1 mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="password">{{ $t('password.new') }}</label>
            <Field id="password" name="password" type="password" autocomplete="new-password"
                   class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
            <ErrorMessage name="password" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
          </div>
          <div class="ml-1 mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="confirmPassword">{{ $t('password.confirm') }}</label>
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
            <span>{{ $t('Reset.submit') }}</span>
          </button>
        </Form>
      </section>
    </div>

    <div class="max-w-lg mx-auto text-center mt-5 mb-6">
      <p class="text-white">
        <a href="#" class="font-bold hover:underline" @click.prevent="login">{{ $t('login') }}</a> or
        <a href="#" class="font-bold hover:underline" @click.prevent="register">{{ $t('Register.register') }}</a>
      </p>
    </div>
  </main>
  <AuthFooter/>
</template>

<script>
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';
import AuthFooter from '@/components/layout/AuthFooter';
import AlertError from "@/components/ui/AlertError";
import AuthHeader from "@/components/layout/AuthHeader";

export default {
  name: 'Reset',
  components: { AuthHeader, AlertError, AuthFooter, Form, Field, ErrorMessage },

  data() {
    const schema = yup.object().shape({
      email: yup
          .string()
          .required(this.$t('required', { item: this.$t('email.email') }))
          .email(this.$t('invalid', { item: this.$t('email.email') }))
          .max(50, this.$t('maxChars', { max: 50 })),
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
      email: this.$route.query.email,
      loading: false,
      message: '',
      schema,
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  created() {
    if (this.loggedIn) {
      this.$router.push('/dashboard');
    }
  },

  methods: {
    handleReset(user) {
      this.loading = true;
      this.$store.dispatch('auth/reset',
              {
                verification: this.$route.params.uuid,
                email: user.email,
                password: user.password
              })
          .then(
              () => {
                this.$router.push('/login?message=RESET_SUCCESS');
              },
              (error) => {
                this.loading = false;
                this.message = error.msg || error.toString();
              }
          );
    },

    login() {
      this.$router.push(`/login` + (this.email ? `?email=${this.email}` : ''));
    },

    register() {
      this.$router.push(`/register` + (this.email ? `?email=${this.email}` : ''));
    }
  },
};
</script>
