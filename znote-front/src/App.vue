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
            <!-- <v-list dense nav>
                <v-list-item
                    v-for="node in MenuTree"
                    :key="node.name"
                    @click="menuNodeClick(node)"
                >
                    {{ node.cname }}
                </v-list-item>
            </v-list> -->
        </v-navigation-drawer>
        <!--头部-->
        <v-app-bar app dense flat dark>
            <v-app-bar-nav-icon
                @click="dDrawerOpen = !dDrawerOpen"
                tile
            ></v-app-bar-nav-icon>
            <!-- <v-toolbar-title>{{
                CurrentPage == null ? "" : CurrentPage.cname
            }}</v-toolbar-title> -->
            <!-- <v-spacer></v-spacer>
            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon tile v-on="on"
                        ><v-icon>mdi-dots-vertical</v-icon></v-btn
                    >
                </template>
                <v-list>
                    <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                        <v-list-item-title>Option {{ n }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu> -->
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
import Vue from "vue";
import Component from "vue-class-component";
import { mapState, mapGetters, mapMutations } from "vuex";
import { UserModule } from "@/store/modules";

@Component
export default class APP extends Vue {
    dDrawerOpen = true;
    UserModule = UserModule;

    mounted() {
        this.$store.commit("SetRouter", this.$router);

        UserModule.Init();
    }
}
</script>