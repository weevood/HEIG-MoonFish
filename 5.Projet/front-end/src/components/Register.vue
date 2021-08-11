<template>
  <main class="max-w-lg mx-auto flex-grow w-9/12">
    <div class="bg-gray-100 p-8 md:p-12 mt-10 mb-5 rounded-lg shadow-2xl flex-grow">
      <section>
        <h3 class="text-blue-900 text-3xl font-medium">Create your account</h3>
      </section>
      <hr class="border-blue-900 border-t-2 w-1/4 mt-3"/>
      <div v-if="successful"
           class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 my-5 shadow-md" role="alert">
        <div class="flex">
          <div class="py-1">
            <svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                  d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
            </svg>
          </div>
          <div>
            <p class="font-bold">Congratulations!</p>
            <p class="text-sm">Your new account has just been created, please validate it by going to your mailbox.</p>
            <p class="text-sm" v-html="message"></p>
          </div>
        </div>
      </div>
      <section v-if="!successful" class="mt-10">
        <div v-if="message" role="alert"
             class="bg-red-100 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 my-5 shadow-md">
          <div class="flex">
            <div class="py-1">
              <svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 20 20">
                <path fill="#f56565"
                      d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
              </svg>
            </div>
            <div>
              <p class="font-bold text-red-500">Error!</p>
              <p class="text-sm">{{ message }}</p>
            </div>
          </div>
        </div>
        <Form class="flex flex-col" @submit="handleRegister" :validation-schema="schema">
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="firstName">First name</label>
            <Field id="firstName" name="firstName" type="text"
                   class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
            <ErrorMessage name="firstName" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
          </div>
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="lastName">Last name</label>
            <Field id="lastName" name="lastName" type="text"
                   class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
            <ErrorMessage name="lastName" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
          </div>
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="email">Email</label>
            <Field id="email" name="email" type="text"
                   class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
            <ErrorMessage name="email" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
          </div>
          <div class="flex flex-row">
            <div class="w-1/2 mr-1 mb-6 pt-3 rounded bg-gray-200">
              <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="password">Password</label>
              <Field id="password" name="password" type="password"
                     class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
              <ErrorMessage name="password" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
            </div>
            <div class="w-1/2 ml-1 mb-6 pt-3 rounded bg-gray-200">
              <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="confirmPassword">Confirm
                password</label>
              <Field id="confirmPassword" name="confirmPassword" type="password"
                     class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
              <ErrorMessage name="confirmPassword" class="block px-3 py-3 bg-red-500 rounded-b text-white text-xs"/>
            </div>
          </div>
          <button :disabled="loading"
                  class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 focus:outline-none focus:ring disabled:opacity-50 inline-flex items-center justify-center">
            <svg v-show="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Sign Up</span>
          </button>
        </Form>
      </section>
    </div>

    <div class="max-w-lg mx-auto text-center mt-5 mb-6">
      <p class="text-white">
        <a href="#" class="font-bold hover:underline" @click.prevent="login">Sign-in</a> or
        <a href="#" class="font-bold hover:underline" @click.prevent="forgot">Forgot your password?</a>
      </p>
    </div>
  </main>
</template>

<script>
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';

export default {
  name: 'Register',
  components: { Form, Field, ErrorMessage },

  data() {
    const schema = yup.object().shape({
      firstName: yup
          .string()
          .required("First name is required!")
          .min(3, "Must be at least 3 characters!")
          .max(30, "Must be maximum 30 characters!"),
      lastName: yup
          .string()
          .required("Last name is required!")
          .min(3, "Must be at least 3 characters!")
          .max(30, "Must be maximum 30 characters!"),
      email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
      password: yup
          .string()
          .required("Password is required!")
          .min(8, "Must be at least 8 characters!")
          .max(40, "Must be maximum 40 characters!"),
      confirmPassword: yup
          .string()
          .required("Please confirm your password!")
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .min(8, "Must be at least 8 characters!")
          .max(40, "Must be maximum 40 characters!"),
    });

    return {
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
      this.$router.push('/profile');
    }
  },

  methods: {
    handleRegister(user) {
      this.message = '';
      this.successful = false;
      this.loading = true;
      this.$store.dispatch('auth/register', user).then(
          (data) => {
            if (data.verification) {
              this.message = `</br><a href="/verify/${ data.verification }?email=${ user.email }"
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
      this.$router.push('/login');
    },

    forgot() {
      this.$router.push('/forgot');
    }
  },
};
</script>
