<template>
    <div class="mis-form">
        <v-form v-model="dValid">
            <MISField
                v-for="field in dFields"
                :key="field.FieldBH"
                v-model="dFormData[field.Name]"
                v-bind="field"
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
    @Prop({ default: false }) ReadOnly!: boolean;
    @Prop({ default: "" }) KeyName!: string;
    @Prop({ default: "" }) KeyValue!: string;
    @Prop() DefaultValue!: Record<string, any>;

    dValid = false;
    dFormData: Record<string, any> = {};
    dFields = [];

    Close() {
        this.$emit("closewindow");
    }
    async Save() {
        try {
            const data = new FormData();
            data.append("formcode", this.FormCode);
            data.append("keyname", this.KeyName);
            data.append("keyvalue", this.KeyValue);
            data.append("data", JSON.stringify(this.dFormData));
            const response = await this.$axios.post(
                APIModule.FormSaveAPI,
                data
            );
            this.$VMessage({ message: "成功" });
        } catch (e) {
            console.log(e);
        }
    }
    async Refresh() {
        try {
            const url = `${APIModule.FormGetFieldsAPI}?formcode=${this.FormCode}&keyname=${this.KeyName}&keyvalue=${this.KeyValue}`;
            const response = await this.$axios.get(url);
            this.dFields = response.data;
            const data: Record<string, any> = {};
            this.dFields.forEach((field: any) => {
                // 默认值
                if (this.DefaultValue && this.DefaultValue[field.Name]) {
                    field.Value = this.DefaultValue[field.Name];
                }
                data[field.Name] = field.Value;
            });
            this.dFormData = data;
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
    padding-top: 10px;
}
</style>
