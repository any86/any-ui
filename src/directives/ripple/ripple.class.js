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

import './ripple.class.scss';
import defaultConfig from './module/config';
import touchStart from './module/touchStart';
import touchMove from './module/touchMove';
import touchEnd from './module/touchEnd';
export default class Ripple {
    /**
     * @param {Element} el 
     * @param {Number} zIndex
     * @param {Number} duration
     * @param {String} background
     * @param {Boolean} isDisabled // 慎用, 禁止不是不初始化, 而是stopPropagation, 防止多层ripple嵌套的时候冒泡
     */
    constructor(el, config) {
        const options = {
            ...defaultConfig,
            ...config
        };
        if(options.isDisabled) return;

        // 替换函数的this
        this.touchStart = touchStart.bind(this, options);
        this.touchMove = touchMove.bind(this, options);
        this.touchEnd = touchEnd.bind(this, options);

        // touchstart准备水波纹动画css
        el.addEventListener('touchstart', this.touchStart);

        // 发生移动, 取消动画 
        el.addEventListener('touchmove', this.touchMove)

        // touchend时切换class触发动画
        el.addEventListener('touchend', this.touchEnd);
    }

    /**
     * 更新
     */
    update(config) {
        const options = {
            ...defaultConfig,
            ...config
        };
        if(options.isDisabled) return;
        this.touchStart = touchStart.bind(this, options);
        this.touchMove = touchMove.bind(this, options);
        this.touchEnd = touchEnd.bind(this, options);
    }

    /**
     * 销毁
     */
    destroy(el) {
        el.removeEventListener('touchstart', this.touchStart);
        el.removeEventListener('touchmove', this.touchMove);
        el.removeEventListener('touchend', this.touchEnd);
    }
}