<template>
    <div class="todo">
        <todo-list ref="TodoList" @update="Refresh"></todo-list>
        <v-speed-dial v-model="dFab" fixed right bottom>
            <template v-slot:activator>
                <v-btn v-model="dFab" fab>
                    <v-icon v-if="dFab" color="red darken-2" dark
                        >mdi-close</v-icon
                    >
                    <v-icon v-else color="blue darken-2" dark>mdi-home</v-icon>
                </v-btn>
            </template>
            <v-btn @click="Refresh" color="green" dark fab
                ><v-icon>mdi-refresh</v-icon></v-btn
            >
            <v-btn @click="CreateTodo()" color="green" dark fab
                ><v-icon>mdi-plus</v-icon></v-btn
            >
        </v-speed-dial>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodoList from "./TodoList.vue";
import MISForm from "../../components/MIS/Form/src/MISForm.vue";

@Component({
    components: {
        TodoList,
    },
})
export default class Todo extends Vue {
    dFab = false;

    CreateTodo() {
        this.$VWindow({
            id: "ToDoInfo",
            moveAble: true,
            component: MISForm,
            componentProps: {
                FormCode: "Form20200606121830",
                InitCode: "Init20201204103005",
                CtrlCode: "Ctrl20201202145130"
            },
            afterClose: (data: boolean) => {
                if (data) {
                    this.Refresh();
                }
            }
        });
    }
    Refresh() {
        const TodoList = this.$refs.TodoList as TodoList;
        TodoList.RefreshList();
    }
}
</script>