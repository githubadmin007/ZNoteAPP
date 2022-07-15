<template>
    <v-row no-gutters>
        <!-- 输入 -->
        <v-col cols="12" xl="5" lg="5" md="5">
            <v-select
                v-model="dFromLang"
                :items="dLangLists"
                dense
                outlined
            ></v-select>
            <v-textarea
                v-model="dInputLang"
                @keydown.enter="Translate"
                outlined
            ></v-textarea>
        </v-col>
        <!-- 操控 -->
        <v-col cols="12" xl="2" lg="2" md="2">
            <v-row>
                <v-col
                    cols="6"
                    xl="12"
                    lg="12"
                    md="12"
                    class="d-flex justify-space-around"
                >
                    <v-btn @click="ExchangeLang">
                        <v-icon class="d-none d-md-flex"
                            >mdi-arrow-left-right-bold</v-icon
                        >
                        <v-icon class="d-md-none"
                            >mdi-arrow-up-down-bold</v-icon
                        >
                    </v-btn>
                </v-col>
                <v-col
                    cols="6"
                    xl="12"
                    lg="12"
                    md="12"
                    class="d-flex justify-space-around"
                >
                    <v-btn @click="Translate">
                        <v-icon>mdi-translate</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
        <!-- 输出 -->
        <v-col cols="12" xl="5" lg="5" md="5">
            <v-select
                v-model="dToLang"
                :items="dLangLists"
                dense
                outlined
            ></v-select>
            <v-textarea v-model="dOutputLang" outlined></v-textarea>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { APIModule } from "@/store/modules";

const LangLists = [
    // { text: "自动检测", value: "auto" },
    { text: "中文", value: "zh" },
    { text: "英语", value: "en" },
    { text: "粤语", value: "yue" },
    { text: "文言文", value: "wyw" },
    { text: "日语", value: "jp" },
    { text: "韩语", value: "kor" },
    { text: "法语", value: "fra" },
    { text: "西班牙语", value: "spa" },
    { text: "葡萄牙语", value: "pt" },
    { text: "俄语", value: "ru" },
    { text: "繁体中文", value: "cht" },
];

@Component
export default class Translate extends Vue {
    dLangLists = LangLists;
    dFromLang = "en"; // 输入语言
    dToLang = "zh"; // 输出语言
    dInputLang = ""; // 输入
    dOutputLang = ""; // 输出

    /** 拼接请求地址 */
    get url() {
        const url = `${APIModule.TranslateBaidu}?q=${this.dInputLang}&from=${this.dFromLang}&to=${this.dToLang}`;
        return url;
    }

    /** 交换输入输出语言 */
    ExchangeLang() {
        [this.dFromLang, this.dToLang] = [this.dToLang, this.dFromLang];
    }
    /** 翻译 */
    async Translate() {
        try {
            this.dOutputLang = "";
            if (this.dInputLang) {
                const response = await this.$axios.get(this.url);
                const result = response.data.trans_result;
                if (result && result.length > 0) {
                    this.dOutputLang = result[0].dst;
                } else {
                    this.$VMessage.warning(
                        "失败，可能是接口受到限制，请稍后再试"
                    );
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}
</script>
