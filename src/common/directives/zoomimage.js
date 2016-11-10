/**
 * v-zoomimage
 * @desc 点击区域里面图片放大预览
 * @example
 * ```vue
 * <div v-zoomimage>
 * ```
 */

import Vue from 'vue';
import $ from 'jquery';


Vue.directive('zoomimage', {
    bind(el, binding, vnode) {
    	$(el).find('.slider-log-img').zoomimage();
    },

    update(el, binding) {
        
    },

    unbind(el) {
    	$('div.zoomimage').remove(); 
    }
});
