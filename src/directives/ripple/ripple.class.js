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
    /**
     * @param {Element} el 
     * @param {Number} zIndex
     * @param {Float} opacity
     * @param {Number} duration
     * @param {String} background
     * @param {Boolean} disabled // 慎用, 禁止不是不初始化, 而是stopPropagation, 防止多层ripple嵌套的时候冒泡
     */
    constructor(el, { zIndex = 1986, opacity = 0.2, duration = 1000, background = 'rgb(0,0,0)', disabled = false } = {}) {
        this.$el = el;
        this._timer = null;
        this.zIndex = zIndex;
        this.opacity = opacity;
        this.duration = duration;
        this.background = background;
        this.disabled = disabled;
        // 替换this的handler
        this._touchstartHandler_bind = this._touchstartHandler.bind(this);
        this._touchendHandler_bind = this._touchendHandler.bind(this);
        this.$rippleNode = null;
        this.$rippleContainerNode = null;
        // touchstart准备水波纹动画css
        el.addEventListener('touchstart', this._touchstartHandler_bind);

        // touchend时切换class触发动画
        el.addEventListener('touchend', this._touchendHandler_bind);
    }

    /**
     * touchstart
     * @param {Event} event 
     */
    _touchstartHandler(event) {
        event.stopPropagation();
        if (this.disabled) return;
        // 如果非下列定位, 那么设置目标元素的position为relative
        if (!/absolute|relative|fixed|sticky/.test(this.orgPosition)) {
            this.$el.style.position = 'relative';
        }

        // 创建元素
        this.$rippleNode = this._createRippleNode(event);
        this.$rippleContainerNode = this._createRippleContainerNode(event);
        this.$rippleContainerNode.appendChild(this.$rippleNode);
        // 插入到目标元素
        this.$el.appendChild(this.$rippleContainerNode);
    }

    /**
     * touchend
     * 水波纹开始扩散
     * @param {Event} event 
     */
    _touchendHandler(event) {
        event.stopPropagation();
        if (this.disabled) return;
        this.$rippleNode.className = 'ripple--start';
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            if (this.$el.contains(this.$rippleContainerNode)) {
                this.$el.removeChild(this.$rippleContainerNode);
            }
        }, this.duration + 100);
    }

    /**
     * 建立水波纹容器
     */
    _createRippleContainerNode(event) {
        let $rippleContainerNode;
        $rippleContainerNode = this.$el.querySelector('.ripple-container');
        if ($rippleContainerNode) {
            if (this.$el.contains(this.$rippleContainerNode)) {
                this.$el.removeChild(this.$rippleContainerNode);
            }
        }
        // 在目标元素相同位置制作一个一样尺寸的div
        $rippleContainerNode = document.createElement('div');
        $rippleContainerNode.className = 'ripple-container';
        // 目标元素样式
        this.orgStyle = getComputedStyle(this.$el);
        this.orgPosition = this.orgStyle.position;
        $rippleContainerNode.style.borderRadius = this.orgStyle.borderRadius;
        return $rippleContainerNode;
    }

    /**
     * 建立水波纹
     */
    _createRippleNode(event) {
        // 获取目标元素的信息
        const { top, left, width, height } = this.$el.getBoundingClientRect();
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
        $rippleNode.style.background = this.background;
        $rippleNode.style.transitionDuration = this.duration + 'ms';
        $rippleNode.className = 'ripple--ready';
        return $rippleNode;
    }

    /**
     * 更新
     */
    update(el) {
        const $el = el || this.$el;
        $el.removeEventListener('touchstart', this._touchstartHandler_bind);
        $el.removeEventListener('touchend', this._touchendHandler_bind);

        setTimeout(() => {
            el.addEventListener('touchstart', this._touchstartHandler_bind);
            el.addEventListener('touchend', this._touchendHandler_bind);
        }, 0);
    }

    /**
     * 由于vue指令的钩子之间没法共享函数, 所以只好通过参数来实现.
     * @param {Element} el 
     */
    destroy(el) {
        const $el = el || this.$el;
        $el.removeEventListener('touchstart', this._touchstartHandler_bind);
        $el.removeEventListener('touchend', this._touchendHandler_bind);
    }
}