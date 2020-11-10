<template>
    <div class="mis-form">
        <v-form v-model="valid" style="width:100%;">
            <template v-for="(field,index) in fields">
                <v-row :key="index" dense>
                    <v-col>
                        <Field v-model="datas[field.name]" v-bind="field"></Field>
                    </v-col>
                </v-row>
            </template>
            <v-row dense>
                <v-col>
                    <v-btn class="r-btn" color="error" @click="Cancel">取消</v-btn>
                    <v-btn class="r-btn" color="primary" v-show="!readonly" :disabled="!valid" @click="Save">保存</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
import axios from '../../../../src/plugins/axios'
import { mapGetters } from 'vuex'
import Field from './Field.vue'

export default {
    name: "misForm",
    components: {
        Field
    },
    data () {
        return {
            valid: false,
            fields: [],
            datas: {}
        };
    },
    computed: {
        ...mapGetters('API', ['Form_GetFields']),
    },
    props: {
        formcode: String,
        readonly: Boolean,
        keyname: {
            type: String,
            default: ''
        },
        keyvalue: {
            type: String,
            default: ''
        }
    },
    watch: {
        formcode () {
            this.Refresh();
        },
        keyname () {
            this.Refresh();
        },
        keyvalue () {
            this.Refresh();
        },
    },
    methods: {
        Refresh () {
            // 获取任务类型候选项
            let url = `${this.Form_GetFields}?formcode=${this.formcode}&keyname=${this.keyname}&keyvalue=${this.keyvalue}`;
            axios.get(url).then(response => {
                let datas = {};
                this.fields = response.data.map(field => {
                    datas[field.name] = field.value;
                    return field;
                });
                this.datas = datas;
            }).catch(error => {
                console.log(error);
            });
        },
        Save () {
            if (this.valid) {
                this.$emit('save', this.datas);
            }
        },
        Cancel () {
            this.$emit('cancel');
        }
    },
    mounted () {
        this.Refresh();
    }
}
</script>

<style scoped>
    .mis-form {
        width:100%;
        padding: 20px;
    }
    .r-btn {
        float: right;
        margin: 0px 10px;
    }
</style>
