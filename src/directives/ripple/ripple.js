import { dirname } from "path";
import { clearTimeout } from "timers";
/**
 * 参考
 * https://github.com/davinder17s/material-ripple-effect/blob/master/ripple.js
 * https://github.com/samthor/rippleJS
 * 看了https://github.com/samthor/rippleJS对touchend部分的处理, 
 * touchend定时删除元素, 
 * 不知道是不是为了防止在目标元素在使用插件的时候变形, 
 * 在指定时间复位, 降低影响?
 * 
 * 如果, 未来需要实现实例的方法的解构
 * 参考http://es6.ruanyifeng.com/#docs/class#this-的指向
 * 
 * 如果, 定义静态属性
 * http://es6.ruanyifeng.com/#docs/class#Class-的静态属性和实例属性
 */

// 私有属性
const EVENTS = ['touchstart', 'touchend'];
export default class Ripple {
    constructor(el, options = { zIndex: 1986, opacity: 0.2, duration: 1000, background: 'rgb(0,0,0)' }) {
        this.$el = el;
        this.timer = null;
        this.duration = options.duration;
        this._touchstartHandler_bind = this._touchstartHandler.bind(this, options);
        this._touchendHandler_bind = this._touchendHandler.bind(this, options);
        this.$rippleNode = null;
        this.$rippleContainerNode = null;
        // touchstart准备水波纹动画css
        el.addEventListener('touchstart', this._touchstartHandler_bind, false);

        // touchend时切换class触发动画
        el.addEventListener('touchend', this._touchendHandler_bind, false);
    }

    /**
     * touchstart
     * @param {Event} event 
     */
    _touchstartHandler(options, event) {
        
        event.stopPropagation();
        const el = this.$el;
        // 如果非下列定位, 那么设置目标元素的position为relative
        if (!/absolute|relative|fixed|sticky/.test(this.orgPosition)) {
            el.style.position = 'relative';
        }

        // 目标元素样式
        this._orgStyle = getComputedStyle(el).position;
        this.orgPosition = this._orgStyle.position;

        // 创建元素
        this.$rippleNode = this._createRippleNode(event, options);
        this.$rippleContainerNode = this._createRippleContainerNode(event);
        this.$rippleContainerNode.appendChild(this.$rippleNode);

        // 插入到目标元素
        el.appendChild(this.$rippleContainerNode);
    }

    /**
     * touchend
     * @param {Event} event 
     */
    _touchendHandler(options, event) {
        event.stopPropagation();
        this.$rippleNode.className = 'ripple--start';
    }

    /**
     * 建立水波纹容器
     */
    _createRippleContainerNode(event) {
        let $rippleContainerNode;
        $rippleContainerNode = this.$el.querySelector('.ripple-container');
        if ($rippleContainerNode) {
            this.$el.removeChild($rippleContainerNode);
        }
        // 在目标元素相同位置制作一个一样尺寸的div
        $rippleContainerNode = document.createElement('div');
        $rippleContainerNode.className = 'ripple-container';
        return $rippleContainerNode;
    }

    /**
     * 建立水波纹
     */
    _createRippleNode(event, options) {
        
        const { background, duration } = options;
        // 获取目标元素的信息
        const el = this.$el;
        const { top, left, width, height } = el.getBoundingClientRect();
        const radius = Math.sqrt(width * width + height * height);
        const diameter = 2 * radius;
        const pageY = event.touches[0].pageY;
        const pageX = event.touches[0].pageX;
        // 创建水波纹元素
        let $rippleNode;
        $rippleNode = document.createElement('div');
        $rippleNode.style.position = 'relative';
        $rippleNode.style.width = diameter + 'px';
        $rippleNode.style.height = diameter + 'px';
        $rippleNode.style.borderRadius = diameter + 'px';
        $rippleNode.style.left = pageX - left - radius + 'px';
        $rippleNode.style.top = pageY - top - radius + 'px';
        $rippleNode.style.background = background;
        $rippleNode.style.transitionDuration = duration + 'ms';
        $rippleNode.className = 'ripple--ready';
        return $rippleNode;
    }
    /**
     * 由于vue指令的钩子之间没法共享函数, 所以只好通过参数来实现.
     * @param {Element} el 
     */
    destroy(el) {
        const $el = el || this.$el;
        $el.removeEventListener('touchstart', this._touchstartHandler_bind);
        $el.removeEventListener('touchend', this._touchendHandler_bind);
        // fixed for vue directive
        const $rippleContainer = $el.querySelector('.ripple-container');
        if($rippleContainer) {
            $el.removeChild($rippleContainer);
        }
    }
}