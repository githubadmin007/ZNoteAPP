<template>
  <!--  -->
  <v-row class="todo-list" dense :no-gutters="!IsRoot">
    <v-col v-for="todo in list" :key="todo.todobh" cols="12" :md="IsRoot?6:12" :lg="IsRoot?4:12" :xl="IsRoot?3:12">
      <todo-node :todo="todo" @update="update"></todo-node>
    </v-col>
  </v-row>
</template>

<script>
import axios from '../../../plugins/axios'
import { mapGetters } from 'vuex'
import TodoNode from './TodoNode'

export default {
  name: 'TodoList',
  components: {
    TodoNode
  },
  data () {
    return {
      list: [] // 待办事项列表
    };
  },
  props: {
    parentbh: {
      type: String,
      default: ''
    }
  },
  computed: {
    IsRoot () {
      return this.parentbh === '';
    },
    ...mapGetters('API', ['Todo_GetList'])//, 'Todo_Finish', 'Todo_Abandon', 'Todo_FinishToday', 'Todo_GetParentBH'
  },
  methods: {
    // 刷新列表
    Refresh () {
      // this.list = [];
      let formData = new FormData();
      formData.append('parentbh', this.parentbh);
      formData.append('state', this.IsRoot ? '进行中' : '进行中,完成');
      axios.post(this.Todo_GetList, formData).then(response => {
        this.list = response.data;
        this.Sort();
        this.$emit('update');
      }).catch(() => {});
    },
    // 排序
    Sort () {
      this.list = this.list.sort((a, b) => {
        return a.deadline < b.deadline ? 1 : -1;
      }).sort((a, b) => {
        return a.state === '完成' ? 1 : -1;
      });
    },
    // 更新节点
    update (oldTodo, newTodo) {
      let index = this.list.findIndex(todo => todo === oldTodo);
      this.list.splice(index, 1, newTodo);
      this.Sort();
    }
  },
  mounted () {
    this.Refresh();
  }
}
</script>

<style scoped>
</style>
