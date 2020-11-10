<template>
    <div>
        <component  outlined dense
            :is="comName"
            :value="value"
            :label="cname"
            v-bind="bind"
            @input="Input">
        </component>
    </div>
</template>

<script>
import axios from '../../../../src/plugins/axios'
import { mapGetters } from 'vuex'
import { CreateRule } from './RuleFactory'

export default {
    name: "misField",
    data () {
        return {
            bind: {
                items: [],
                rules: []
            }
        };
    },
    props: {
        value: String,
        fieldbh: String,
        name: String,
        cname: String,
        type: String
    },
    computed: {
        ...mapGetters('API', ['Form_GetFieldItems', 'Form_GetFieldRules']),
        // 组件名称
        comName () {
            switch (this.type) {
                case 'datetime':
                    return 'v-date-time';
                case 'select':
                    return 'v-select';
                case 'textarea':
                    return 'v-textarea';
                case 'text':
                default:
                    return 'v-text-field';
            }
        }
    },
    methods: {
        Input (value) {
            this.$emit('input', value);
        }
    },
    mounted () {
        let _this = this;
        // 获取字段限制规则
        axios.get(this.Form_GetFieldRules + '?fieldbh=' + this.fieldbh).then(response => {
            this.bind.rules = response.data.map( rule => CreateRule(rule));
        }).catch(error => {
            console.log(error);
        });   
        // 获取下拉框候选项
        if (this.type === 'select') {
            axios.get(this.Form_GetFieldItems + '?fieldbh=' + this.fieldbh).then(response => {
                this.bind.items = response.data;
                this.bind['item-text']='ITEMNAME';
                this.bind['item-value']='ITEMVALUE';
            }).catch(error => {
                console.log(error);
            });   
        }
    }
}
</script>
