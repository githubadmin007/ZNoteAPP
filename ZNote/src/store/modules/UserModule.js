import VueCookies from 'vue-cookies'
import axios from '../../plugins/axios.js'

const UserModule = {
  namespaced: true,
  state: {
    AutoLogin: false,
    UserId: '',
    UserName: '',
    LoginName: '',
    Password_md5: '',
    Token: ''
  },
  getters: {
    // 是否有Token
    HasToken (state) {
      return state.Token !== '';
    },
    // 是否已登陆-------todo可能要删掉
    IsLogin (state) {
      return state.UserId !== '';
    }
  },
  mutations: {
    // 设置是否自动登录
    SetAutoLogin (state, autologin) {
      state.AutoLogin = autologin;
      VueCookies.set('AutoLogin', autologin);
    },
    // 设置用户信息
    SetUserInfo (state, userinfo) {
      state.UserId = userinfo === null ? '' : userinfo.userbh;
      state.UserName = userinfo === null ? '' : userinfo.user_name;
      state.LoginName = userinfo === null ? '' : userinfo.login_name;
      state.Password_md5 = userinfo === null ? '' : userinfo.password;
      state.Token = userinfo === null ? '' : userinfo.token;
      VueCookies.set('UserId', state.UserId);
      VueCookies.set('UserName', state.UserName);
      VueCookies.set('LoginName', state.LoginName);
      VueCookies.set('Password_md5', state.Password_md5);
      VueCookies.set('Token', state.Token);
    }
  },
  actions: {
    // 初始化
    Init ({ getters, dispatch, rootState }) {
      if (getters.HasToken) {
        // rootState.$router.push('/home');
        dispatch('LoadUserInfo');
      } else {
        let autologin = VueCookies.get('AutoLogin');
        let loginname = VueCookies.get('LoginName');
        let pw_md5 = VueCookies.get('Password_md5');
        if (autologin && loginname && pw_md5) {
          dispatch('Login', {loginname, pw_md5});
        } else {
          rootState.$router.push('/login');
        }
      }
    },
    // 登陆
    Login ({ dispatch, commit, getters, rootGetters }, {loginname, pw_md5}) {
      let formData = new FormData();
      formData.append('loginname', loginname);
      formData.append('password', pw_md5);
      axios.post(rootGetters['API/LoginAPI'], formData).then(response => {
        commit('SetUserInfo', response.data);
        dispatch('Init');
      }).catch(() => {});
    },
    // 加载用户信息
    LoadUserInfo ({commit, dispatch, rootGetters}) {
      axios.get(rootGetters['API/SystemListAPI']).then(response => {
        if (response.code === 200) {
          let tree = response.data;
          commit('TabModule/SetMenuTree', tree, { root: true });
          commit('TabModule/SetHomePage', tree[0], { root: true });
          commit('TabModule/OpenNewPage', tree[0], { root: true });
        }
      });
    }
  }
}

export default UserModule
