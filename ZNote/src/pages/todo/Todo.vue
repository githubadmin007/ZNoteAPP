<template>
  <div>
    <!-- @contextmenu.prevent="showContextMenu($event,index)" @longpress="showContextMenu($event,index)" v-LongPressAble="700" -->
    <todo-list ref="todolist"></todo-list>
    <todo-info ref="todoform"></todo-info>
    <v-speed-dial v-model="fab" fixed right bottom>
      <template v-slot:activator>
        <v-btn v-model="fab" fab>
          <v-icon v-if="fab" color="red darken-2" dark>mdi-close</v-icon>
          <v-icon v-else color="blue darken-2" dark>mdi-home</v-icon>
        </v-btn>
      </template>
      <v-btn @click="Refresh()" color="green" dark fab><v-icon>mdi-refresh</v-icon></v-btn>
      <v-btn @click="CreateTodo()" color="green" dark fab><v-icon>mdi-plus</v-icon></v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import TodoList from './components/TodoList'
import TodoInfo from './components/TodoInfo'

export default {
  components: {
    TodoList,
    TodoInfo
  },
  data () {
    return {
      fab: false
    };
  },
  methods: {
    // 刷新
    Refresh () {
      this.$refs.todolist.Refresh();
    },
    // 新建待办项
    CreateTodo () {
      this.$refs.todoform.New(this);
    }
  },
  mounted () {}
}
</script>
