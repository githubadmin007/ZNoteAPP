<template>
  <v-form v-model="valid" style="width:100%;">
    <template v-for="(field,index) in fields">
      <v-row :key="index" dense>
        <v-col>
          <!--多行文本框-->
          <v-textarea v-if="field.type=='textarea'"
            v-model="field.value"
            :label="field.cname"
            :rules="field.rules"
            rows="2"
            row-height="25"
            dense outlined auto-grow>
          </v-textarea>
          <!--下拉框-->
          <v-select v-else-if="field.type=='select'"
            v-model="field.value"
            :items="field.items"
            :label="field.cname"
            :rules="field.rules"
            item-text="ITEMNAME"
            item-value="ITEMVALUE"
            dense outlined>
          </v-select>
          <!--普通文本框-->
          <v-text-field v-else-if="field.type=='text'"
            v-model="field.value"
            :label="field.cname"
            :rules="field.rules"
            dense outlined>
          </v-text-field>
          <!--时间-->
          <v-menu
            v-model="field.showmenu"
            v-else-if="field.type=='datetime'"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="field.value"
                :label="field.cname"
                :rules="field.rules"
                v-on="on"
                dense outlined readonly>
              </v-text-field>
            </template>
            <v-date-picker v-model="field.value" @input="field.showmenu=false"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </template>
    <v-btn class="r-btn" color="error" @click="Cancel">取消</v-btn>
    <v-btn class="r-btn" color="primary" :disabled="!valid" @click="Save">保存</v-btn>
  </v-form>
</template>

<script>
import axios from '../../plugins/axios.js'
import { mapGetters } from 'vuex'
import { NotEmptyRule, CreateLengthRule } from '../../assets/script/InputRule.js'

export default {
  data () {
    return {
      valid: false,
      fields: [
        // 金额
        {
          name: 'amount',
          cname: '金额',
          value: '',
          type: 'text',
          rules: [
            NotEmptyRule
          ]
        },
        // 类型
        {
          name: 'type',
          cname: '类型',
          value: '',
          type: 'select',
          items: [],
          rules: [
            NotEmptyRule
          ]
        },
        // 到账日期
        {
          name: 'arrivaldate',
          cname: '到账日期',
          value: new Date().Format('yyyy-MM-dd'),
          type: 'datetime',
          showmenu: false,
          rules: [
            NotEmptyRule
          ]
        },
        // 所属年
        {
          name: 'belong_year',
          cname: '所属年',
          value: '',
          type: 'select',
          items: [],
          rules: []
        },
        // 所属月
        {
          name: 'belong_month',
          cname: '所属月',
          value: '',
          type: 'select',
          items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          rules: []
        },
        // 收入来源
        {
          name: 'source',
          cname: '收入来源',
          value: '',
          type: 'select',
          items: [],
          rules: [
            NotEmptyRule
          ]
        },
        // 备注
        {
          name: 'remark',
          cname: '备注',
          value: '',
          type: 'textarea',
          rules: [
            CreateLengthRule(500)
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters('API', ['SystemDict', 'Income_Add'])
  },
  methods: {
    // 保存
    Save () {
      if (this.valid) {
        let formData = new FormData();
        for (var i in this.fields) {
          var field = this.fields[i];
          formData.append(field.name, field.value);
        }
        axios.post(this.Income_Add, formData).then(response => {
          this.$VMessage.success(response.msg);
          this.$router.push('/income/list');
        }).catch(error => {
          console.log(error);
        });
      }
    },
    // 取消
    Cancel () {
      this.$router.push('/income/list');
    }
  },
  mounted () {
    let _this = this;
    // 收入类型
    axios.get(this.SystemDict + '?dictbh=D181E21AC3D744EBBD283935CA984A0B').then(response => {
      let field = _this.fields.find(field => field.name === 'type');
      if (field) {
        field.items = response.data;
        if (response.data.length > 0) {
          field.value = response.data[0].ITEMVALUE;
        }
      }
    });
    // 收入来源
    axios.get(this.SystemDict + '?dictbh=F481E21AC3D744EBBD283935CA984A0B').then(response => {
      let field = _this.fields.find(field => field.name === 'source');
      if (field) {
        field.items = response.data;
        if (response.data.length > 0) {
          field.value = response.data[0].ITEMVALUE;
        }
      }
    });
    // 所属年
    let date = new Date();
    let yearField = _this.fields.find(field => field.name === 'belong_year');
    let year = date.getFullYear();
    for (let i = 2017; i <= year; i++) {
      yearField.items.push({
        ITEMNAME: i,
        ITEMVALUE: i
      });
    }
    yearField.value = year;
    // 所属月
    let monthField = _this.fields.find(field => field.name === 'belong_month');
    monthField.value = date.getMonth() + 1;
  }
}
</script>

<style>
  .r-btn {
    float: right;
    margin: 0px 10px;
  }
</style>
