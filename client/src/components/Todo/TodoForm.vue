<template>
  <form @submit.prevent="addTodo">
    <v-col md="12">
      <v-layout class="align-baseline">
        <v-text-field
          v-model="todo.task"
          label="Type here your todo"
          outlined
          dense
          :rules="[required]"
          required
        ></v-text-field>
        <v-btn class="ml-4" type="submit">
          submit
        </v-btn>
      </v-layout>
      <v-slider
        v-model="todo.priority"
        :color="sliderColor.color"
        label="Priority"
        step="1"
        max="5"
        thumb-label
      >
      </v-slider>
      <v-alert type="warning" v-if="fieldFilled">
        Please, write some todo...
      </v-alert>
    </v-col>
  </form>
</template>

<script>
import TodosService from "@/services/TodosService";

export default {
  emits: ["task-created"],
  data() {
    return {
      todo: {
        task: "",
        priority: 1,
        userId: this.$store.state.user.id
      },
      fieldFilled: false,
      required: value => !!value || "Required."
    };
  },
  methods: {
    async addTodo() {
      try {
        const task = await TodosService.post(this.todo);
        this.$emit("task-created", task);
      } catch (err) {
        console.log(err);
      }
      (this.todo.task = ""), (this.todo.priority = 1);
    }
  },
  computed: {
    sliderColor() {
      if (this.todo.priority < 2) {
        return {
          color: "lime darken-1",
          text: "Very high"
        };
      } else if (this.todo.priority === 2) {
        return {
          color: "yellow lighten-1",
          text: "Very high"
        };
      } else if (this.todo.priority === 3) {
        return {
          color: "amber",
          text: "Very high"
        };
      } else if (this.todo.priority === 4) {
        return {
          color: "orange darken-1",
          text: "Very high"
        };
      } else {
        return {
          color: "red",
          text: "Very high"
        };
      }
    }
  }
};
</script>
