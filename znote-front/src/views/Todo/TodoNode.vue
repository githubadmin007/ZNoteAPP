<template>
    <div class="todo-node">
        <v-sheet
            :color="cColor + ' lighten-2'"
            :elevation="cIsRoot ? 10 : 0"
            :tile="!cIsRoot"
        >
            <!-- 节点信息 -->
            <v-progress-linear
                :color="cColor + ' darken-1'"
                :background-color="cColor"
                :value="cProgress"
                height="80"
            >
                <v-list-item
                    dense
                    three-line
                    @click="ClickNode"
                    v-contextmenu="{
                        menuId: 'node-menu',
                        items: dMenuItems,
                        Data: this,
                    }"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ todo.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                            todo.type
                        }}</v-list-item-subtitle>
                        <v-list-item-subtitle>{{
                            cStateStr
                        }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-icon v-if="todo.sub_num > 0">
                        <v-icon>{{ cArrowIcon }}</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-progress-linear>
            <!-- 子列表 -->
            <div class="sub-list" v-if="dSubListLoaded">
                <todo-list-sub
                    ref="sublist"
                    v-show="dSubListOpen"
                    :parentbh="todo.todobh"
                ></todo-list-sub>
            </div>
        </v-sheet>
    </div>
</template>

<script lang="ts">
// import Vue from 'vue'
import { Component, Prop, Vue } from "vue-property-decorator";
import { Todo } from "./todo";

import MISForm from "../../components/MIS/Form/src/MISForm.vue";

@Component({
    components: {
        "todo-list-sub": () => import("./TodoListSub.vue"),
    },
})
export default class TodoNode extends Vue {
    @Prop() todo!: Todo;

    dSubListLoaded = false; // 子列表是否已加载
    dSubListOpen = false; // 子列表是否打开
    dMenuItems = [
        // 查看
        {
            text: "查看",
            icon: "",
            click: (event: any, _this: any) => {
                _this.Read();
            },
        },
        // 编辑
        {
            text: "编辑",
            icon: "",
            click: (event: any, _this: any) => {
                _this.Edit();
            },
        },
        // 刷新
        {
            text: "刷新",
            icon: "",
            click: (event: any, _this: any) => {
                _this.Refresh();
            },
        },
        null,
        // 今日完成
        {
            text: "今日完成",
            icon: "",
            click: (event: any, _this: any) => {
                _this.FinishToday();
            },
        },
        // 完成
        {
            text: "完成",
            icon: "",
            click: (event: any, _this: any) => {
                _this.Finish();
            },
        },
        // 放弃
        {
            text: "放弃",
            icon: "",
            click: (event: any, _this: any) => {
                _this.Abandon();
            },
        },
        null,
        // 创建子任务
        {
            text: "创建子任务",
            icon: "",
            click: (event: any, _this: any) => {
                _this.CreateSubTodo();
            },
        },
    ];

    /** 是否根节点 */
    get cIsRoot() {
        return this.todo.parentbh === "";
    }
    /** 根据剩余天数获取颜色 */
    get cColor() {
        if (this.todo.state === "完成") {
            return "grey";
        }
        const date = Math.floor(this.todo.residue_hour / 24);
        if (date < 0) {
            return "grey";
        } else if (date < 1) {
            return "red";
        } else if (date < 3) {
            return "orange";
        } else if (date < 7) {
            return "yellow";
        } else if (date < 36500) {
            return "green";
        } else {
            return "white";
        }
    }
    /** 获取状态文字 */
    get cStateStr() {
        if (this.todo.state === "完成") {
            return "已完成";
        }
        const deadline = new Date(this.todo.deadline);
        let state = "";
        if (this.todo.residue_hour < 0) {
            state = "已过期";
        } else if (this.todo.residue_hour > 1000000) {
            return "未限时";
        } else {
            const date = parseInt((this.todo.residue_hour / 24).toString());
            const hour = this.todo.residue_hour % 24;
            state = "剩余" + date + "天" + hour + "小时";
        }
        return (
            // "在" + deadline.Format("yyyy年MM月dd日") + "前完成（" + state + "）"
            "在" + deadline.toDateString() + "前完成（" + state + "）"
        );
    }
    /** 箭头图标 */
    get cArrowIcon() {
        return this.dSubListOpen ? "mdi-chevron-down" : "mdi-chevron-right";
    }
    /** 进度 */
    get cProgress() {
        if (this.todo.state === "完成") {
            return 100;
        } else {
            if (this.todo.sub_num > 0) {
                return (100 * this.todo.sub_finish_num) / this.todo.sub_num;
            }
            return 0;
        }
    }

    /** 节点点击事件 */
    ClickNode() {
        this.dSubListLoaded = true;
        this.dSubListOpen = !this.dSubListOpen;
    }
    /** 查看 */
    Read() {
        this.$VWindow({
            id: 'ToDoInfo',
            moveAble: true,
            component: MISForm,
            componentProps: {
                FormCode: "Form20200606121830",
                KeyName: "todobh",
                KeyValue: this.todo.todobh,
            },
        });
    }
    /** 编辑 */
    Edit() {
        console.log(this.todo.todobh);
    }
    /** 刷新 */
    Refresh() {
        console.log("Refresh");
    }
    /** 今日完成 */
    FinishToday() {
        console.log("FinishToday");
    }
    /** 完成 */
    Finish() {
        console.log("Finish");
    }
    /** 放弃 */
    Abandon() {
        console.log("Abandon");
    }
    /** 创建子任务 */
    CreateSubTodo() {
        const DefaultValue = {
            parentbh: this.todo.todobh,
        };
        this.$VWindow({
            id: 'ToDoInfo',
            moveAble: true,
            component: MISForm,
            componentProps: {
                FormCode: "Form20200606121830",
                DefaultValue,
            },
        });
    }
}
</script>

<style scoped>
.todo-node {
    margin: 5px 5px 0px 0px;
}
.sub-list {
    padding-left: 20px;
}
</style>
