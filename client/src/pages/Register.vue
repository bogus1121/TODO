<template>
  <v-layout>
    <v-flex xs6 offset-xs3 class="mt-16 pt-16">
      <base-card title="Register">
        <v-text-field
          @keyup.enter="register"
          v-if="!$store.state.isUserLoggedIn"
          v-model="email"
          name="email"
          label="Email..."
          class="pt-3 pb-3"
          type="email"
          hide-details
          outlined
          dense
        ></v-text-field>
        <v-text-field
          @keyup.enter="register"
          v-if="!$store.state.isUserLoggedIn"
          v-model="password"
          name="password"
          label="Password..."
          class="pt-3 pb-3"
          type="password"
          hide-details
          outlined
          dense
        ></v-text-field>
        <v-alert
          v-if="error"
          border="bottom"
          colored-border
          type="warning"
          elevation="2"
        >
          {{ error }}
        </v-alert>
        <v-btn
          @click="register"
          v-if="!$store.state.isUserLoggedIn"
          color="#1e3d59"
          dark
        >
          Register
        </v-btn>
        <p
          v-if="!$store.state.isUserLoggedIn"
          class="text-end text--secondary text-decoration-none pt-1"
        >
          Do you have already account?<br />Try to
          <router-link to="/login" class="text-decoration-none"
            >sign in</router-link
          >!
        </p>
        <v-btn to="todo" v-else color="#1e3d59" dark>
          Go to Todos!
        </v-btn>
      </base-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import BaseCard from "@/components/UI/BaseCard";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        });
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        this.$store.dispatch("setToken", response.token);
        this.$store.dispatch("setUser", response.user);
        this.$router.replace("/todo");
        this.error = null;
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  components: {
    BaseCard
  }
};
</script>
