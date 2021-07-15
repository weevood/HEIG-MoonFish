<template>
  <div class="col-md-12">
    <div class="card card-container">
      <Form @submit="handleLogin" :validation-schema="schema">

        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="text" class="form-control"/>
          <ErrorMessage name="email" class="error-feedback"/>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control"/>
          <ErrorMessage name="password" class="error-feedback"/>
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>

      </Form>
    </div>
  </div>
</template>

<script>
import {Form, Field, ErrorMessage} from 'vee-validate';
import * as yup from 'yup';

export default {
  name: 'Login',
  components: {Form, Field, ErrorMessage},

  data() {
    const schema = yup.object().shape({
      email: yup.string().required("email is required!"),
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
  },
};
</script>
