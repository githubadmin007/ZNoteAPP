import VContextMenu from './VContextMenu.vue'

VContextMenu.install = function (Vue) {
  Vue.component(VContextMenu.name, VContextMenu);
  Vue.directive('ContextMenu', {
    bind (el, binding, vnode) {
      el.oncontextmenu = function (evt) {
        binding.value.ContextMenu.SetData(binding.value.Data); // 将数据传给ContextMenu控件
        binding.value.ContextMenu.ShowAt(evt.clientX, evt.clientY);
        return false;
      };
    }
  });
}

export default VContextMenu;
