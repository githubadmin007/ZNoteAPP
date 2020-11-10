<template>
  <div class="todo-node">
    <v-sheet :color="color+' lighten-2'" :elevation="IsRoot?10:0" :tile="!IsRoot">
      <v-progress-linear :color="color+' darken-1'" :background-color="color" :value="progress" height="80">
        <v-list-item dense three-line
          v-contextmenu="{items:menuItems,Data:this}"
          @click="isOpen=!isOpen">
          <v-list-item-content>
            <v-list-item-title>{{todo.name}}</v-list-item-title>
            <v-list-item-subtitle>{{todo.type}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{stateStr}}</v-list-item-subtitle>
          </v-list-item-content>
          <!-- <v-list-item-avatar tile><v-btn>开始</v-btn></v-list-item-avatar> -->
          <v-list-item-icon v-if="todo.sub_num>0">
            <v-icon>{{arrowIcon}}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-progress-linear>
      <!-- <p>{{todo.content}}</p> -->
      <div class="sub-list">
        <todo-list ref="sublist" v-show="isOpen" :parentbh="todo.todobh" @update="update"></todo-list>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import axios from '../../../plugins/axios'
import { mapGetters } from 'vuex'

const menuItems = [
  // 查看
  {
    text: '查看',
    icon: '',
    click: (event, _this) => {
      _this.Read();
    }
  },
  // 编辑
  {
    text: '编辑',
    icon: '',
    click: (event, _this) => {
      _this.Edit();
    }
  },
  // 刷新
  {
    text: '刷新',
    icon: '',
    click: (event, _this) => {
      _this.Refresh(true);
    }
  },
  null,
  // 今日完成
  {
    text: '今日完成',
    icon: '',
    click: (event, _this) => {
      _this.FinishToday();
    }
  },
  // 完成
  {
    text: '完成',
    icon: '',
    click: (event, _this) => {
      _this.Finish();
    }
  },
  // 放弃
  {
    text: '放弃',
    icon: '',
    click: (event, _this) => {
      _this.Abandon();
    }
  },
  null,
  // 创建子任务
  {
    text: '创建子任务',
    icon: '',
    click: (event, _this) => {
      _this.CreateSubTodo();
    }
  }
];

export default {
  name: 'TodoNode',
  components: {
    'todo-list': () => import('./TodoList')
  },
  data () {
    return {
      isOpen: false,
      menuItems
    };
  },
  props: {
    todo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters('API', ['Todo_GetInfo', 'Todo_GetList', 'Todo_Finish', 'Todo_Abandon', 'Todo_FinishToday', 'Todo_GetParentBH']),
    // 是否根节点
    IsRoot () {
      return this.todo.parentbh === '';
    },
    // 根据剩余天数获取颜色
    color () {
      if (this.todo.state === '完成') {
        return 'grey';
      }
      let date = Math.floor(this.todo.residue_hour / 24);
      if (date < 0) {
        return 'grey'
      } else if (date < 1) {
        return 'red'
      } else if (date < 3) {
        return 'orange'
      } else if (date < 7) {
        return 'yellow'
      } else if (date < 36500) {
        return 'green'
      } else {
        return 'white'
      }
    },
    // 获取状态文字
    stateStr () {
      if (this.todo.state === '完成') {
        return '已完成';
      }
      let deadline = new Date(this.todo.deadline);
      let state = '';
      if (this.todo.residue_hour < 0) {
        state = '已过期';
      } else if (this.todo.residue_hour > 1000000) {
        return '未限时';
      } else {
        let date = parseInt(this.todo.residue_hour / 24);
        let hour = this.todo.residue_hour % 24;
        state = '剩余' + date + '天' + hour + '小时';
      }
      return '在' + deadline.Format('yyyy年MM月dd日') + '前完成（' + state + '）';
    },
    // 箭头图标
    arrowIcon () {
      return this.isOpen ? 'mdi-chevron-down' : 'mdi-chevron-right';
    },
    // 表单对象
    todoform () {
      let p = this;
      while (!p.$refs.todoform) {
        p = p.$parent;
      }
      return p.$refs.todoform;
    },
    // 进度
    progress () {
      if (this.todo.state === '完成') {
        return 100;
      } else {
        if (this.todo.sub_num > 0) {
          return 100 * this.todo.sub_finish_num / this.todo.sub_num
        }
        return 0;
      }
    }
  },
  methods: {
    // 刷新节点（sub参数为是否刷新子列表）
    Refresh (sub) {
      let formData = new FormData();
      formData.append('todobh', this.todo.todobh);
      axios.post(this.Todo_GetInfo, formData).then(response => {
        this.$emit('update', this.todo, response.data);
      }).catch(error => {
        console.log(error);
      });
      if (sub) {
        this.$refs.sublist.Refresh();
      }
    },
    // 完成待办项
    Finish () {
      let formData = new FormData();
      formData.append('todobh', this.todo.todobh);
      axios.post(this.Todo_Finish, formData).then(response => {
        this.$parent.Refresh();
        this.$VMessage.success('已完成任务');
      }).catch(error => {
        console.log(error);
      });
    },
    // 放弃待办项
    Abandon () {
      let formData = new FormData();
      formData.append('todobh', this.todo.todobh);
      axios.post(this.Todo_Abandon, formData).then(response => {
        this.$parent.Refresh();
        this.$VMessage.info('已放弃任务');
      }).catch(error => {
        console.log(error);
      });
    },
    // 设为今日完成
    FinishToday () {
      let formData = new FormData();
      formData.append('todobh', this.todo.todobh);
      axios.post(this.Todo_FinishToday, formData).then(response => {
        this.Refresh(true);
        this.$VMessage.success('成功设为今日完成');
      }).catch(error => {
        console.log(error);
      });
    },
    // 查看
    Read () {
      this.todoform.Read(this.todo, this);
    },
    // 修改待办项
    Edit () {
      this.todoform.Edit(this.todo, this);
    },
    // 创建子任务
    CreateSubTodo () {
      this.todoform.NewSub(this.todo, this);
    },
    // 子列表更新事件
    update () {
      this.Refresh(false);
    }
  },
  mounted () {}
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
