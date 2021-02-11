<template>
  <v-layout>
    <v-container fluid>
      <v-simple-table fixed-header height="auto">
        <thead>
          <tr>
            <th class="text-center">
              To Do:
            </th>
            <th class="text-center">
              Priority
            </th>
            <th class="text-center">
              Edit
            </th>
            <th class="text-center">
              Done
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todos" :key="todo.id">
            <td>{{ todo.taskName }}</td>
            <td>
              <v-chip :color="getColor(todo.priority).color" dark>
                {{ getColor(todo.priority).text }}
              </v-chip>
            </td>
            <td>
              <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    x-small
                    fab
                    outlined
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="#1e3d59" dark>Edit todo</v-toolbar>
                    <v-card-text>
                      <v-layout class="align-center mt-10">
                        <v-text-field
                          v-model="todo.taskName"
                          label="Type here your todo"
                          outlined
                          hide-details
                          dense
                          :rules="[required]"
                          required
                          @keyup.enter="
                            editTask(todo.id);
                            dialog.value = false;
                          "
                        ></v-text-field>
                        <v-btn
                          class="mr-4"
                          type="submit"
                          @click="
                            editTask(todo.id);
                            dialog.value = false;
                          "
                        >
                          submit
                        </v-btn>
                      </v-layout>
                      <v-slider
                        v-model="todo.priority"
                        :color="getColor(todo.priority).color"
                        label="Priority"
                        step="1"
                        max="5"
                        thumb-label
                        ticks
                      ></v-slider>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog.value = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </td>
            <td>
              <v-btn
                x-small
                fab
                outlined
                color="success"
                @click="removeTask(todo.id)"
              >
                <v-icon>
                  mdi-check-underline
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </v-layout>
</template>

<script>
import TodosService from "@/services/TodosService";

export default {
  props: ["todos"],
  data() {
    return {
      required: value => !!value || "Required."
    };
  },
  methods: {
    async editTask(id) {
      try {
        const updatedTask = this.findIndex(id);
        await TodosService.edit(updatedTask);
      } catch (err) {
        console.log(err);
      }
    },
    async removeTask(id) {
      try {
        const removeTask = this.findIndex(id);
        await TodosService.remove(removeTask.id);
        for (let i = 0; i < this.todos.length; i++)
          if (this.todos[i].id === removeTask.id) {
            this.todos.splice(i, 1);
            break;
          }
      } catch (err) {
        console.log(err);
      }
    },
    findIndex(taskId) {
      const foundTask = this.todos.find(({ id }) => id === taskId);
      return foundTask;
    },
    getColor(priority) {
      if (priority < 2) {
        return {
          color: "lime darken-1",
          text: "very low"
        };
      } else if (priority === 2) {
        return {
          color: "yellow lighten-1",
          text: "Low"
        };
      } else if (priority === 3) {
        return {
          color: "amber",
          text: "Medium"
        };
      } else if (priority === 4) {
        return {
          color: "orange darken-1",
          text: "High"
        };
      } else {
        return {
          color: "red",
          text: "Very high"
        };
      }
    }
  },
  computed: {
    closeDialog() {
      dialog.value = false;
    }
  }
};
</script>
