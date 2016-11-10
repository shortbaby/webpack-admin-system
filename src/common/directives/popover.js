import Vue from 'vue';

Vue.directive('popover', {
  bind(el, binding, vnode) {
    vnode.context.$refs[binding.arg].$refs.reference = el;
  }
});