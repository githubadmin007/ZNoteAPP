<template>
    <div>
        <todo-list ref="todolist"></todo-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodoList from './TodoList.vue'

@Component({
    components: {
        TodoList
    }
})
export default class Todo extends Vue {}
</script>