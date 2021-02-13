<template>
    <v-card class="elevation-2">
        <v-toolbar flat dense dark color="#1e3d59">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
            <slot> </slot>
        </div>
    </v-card>
</template>

<script>
export default {
    props: ['title']
};
</script>
