// 同时需要引入ripple.scss配合
import Vue from 'vue';
// 参考 https://github.com/davinder17s/material-ripple-effect/blob/master/ripple.js
// ripple.js是用的fixed定位, 有一个小问题, 就是出现水波的时候拖动页面, 水波纹也会移动.
// 所以稍微改了下逻辑,
// 进行position的判断
// 如果position为定位方式改为absolute.
// 支持background参数, 可以修改水波纹颜色.
// 支持zIndex参数, 可以修改水波纹z-index.

const init = (el, binding) => {
    let background = 'rgba(0,0,0, .1)';
    let zIndex = 1900;
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


    let orgPosition;
    let rippleContainerNode;// 水波纹父容器节点

    const handler = event => {
        // 记录原始position
        const style = getComputedStyle(el, null);
        orgPosition = style.position;
        // 对普通定位元素改为relative定位
        if ('static' == orgPosition) {
            el.style.position = 'relative';
        }
        // 水波纹父容器节点
        // 如果存在, 那么删除
        // 只允许同时出现一个水波纹
        rippleContainerNode = el.querySelector('.ripple-container');
        if (rippleContainerNode) {
            rippleContainerNode.remove();
        }
        // 父容器尺寸&定位 = 目标元素尺寸&定位
        rippleContainerNode = document.createElement('div');
        const { top, left, width, height } = el.getBoundingClientRect();

        rippleContainerNode.style.position = 'absolute';
        rippleContainerNode.style.zIndex = zIndex;
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
        let rippleNode = document.createElement('div');
        rippleNode.style.position = 'relative';
        rippleNode.style.width = diameter + 'px';
        rippleNode.style.height = diameter + 'px';
        rippleNode.style.borderRadius = diameter + 'px';
        rippleNode.style.left = event.pageX - left - radius + 'px';
        rippleNode.style.top = event.pageY - top - radius + 'px';
        rippleNode.style.backgroundColor = background;
        rippleNode.className = 'ripple';
        rippleContainerNode.appendChild(rippleNode);
        /**
         * 发现个问题
         * 设置postion为relative后, 如果快速点击
         * 那么animationend/webkitAnimationend不会执行
         */
        ['animationend', 'webkitAnimationend'].forEach(eventName => {
            rippleNode.addEventListener(eventName, () => {
                el.style.position = orgPosition;
                rippleContainerNode.remove();
                rippleNode.remove();
            });
        });
    };

    el.addEventListener('click', handler);
};
const plugin = {
    install(Vue) {
        Vue.directive('ripple', {
            bind() {
                // bind中还没有插入元素, 所以没法获取尺寸
            },
            inserted(el, binding) {
                
                init(el, binding);
            },
            update(el, binding) {
                // init(el, binding);
            }
        });
    }
};
export default plugin;
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}
