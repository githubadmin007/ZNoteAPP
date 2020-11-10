<template>
  <v-app>
    <!--左侧面板-->
    <v-navigation-drawer v-model="drawerOpen" app dark>
      <!--用户信息-->
      <v-list-item>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">{{UserName?UserName:'未登录'}}</v-list-item-title>
          <v-list-item-subtitle>{{LoginName}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <!--系统列表-->
      <v-list dense nav>
        <v-list-item v-for="node in MenuTree" :key="node.name" @click="menuNodeClick(node)">
          {{node.cname}}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--头部-->
    <v-app-bar app dense flat dark>
      <v-app-bar-nav-icon @click="ToggleDrawer" tile></v-app-bar-nav-icon>
      <v-toolbar-title>{{ CurrentPage==null?"":CurrentPage.cname }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon tile v-on="on"><v-icon>mdi-dots-vertical</v-icon></v-btn>
        </template>
        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!--主体-->
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!--页脚-->
    <!-- <v-footer app>
      footer
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      drawerOpen: null// 抽屉是否打开
    }
  },
  computed: {
    ...mapState('UserModule', ['UserName', 'LoginName']),
    ...mapState('TabModule', ['MenuTree', 'OpenedList', 'CurrentPage'])
  },
  watch: {
    // 当前页面改变事件
    // '$store.state.TabModule.CurrentPage' (newPage, oldPage) {
    //   this.$router.push(newPage.path);
    // }
  },
  methods: {
    // 菜单点击事件
    menuNodeClick (node) {
      this.$store.commit('TabModule/OpenNewPage', node);
    },
    // 切换抽屉状态
    ToggleDrawer () {
      this.drawerOpen = !this.drawerOpen;
    }
  },
  mounted () {
    // 将router传给store
    this.$store.commit('SetRouter', this.$router);
    // 检查登陆
    this.$store.dispatch('UserModule/Init');
    // 加载用户信息
    // this.$store.dispatch('UserModule/LoadUserInfo');
  }
}
</script>
