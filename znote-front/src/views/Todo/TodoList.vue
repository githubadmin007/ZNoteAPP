<template>
    <v-row class="todo-list" dense>
        <v-col
            v-for="(todo, index) in TodoList"
            :key="todo.todobh"
            cols="12"
            :md="cIsRoot ? 6 : 12"
            :lg="cIsRoot ? 4 : 12"
            :xl="cIsRoot ? 3 : 12"
        >
            <!-- @update="update" -->
            <todo-node v-model="TodoList[index]" @refresh="Refresh"></todo-node>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { APIModule } from "@/store/modules";
import { Todo } from "./Todo";
import TodoNode from "./TodoNode.vue";

@Component({
    components: {
        TodoNode,
    },
})
export default class TodoList extends Vue {
    @Prop({ default: "" }) protected parentbh!: string; // 父任务编号

    TodoList: Array<Todo> = [];

    /** 是否根列表 */
    get cIsRoot() {
        return this.parentbh === "";
    }

    /** 刷新列表 */
    async RefreshList() {
        try {
            const formData = new FormData();
            formData.append("parentbh", this.parentbh);
            formData.append("state", this.cIsRoot ? "进行中" : "进行中,完成");
            const response = await this.$axios.post(
                APIModule.TodoGetListAPI,
                formData
            );
            this.TodoList = response.data;
            // this.Sort();
            // this.$emit("update");
        } catch {
            //
        }
    }

    Refresh() {
        this.$emit("refresh");
    }

    created() {
        this.RefreshList();
    }
}
</script>
