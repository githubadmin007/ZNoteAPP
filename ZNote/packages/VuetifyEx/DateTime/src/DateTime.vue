<template>
    <component v-bind:is="`v-${mode}`"
        offset-y
        v-model="show"
        :close-on-content-click="false"
        :nudge-right="40"
        :disabled="disabled"
        transition="scale-transition"
        width="290px"
        min-width="290px">
        <template v-slot:activator="{ on }">
            <v-text-field
                v-on="on"
                v-bind:value="value"
                :label="label"
                :disabled="disabled"
                :clearable="clearable"
                :dense="dense"
                :outlined="outlined"
                :readonly="readonly"
                :rules="rules">
            </v-text-field>
        </template>
        <v-date-picker v-bind:value="value" @input="Input"></v-date-picker>
    </component>
</template>

<script>
export default {
    name: 'VDateTime',
    data () {
        return {
            show: false,
        };
    },
    props: {
        // 弹出模式
        mode: {
            type: String,
            default: 'menu' // menu、dialog
        },
        value: String,
        disabled: Boolean,
        clearable: {
            type: Boolean,
            default: true
        }, 
        dense: {
            type: Boolean,
            default: true
        }, 
        outlined: {
            type: Boolean,
            default: true
        },
        readonly: {
            type: Boolean,
            default: true
        },
        // 文字标签
        label: String,
        // 限制规则
        rules: Array,
    },
    methods: {
        Input (value) {
            this.show = false;
            this.$emit('input', value);
        }
    }
}
</script>
