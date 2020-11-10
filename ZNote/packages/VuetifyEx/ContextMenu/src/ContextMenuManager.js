import Vue from 'vue'
import VContextMenu from './ContextMenu.vue';

const menuCache = []; // 菜单对象缓存

// 获取缓存的菜单
function _GetContextMenu (options) {
  if (options.menuId) {
    return menuCache[options.menuId];
  }
  return null;
}

// 创建菜单
function _CreateContextMenu (options) {
  let NestListCfg = {
    items: options.items, // 全部数据
    width: options.width || '200px', // 宽度
    iconSize: options.iconSize || 24, // 图标大小
    textField: options.textField || 'text', // 文字字段名
    iconField: options.iconField || 'icon', // 图标字段名
    sublistField: options.sublistField || 'sublist', // 子列表字段名
    clickField: options.clickField || 'click', // 点击回调函数字段名
    click: options.click  // 点击回调函数
  }
  let ContextMenuConstructor = Vue.extend(VContextMenu);
  let ContextMenu = new ContextMenuConstructor({
    data: {
        NestListCfg // NestList配置
    }
  });
  ContextMenu.$mount();
  let apps = document.querySelectorAll(".v-application");
  if (apps && apps.length>0) {
    apps[0].appendChild(ContextMenu.$el);
  }
  return ContextMenu;
}

function GetContextMenu (options, vnode) {
  let ContextMenu = _GetContextMenu(options);
  if (!ContextMenu) {
    let RefName = options.RefName;
    if (RefName) {
      ContextMenu = vnode.context.$refs[RefName];
    }else {
      ContextMenu = _CreateContextMenu(options, vnode);
    }
    if (options.menuId) {
      menuCache[options.menuId] = ContextMenu;
    }
  }
  return ContextMenu;
}

// 隐藏所有菜单
function HideAll () {
 for (let key in menuCache) {
    if (menuCache[key].Hide) {
      menuCache[key].Hide();
    }
 }
}

export default {
  GetContextMenu,
  HideAll
}
