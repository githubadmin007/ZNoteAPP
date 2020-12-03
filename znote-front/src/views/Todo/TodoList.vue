<template>
    <v-row class="todo-list" dense>
        <v-col
            v-for="todo in TodoList"
            :key="todo.todobh"
            cols="12"
            :md="6"
            :lg="4"
            :xl="3"
        >
            <!-- @update="update" -->
            <todo-node :todo="todo"></todo-node>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { APIModule } from "@/store/modules";
import BaseTodoList from "./BaseTodoList";
import { Todo } from "./todo";
import TodoNode from "./TodoNode.vue";

@Component({
    components: {
        TodoNode,
    },
})
export default class TodoList extends BaseTodoList {
    created() {
        this.RefreshList();
    }
}
</script>
