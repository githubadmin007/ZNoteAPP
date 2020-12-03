<template>
    <v-app>
        <!-- 左侧面板 -->
        <v-navigation-drawer v-model="dDrawerOpen" app dark>
            <!--用户信息-->
            <v-list-item>
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/81.jpg" />
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="title">{{
                        UserModule.IsLogin ? UserModule.UserName : "未登录"
                    }}</v-list-item-title>
                    <v-list-item-subtitle>
                        {{ UserModule.LoginName }}
                        <a v-if="UserModule.IsLogin" @click="UserModule.Logout">
                            退出
                        </a>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <!--系统列表-->
            <v-list dense nav>
                <v-list-item
                    v-for="node in TabModule.MenuTree"
                    :key="node.name"
                    @click="TabModule.OpenNewPage(node)"
                >
                    {{ node.cname }}
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!--头部-->
        <v-app-bar app dense flat dark>
            <v-app-bar-nav-icon
                @click="dDrawerOpen = !dDrawerOpen"
                tile
            ></v-app-bar-nav-icon>
            <v-toolbar-title>{{
                TabModule.CurrentPage == null ? "" : TabModule.CurrentPage.cname
            }}</v-toolbar-title>
        </v-app-bar>
        <!--主体-->
        <v-main app>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TabModule, UserModule, Page } from "@/store/modules";

@Component
export default class APP extends Vue {
    dDrawerOpen = true;
    TabModule = TabModule;
    UserModule = UserModule;

    mounted() {
        this.$store.commit("SetRouter", this.$router);

        UserModule.Init();
    }
}
</script>