<template>
  <v-dialog v-model="dialog"><!-- persistent -->
    <div class="todoinfo">
      <mis-form
        formcode="Form20200606121830"
        keyname="todobh"
        :keyvalue="todobh"
        @save="Save"
        @cancel="Cancel">
      </mis-form>
    </div>
  </v-dialog>
</template>

<script>
import axios from '../../../plugins/axios.js'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      todobh: '',
      parentbh: '',
      node: null, // TodoNode对象
      mode: '',
      dialog: false
    };
  },
  computed: {
    ...mapGetters('API', ['Todo_Add', 'Todo_Modify', 'Todo_GetInfo']),
    // 保存时调用的接口
    SaveUrl () {
      if (this.mode === 'edit') {
        return this.Todo_Modify;
      } else { // if (this.mode === 'newsub')
        return this.Todo_Add
      }
    },
    // 是否只读模式
    ReadOnly () {
      return this.mode === 'read';
    }
  },
  methods: {
    // 保存
    Save (datas) {
      let formData = new FormData();
      for (var i in datas) {
        formData.append(i, datas[i]);
      }
      formData.append('todobh', this.todobh);
      formData.append('parentbh', this.parentbh);
      axios.post(this.SaveUrl, formData).then(response => {
        this.node.Refresh(this.mode === 'newsub');
        this.Close();
      }).catch(error => {
        console.log(error);
      });
    },
    // 取消
    Cancel () {
      this.Close();
    },
    // 新建任务
    New (node) {
      this.mode = 'new';
      this.todobh = '';
      this.parentbh = '';
      this.node = node;
      this.ShowDialog();
    },
    // 新建子任务
    NewSub (todo, node) {
      this.mode = 'newsub';
      this.todobh = '';
      this.parentbh = todo.todobh;
      this.node = node;
      this.ShowDialog();
    },
    // 只读
    Read (todo, node) {
      this.mode = 'read';
      this.todobh = todo.todobh;
      this.parentbh = todo.parentbh;
      this.node = node;
      this.ShowDialog(todo);
    },
    // 编辑
    Edit (todo, node) {
      this.mode = 'edit';
      this.todobh = todo.todobh;
      this.parentbh = todo.parentbh;
      this.node = node;
      this.ShowDialog(todo);
    },
    // 刷新Clear
    ShowDialog (todo) {
      // if (todo) {
      //   this.fields.find(field => field.name === 'name').value = todo.name;
      //   this.fields.find(field => field.name === 'content').value = todo.content;
      //   this.fields.find(field => field.name === 'type').value = todo.type;
      //   this.fields.find(field => field.name === 'deadline').value = new Date(todo.deadline).Format('yyyy-MM-dd');
      // } else {
      //   this.fields.find(field => field.name === 'name').value = '';
      //   this.fields.find(field => field.name === 'content').value = '';
      //   this.fields.find(field => field.name === 'type').value = '';
      //   this.fields.find(field => field.name === 'deadline').value = ''; // new Date().Format('yyyy-MM-dd');
      // }
      this.dialog = true;
    },
    // 关闭
    Close () {
      this.todobh = '';
      this.parentbh = '';
      this.dialog = false;
    }
  },
  mounted () {}
}
</script>

<style>
  .todoinfo {
    background-color: #fff;
  }
  .r-btn {
    /* float: right; */
    margin: 0px 10px;
  }
</style>
