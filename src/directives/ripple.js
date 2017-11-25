import Vue from 'vue';
import Ripple from './core.js'
// 参考 https://github.com/davinder17s/material-ripple-effect/blob/master/ripple.js
// ripple.js是用的fixed定位, 有一个小问题, 就是出现水波的时候拖动页面, 水波纹也会移动.
// 所以稍微改了下吗, 定位方式改为absolute.
// 支持background参数, 可以修改水波纹颜色.
// 支持zIndex参数, 可以修改水波纹z-index.
const duration = 1000;
let position = '';

const init = (el, binding) => {
    position = el.style.position;
    el.style.position = 'relative'
    // 默认值
    let background;
    let zIndex = 100;
    if (undefined !== binding.value) {
        // 是否禁用
        if (binding.value.disabled) return;
        if (undefined !== binding.value.background) {
            background = binding.value.background;
        }
        if (undefined !== binding.value.zIndex) {
            zIndex = binding.value.zIndex;
        }
    }
    let rippleNode;
    let rippleContainerNode;

    /**
     * 触发准备工作
     * @param {Event} event 
     */
    const touchstartHandler = event => {
        rippleContainerNode = el.querySelector('.ripple-container');
        if (rippleContainerNode) {
            rippleContainerNode.remove();
        }
        const { top, left, width, height } = el.getBoundingClientRect();
        // 在目标元素相同位置制作一个一样尺寸的div
        rippleContainerNode = document.createElement('div');
        rippleContainerNode.className = 'ripple-container';
        // 插入到目标元素
        el.appendChild(rippleContainerNode);
        const radius = Math.sqrt(width * width + height * height);
        const diameter = 2 * radius;
        const pageY = event.touches[0].pageY;
        const pageX = event.touches[0].pageX;
        // 水波纹元素
        rippleNode = document.createElement('div');
        rippleNode.style.position = 'relative';
        rippleNode.style.width = diameter + 'px';
        rippleNode.style.height = diameter + 'px';
        rippleNode.style.borderRadius = diameter + 'px';
        rippleNode.style.left = pageX - left - radius + 'px';
        rippleNode.style.top = pageY - top - radius + 'px';
        rippleNode.style.background = background;
        rippleNode.style.transitionDuration = duration + 'ms';
        rippleNode.className = 'ripple--start';
        rippleContainerNode.appendChild(rippleNode);
    };

    /**
     * 触发css动画
     * @param {Event} event 
     */
    const touchendHandler = event => {
        rippleNode.className = 'ripple--end';
    }

    el.addEventListener('touchstart', touchstartHandler);
    // 切换class, 驱动css动画
    el.addEventListener('touchend', touchendHandler);
};

Vue.directive('ripple', {
    bind() {
        // bind中还没有插入元素, 所以没法获取尺寸
    },

    inserted(el, binding) {
        new Ripple(el);
        // init(el, binding);
    },

    update(el, binding) {
  
    },

    unbind(el) { }
});
