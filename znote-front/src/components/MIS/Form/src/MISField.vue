<template>
    <div class="mis-field" v-if="cShowField">
        <div class="field-label" :style="cLabelStyle">
            {{ CName }}
        </div>
        <div class="field-component" :style="cComponentStyle">
            <component
                outlined
                dense
                :is="cComponentName"
                :value="value"
                :rules="dRules"
                :items="dItems"
                :readonly="cReadOnly"
                @input="Input"
            ></component>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    name: "mis-field",
})
export default class MISField extends Vue {
    @Prop() value: any;
    @Prop({ default: "" }) FieldBH!: string;
    @Prop({ default: "" }) Name!: string;
    @Prop({ default: "" }) CName!: string;
    @Prop({ default: "text" }) Type!: string;
    @Prop({ default: "编辑" }) AccessType!: string;
    @Prop({ default: "150px" }) LabelWidth!: string;
    @Prop({ default: false }) ReadOnly!: boolean;

    dRules = [];
    dItems = [];

    /** 是否隐藏 */
    get cShowField() {
        return this.AccessType != "隐藏";
    }
    /** 是否只读 */
    get cReadOnly() {
        return this.ReadOnly || this.AccessType == "只读";
    }
    /** 组件名称 */
    get cComponentName() {
        switch (this.Type) {
            case "datetime":
                return "v-date-time";
            case "select":
                return "v-select";
            case "textarea":
                return "v-textarea";
            case "text":
            default:
                return "v-text-field";
        }
    }
    /** 标签样式 */
    get cLabelStyle() {
        return {
            width: this.LabelWidth,
        };
    }
    /** 组件样式 */
    get cComponentStyle() {
        return {
            width: `calc(100% - ${this.LabelWidth})`,
        };
    }

    /** 输入事件 */
    Input(value: any) {
        this.$emit("input", value);
    }

    created() {
        //
    }
}
</script>

<style lang="scss" scoped>
.mis-field {
    .field-label {
        display: inline-block;
        text-align: right;
        padding-right: 10px;
    }
    .field-component {
        display: inline-block;
        padding-right: 10px;
    }
}
</style>
