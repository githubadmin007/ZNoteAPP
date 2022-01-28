<template>
    <div class="mis-form">
        <v-overlay :value="dLoading" absolute>
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-form v-model="dValid">
            <MISField
                v-for="field in dFields"
                :key="field.FieldBH"
                v-model="dFormData[field.Name]"
                v-bind="field"
                v-bind:ReadOnly="ReadOnly"
            ></MISField>
        </v-form>
        <div class="form-btns">
            <v-btn class="r-btn" color="error" @click="Close">取消</v-btn>
            <v-btn
                class="r-btn"
                color="primary"
                v-show="!ReadOnly"
                :disabled="!dValid"
                @click="Save"
                >保存</v-btn
            >
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { APIModule } from "../../../../store/modules";
import MISField from "./MISField.vue";

@Component({
    name: "mis-form",
    components: {
        MISField,
    },
})
export default class MISForm extends Vue {
    @Prop({ default: "" }) FormCode!: string;
    @Prop({ default: "" }) InitCode!: string;
    @Prop({ default: "" }) CtrlCode!: string;
    @Prop({ default: false }) ReadOnly!: boolean;
    @Prop({ default: "" }) KeyName!: string;
    @Prop({ default: "" }) KeyValue!: string;
    @Prop() DefaultValue!: Record<string, any>;

    dLoading = false;
    dValid = false;
    dFormData: Record<string, any> = {};
    dFields = [];

    /** 将表单配置信息存进FormData中并返回 */
    GetFormConfig() {
        const config = new FormData();
        config.append("formcode", this.FormCode);
        config.append("initcode", this.InitCode);
        config.append("ctrlcode", this.CtrlCode);
        config.append("readonly", this.ReadOnly.toString());
        config.append("keyname", this.KeyName);
        config.append("keyvalue", this.KeyValue);
        return config;
    }

    /** 保存表单 */
    async Save() {
        try {
            this.dLoading = true;
            const config = this.GetFormConfig();
            config.append("data", JSON.stringify(this.dFormData));
            const response = await this.$axios.post(
                APIModule.FormSaveAPI,
                config
            );
            this.$VMessage.success("成功");
            this.dLoading = false;
            this.$emit("closewindow", true);
        } catch (e) {
            console.log(e);
        }
    }
    /** 关闭表单 */
    Close() {
        this.$emit("closewindow");
    }
    /** 刷新表单 */
    async Refresh() {
        try {
            this.dLoading = true;
            const config = this.GetFormConfig();
            const response = await this.$axios.post(
                APIModule.FormGetFieldsAPI,
                config
            );
            this.dFields = response.data;
            const dFormData: Record<string, any> = {};
            this.dFields.forEach((field: any) => {
                // 默认值
                if (this.DefaultValue && this.DefaultValue[field.Name]) {
                    field.Value = this.DefaultValue[field.Name];
                }
                dFormData[field.Name] = field.Value;
            });
            this.dFormData = dFormData;
            this.dLoading = false;
        } catch (e) {
            console.log(e);
        }
    }

    created() {
        this.Refresh();
    }
}
</script>

<style lang="scss" scoped>
.mis-form {
    width: 100%;
    height: 100%;
    padding-top: 10px;
    position: relative;
}
</style>
