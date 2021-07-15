<template>
  <main class="max-w-lg mx-auto flex-grow w-9/12">
    <div class="bg-gray-100 p-8 md:p-12 mt-10 mb-5 rounded-lg shadow-2xl flex-grow">
      <section>
        <h3 class="text-blue-900 text-3xl font-medium">Sign in to your account</h3>
      </section>
      <hr class="border-blue-900 border-t-2 w-1/4 mt-3"/>
      <div v-if="message" role="alert"
           class="bg-red-100 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 my-2 shadow-md">
        <div class="flex">
          <div class="py-1">
            <svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
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
      <section class="mt-10">
        <Form class="flex flex-col" @submit="handleLogin" :validation-schema="schema">
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="email">Email</label>
            <Field id="email" name="email" type="text"
                   class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
            <ErrorMessage name="email" class="error-feedback"/>
          </div>
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold md:mb-2 ml-3" for="password">Password</label>
            <Field id="password" name="password" type="password"
                   class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 md:pb-3"/>
            <ErrorMessage name="password" class="error-feedback"/>
          </div>
          <button :disabled="loading"
                  class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 focus:outline-none focus:ring">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Sign In</span>
          </button>
        </Form>
      </section>
      <div class="md:grid grid-cols-3 divide-x my-3 hidden">
        <hr class="border-gray-500 border-t-1 w-full my-6"/>
        <span class="text-sm text-gray-600 text-center my-3">Or continue with</span>
        <hr class="border-gray-500 border-t-1 w-full my-6"/>
      </div>
      <section class="grid grid-cols-3 divide-x mt-8 md:mt-0">
        <a class="h-16 bg-gray-200 rounded mr-4 p-3 text-center hover:bg-gray-300 transition duration-200">
          <img class="w-auto h-full mx-auto cursor-pointer" src="images/google_logo.svg"
               alt="Sign-in with Google"/>
        </a>
        <a class="h-16 bg-gray-200 rounded mx-2 p-3 text-center hover:bg-gray-300 transition duration-200">
          <img class="w-auto h-full mx-auto cursor-pointer" src="images/github_logo.svg"
               alt="Sign-in with GitHub"/>
        </a>
        <a class="h-16 bg-gray-200 rounded ml-4 p-3 text-center hover:bg-gray-300 transition duration-200">
          <img class="w-auto h-full mx-auto cursor-pointer" src="images/apple_logo.svg" alt="Sign-in with Apple"/>
        </a>
      </section>
    </div>

    <div class="max-w-lg mx-auto text-center mt-5 mb-6">
      <p class="text-white">
        <a href="#" class="font-bold hover:underline">Forgot your password?</a> or
        <a href="#" class="font-bold hover:underline" @click.prevent="register">Don't have an account?</a>
      </p>
    </div>
  </main>
</template>

<script>
import {Form, Field, ErrorMessage} from 'vee-validate';
import * as yup from 'yup';

export default {
  name: 'Login',
  components: {Form, Field, ErrorMessage},

  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
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
    if(this.loggedIn) {
      this.$router.push('/profile');
    }
  },

  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch('auth/login', user).then(
          () => {
            this.$router.push('/profile');
          },
          (error) => {
            this.loading = false;
            this.message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString();
          }
      );
    },

    register() {
      this.$router.push('/register');
    }
  },
};
</script>
