import { Component, Vue, Prop } from "vue-property-decorator";
import { Todo } from "./todo";
import { APIModule } from "@/store/modules";

@Component
export default class BaseTodoList extends Vue {
    @Prop({ default: '' }) protected parentbh!: string; // 父任务编号

    TodoList: Array<Todo> = [];

    /** 是否根列表 */
    get cIsRoot() {
        return this.parentbh === '';
    }

    /** 刷新列表 */
    async RefreshList() {
        try {
            const formData = new FormData();
            formData.append("parentbh", this.parentbh);
            formData.append("state", this.cIsRoot ? "进行中" : "进行中,完成");
            const response = await this.$axios.post(
                APIModule.TodoGetList,
                formData
            );
            this.TodoList = response.data;
            // this.Sort();
            // this.$emit("update");
        } catch {
            //
        }
    }
}