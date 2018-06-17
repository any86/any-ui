/**
 * 参考
 * https://github.com/davinder17s/material-ripple-effect/blob/master/ripple.js
 * https://github.com/samthor/rippleJS
 * 看了https://github.com/samthor/rippleJS对touchend部分的处理, 
 * touchend定时删除元素, 
 * 不知道是不是为了防止在目标元素在使用插件的时候变形, 
 * 在指定时间复位, 降低影响?
 * 
 * !!! 要求目标元素的position非static
 */

import defaultConfig from './module/config';
import touchStart from './module/touchStart';
import touchMove from './module/touchMove';
import touchEnd from './module/touchEnd';

const copyOptsToEl = (el, options) => {
    for (let k in options) {
        let value = options[k];
        let letterArray = k.split('');
        letterArray[0] = letterArray[0].toUpperCase();
        let key = letterArray.join('');
        el.dataset[`ripple${key}`] = value;
    }
}


export default class Ripple {
    /**
     * @param {Element} el 
     * @param {Number} zIndex
     * @param {Number} duration
     * @param {String} background
     * @param {Boolean} isDisabled // 慎用, 禁止不是不初始化, 而是stopPropagation, 防止多层ripple嵌套的时候冒泡
     */
    constructor(el, config) {
        const options = { ...defaultConfig,
            ...config
        };

        if (options.isDisabled) return;
        this.$el = el;

        // 参数存储到dataset, 方便vue指令的各个钩子中共享数据
        copyOptsToEl(el, options);

        // touchstart准备水波纹动画css
        this.$el.addEventListener('touchstart', touchStart);

        // 发生移动, 取消动画 
        this.$el.addEventListener('touchmove', touchMove)

        // touchend时切换class触发动画
        this.$el.addEventListener('touchend', touchEnd);
    }

    /**
     * 更新
     */
    update(config) {
        const options = {
            ...defaultConfig,
            ...config
        };
        if (options.isDisabled) return;
        copyOptsToEl(el, options);
    }

    /**
     * 销毁
     */
    destroy(el) {
        this.$el = el || this.$el;
        this.$el.removeEventListener('touchstart', touchStart);
        this.$el.removeEventListener('touchmove', touchMove);
        this.$el.removeEventListener('touchend', touchEnd);
    }
}