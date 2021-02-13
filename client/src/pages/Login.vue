<template>
    <v-layout>
        <v-flex xs6 offset-xs3 class="mt-16 pt-16">
            <base-card title="Login">
                <v-text-field
                    @keyup.enter="login"
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
                    @keyup.enter="login"
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
                    v-if="!$store.state.isUserLoggedIn"
                    @click="login"
                    color="#1e3d59"
                    dark
                >
                    Login
                </v-btn>
                <p
                    v-if="!$store.state.isUserLoggedIn"
                    class="text-end text--secondary"
                >
                    Or you can simply
                    <router-link
                        to="/register"
                        class="text-decoration-none pt-1"
                        >sign up</router-link
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
import AuthenticationService from '@/services/AuthenticationService';
import BaseCard from '@/components/UI/BaseCard';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null
        };
    },
    methods: {
        async login() {
            try {
                const response = await AuthenticationService.login({
                    email: this.email,
                    password: this.password
                });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
                this.$store.dispatch('setToken', response.data.token);
                this.$store.dispatch('setUser', response.data.user);
                this.$router.replace('/todo');
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
