<template>
    <v-app-bar
        fixed
        color="#ffc13b"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
    >
        <v-toolbar-title to="todo">
            ToDoApp
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="mr-8">
            <v-btn
                v-if="!$store.state.isUserLoggedIn"
                class="elevation-0"
                color="#f0b42c"
                dark
                to="login"
            >
                Login
            </v-btn>

            <v-btn
                v-if="!$store.state.isUserLoggedIn"
                class="elevation-0"
                color="#f0b42c"
                dark
                to="register"
            >
                Sign up
            </v-btn>

            <v-btn
                v-if="$store.state.isUserLoggedIn"
                class="elevation-0"
                color="#f0b42c"
                dark
                @click="logout"
                to="/"
            >
                Logout
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch('setToken', null);
            this.$store.dispatch('setUser', null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
};
</script>
