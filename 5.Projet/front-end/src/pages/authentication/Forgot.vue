<template>
  <AuthHeader/>
  <main class="max-w-lg mx-auto flex-grow w-9/12">
    <div class="bg-gray-100 p-8 md:p-12 my-5 rounded-lg shadow-2xl flex-grow">
      <section>
        <h3 class="text-blue-900 text-3xl font-medium">{{ $t('Forgot.title') }}</h3>
      </section>
      <hr class="border-blue-900 border-t-2 w-1/4 mt-3"/>
      <AlertSuccess v-if="successful" :message="$t('Forgot.successful')" :garnish="message"/>
      <section v-if="!successful" class="mt-10">
        <AlertError :message="message && $t(`error.${ message }`)"/>
        <Form class="flex flex-col" @submit="handleForgot" :validation-schema="schema" v-slot="{ errors }">
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="email">{{ $t('email.email') }}</label>
            <Field id="email" name="email" type="text" v-model="email"
                   class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
            <ErrorMessage name="email" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
          </div>
          <button :disabled="loading || Object.keys(errors).length"
                  class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 focus:outline-none focus:ring disabled:opacity-50 inline-flex items-center justify-center">
            <svg v-show="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ $t('Forgot.submit') }}</span>
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
import AlertSuccess from "@/components/ui/AlertSuccess";
import AlertError from "@/components/ui/AlertError";
import AuthHeader from "@/components/layout/AuthHeader";

export default {
  name: 'Forgot',
  components: { AuthHeader, AlertSuccess, AlertError, AuthFooter, Form, Field, ErrorMessage },

  data() {
    const schema = yup.object().shape({
      email: yup
          .string()
          .required(this.$t('required', { item: this.$t('email.email') }))
          .email(this.$t('invalid', { item: this.$t('email.email') }))
          .max(50, this.$t('maxChars', { max: 50 })),
    });
    return {
      email: this.$route.query.email,
      successful: false,
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

  mounted() {
    if (this.loggedIn) {
      this.$router.push('/dashboard');
    }
  },

  methods: {
    handleForgot(user) {
      this.message = '';
      this.successful = false;
      this.loading = true;
      this.$store.dispatch('auth/forgot', user.email).then(
          (data) => {
            if (data.userData.verification) {
              this.message = `</br><a href="/reset/${ data.userData.verification }?email=${ user.email }"
                                 class="text-blue-500">&rarr; Bypass validate (dev only)</a>`;
            }
            this.successful = true;
            this.loading = false;
          },
          (error) => {
            this.message = error.msg || error.toString();
            this.successful = false;
            this.loading = false;
          }
      );
    },

    login() {
      this.$router.push(`/login?email=${this.email}`);
    },

    register() {
      this.$router.push(`/register?email=${this.email}`);
    }
  },
};
</script>
