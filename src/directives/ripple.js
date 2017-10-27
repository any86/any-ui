import Vue from 'vue';
// 参考 https://github.com/davinder17s/material-ripple-effect/blob/master/ripple.js
// ripple.js是用的fixed定位, 有一个小问题, 就是出现水波的时候拖动页面, 水波纹也会移动.
// 所以稍微改了下吗, 定位方式改为absolute.
var position = '';
const init = (el, binding) => {
    position = el.style.position;
    el.style.position = 'relative'
    let background = 'rgba(0,0,0, .1)';
    if (undefined !== binding.value) {
        // 是否禁用
        if (binding.value.disabled) return;
        if (undefined !== binding.value.background) {
            background = binding.value.background;
        }
    }
    el.addEventListener('click', event => {
        var rippleContainerNode = el.querySelector('.ripple-container');
        if (rippleContainerNode) {
            rippleContainerNode.remove();
        }
        const { top, left, width, height } = el.getBoundingClientRect();

        rippleContainerNode = document.createElement('div');
        // 在目标元素相同位置制作一个一样尺寸的div
        rippleContainerNode.style.position = 'absolute';
        rippleContainerNode.style.zIndex = 99;
        rippleContainerNode.style.top = 0;
        rippleContainerNode.style.right = 0;
        rippleContainerNode.style.bottom = 0;
        rippleContainerNode.style.left = 0;
        rippleContainerNode.className = 'ripple-container';
        rippleContainerNode.style.overflow = 'hidden';
        el.appendChild(rippleContainerNode);
        const radius = Math.max(width, height);
        const diameter = 2 * radius;
        // 水波纹元素
        var rippleNode = document.createElement('div');
        rippleNode.style.position = 'relative';
        rippleNode.style.width = diameter + 'px';
        rippleNode.style.height = diameter + 'px';
        rippleNode.style.borderRadius = diameter + 'px';
        rippleNode.style.left = event.pageX - left - radius + 'px';
        rippleNode.style.top = event.pageY - top - radius + 'px';
        rippleNode.style.backgroundColor = background;
        rippleNode.className = 'ripple';
        rippleContainerNode.appendChild(rippleNode);
        ['animationend', 'webkitAnimationend'].forEach(eventName => {
            rippleNode.addEventListener(eventName, () => {
                el.style.position = position;
                rippleContainerNode.remove();
            });
        });
    });
};

Vue.directive('ripple', {
    bind() {
        // bind中还没有插入元素, 所以没法获取尺寸
        
    },

    inserted(el, binding) {
        init(el, binding);
    },

    update(el, binding) {
        init(el, binding);
    }
});
