<template>
  <v-layout>
    <v-flex xs6 offset-xs3 class="mt-16 pt-16">
      <base-card title="Todos">
        <todo-form
          @task-created="addTask"
          v-if="$store.state.isUserLoggedIn"
        ></todo-form>
        <p v-else>
          Please <router-link to="/login">login</router-link> or
          <router-link to="/register">register</router-link> first
        </p>
        <v-divider />
        <todos-tab
          :todos="todos"
          v-if="$store.state.isUserLoggedIn"
        ></todos-tab>
      </base-card>
    </v-flex>
  </v-layout>
</template>

<script>
import TodosService from "../services/TodosService";
import BaseCard from "@/components/UI/BaseCard";
import TodoForm from "@/components/Todo/TodoForm";
import TodosTab from "@/components/Todo/TodosTab";

export default {
  components: {
    BaseCard,
    TodoForm,
    TodosTab
  },
  data() {
    return {
      todos: []
    };
  },
  methods: {
    async loadTodos() {
      if (this.$store.state.isUserLoggedIn) {
        this.todos = await TodosService.index(this.$store.state.user.id);
      } else {
        return;
      }
    },
    addTask(task) {
      this.todos.unshift({
        id: task.id,
        taskName: task.taskName,
        priority: task.priority
      });
    }
  },
  mounted() {
    this.loadTodos();
  }
};
</script>
