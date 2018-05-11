/**
 * https://segmentfault.com/a/1190000010511484#articleHeader0
 * https://segmentfault.com/a/1190000007448808#articleHeader1
 * rotate 旋转
 * pinch 捏合
 * tap 单机
 * doubleTap 双击
 * press 按压
 * pan 拖拽
 * swipe 快速划过
 * touchStart
 * touchMove
 * touchEnd
 */
import {
    getVLength,
    getDotProduct,
    getRadian,
    getCross,
    getAngle
} from './vector.js'
export default class Touch2 {
    /**
     * @param {Element} el
     * @param {Object} param1
     */
    constructor(el, {
        isPreventDefault = true,
        isStopPropagation = false
    } = {}) {
        this.el = el;
        this.$fingerInput = {}; // 手势产生的数据
        this.action = '';
        this.isPreventDefault = isPreventDefault;
        this.isStopPropagation = isStopPropagation;

        // timeout
        this.tapTimeout = null;
        this.singleTapTimeout = null;
        this.doubleTapTimeout = null;
        this.pressTimeout = null;
        this.swipeTimeout = null;
        this.rotateTimeout = null;
        this.pinchTimeout = null;

        // this.disablePanTimeout = null;
        // this.disableSwipeTimeout = null;

        // disabled
        this.isPanDisabled = false;
        this.isSwipeDisabled = false;

        // 各个手势对应的handle集合
        this.handleMap = {};

        // 替换事件中的this(元素)为class
        this.touchstart = this.touchStartHandle.bind(this);
        this.touchmove = this.touchMoveHandle.bind(this);
        this.touchend = this.touchEndHandle.bind(this);
        this.touchcancel = this.touchEndHandle.bind(this);

        // 绑定事件
        el.addEventListener('touchstart', this.touchstart);
        el.addEventListener('touchmove', this.touchmove);
        el.addEventListener('touchend', this.touchend);
        el.addEventListener('touchcancel', this.touchcancel);


        el.addEventListener('mousedown', this.touchstart);
        el.addEventListener('mouseup', this.touchend);
    }

    /**
     * start阶段, 主要记录初始位置信息
     * @param {Event} e 
     */
    touchStartHandle(e) {
        if (this.isPreventDefault) e.preventDefault();
        if (this.isStopPropagation) e.stopPropagation();

        const points = e.touches;
        const pointCount = points.length;

        // 手势数据
        this.$fingerInput.timestamp = Date.now();
        this.$fingerInput.points = points;
        this.$fingerInput.startPoints = points; // 存储起始点


        // 单/多点触碰
        if (1 === pointCount) {
            this.isPanDisabled = false;
            this.isSwipeDisabled = false;
            // 单点
            // 识别[press]
            this.pressTimeout = setTimeout(() => {
                this.emit('press', {
                    type: 'press',
                    nativeEvent: e
                }, e);
            }, 251);
        } else {
            // 多点

            this.$fingerInput.startV = {
                x: this.$fingerInput.startPoints[1].pageX - this.$fingerInput.startPoints[0].pageX,
                y: this.$fingerInput.startPoints[1].pageY - this.$fingerInput.startPoints[0].pageY
            }; // 起始向量
            this.$fingerInput.startVModule = getVLength(this.$fingerInput.startV); // 起始向量模


            this.isPanDisabled = true;
            this.isSwipeDisabled = true;
        }
    }

    /**
     * touchmove事件触发
     * @param {Event} e 
     */
    touchMoveHandle(e) {
        if (this.isPreventDefault) e.preventDefault();
        if (this.isStopPropagation) e.stopPropagation();
        const points = e.touches;
        const pointCount = points.length;
        const deltaX = Math.ceil(points[0].pageX - this.$fingerInput.startPoints[0].pageX);
        const deltaY = Math.ceil(points[0].pageY - this.$fingerInput.startPoints[0].pageY);
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // 单/多点触碰
        if (1 === pointCount) {
            // 单点
            // 识别[pan]
            if (!this.isPanDisabled && (10 < absDeltaX || 10 < absDeltaY)) {
                // 识别[panstart, panmove]
                if ('panstart' === this.action) this.action = 'panmove';
                if ('panmove' !== this.action) this.action = 'panstart';
                this.emit(this.action, {
                    type: this.action,
                    deltaX: Math.ceil(points[0].pageX - this.$fingerInput.points[0].pageX),
                    deltaY: Math.ceil(points[0].pageY - this.$fingerInput.points[0].pageY),
                    nativeEvent: e
                }, e);

                this.emit('pan', {
                    type: 'pan',
                    deltaX: Math.ceil(points[0].pageX - this.$fingerInput.points[0].pageX),
                    deltaY: Math.ceil(points[0].pageY - this.$fingerInput.points[0].pageY),
                    nativeEvent: e
                }, e);
            }

            // 存储当前点, 供下次移动做差值计算
            this.$fingerInput.points = points;

        } else {
            // 多点
            this.isPanDisabled = true;
            this.isSwipeDisabled = true;

            let v = {
                x: points[1].pageX - points[0].pageX,
                y: points[1].pageY - points[0].pageY
            }; // 当前向量
            let vModule = getVLength(v); // 当前向量摸

            // 识别[rotate]
            let angle = getAngle(v, this.$fingerInput.startV); // 
            this.emit('rotate', {
                type: 'rotate',
                angle,
                nativeEvent: e
            }, e);

            // 识别[pinch]
            this.emit('pinch', {
                type: 'pinch',
                scale: vModule / this.$fingerInput.startVModule,
                nativeEvent: e
            }, e);

            this.$fingerInput.startV = v;
            this.$fingerInput.startVModule = vModule;
        }

        // 取消[press]
        if (9 < absDeltaX || 9 < absDeltaY) {
            this.cancelPress();
        }
    }

    touchEndHandle(e) {
        if (this.isPreventDefault) e.preventDefault();
        if (this.isStopPropagation) e.stopPropagation();
        const points = e.changedTouches;
        const pointCount = points.length;

        const deltaX = points[0].pageX - this.$fingerInput.startPoints[0].pageX;
        const deltaY = points[0].pageY - this.$fingerInput.startPoints[0].pageY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
        const deltaTime = Date.now() - this.$fingerInput.timestamp;
        const velocityX = deltaX / deltaTime;
        const velocityY = deltaY / deltaTime;
        const absVelocityX = Math.abs(velocityX);
        const absVelocityY = Math.abs(velocityY);

        // 当有手指移开的时候, 接触swipe/pan禁用
        setTimeout(() => {
            this.isPanDisabled = false;
            this.isSwipeDisabled = false;
        }, 100);

        // 判断是否[panend]
        if (['panstart', 'panmove'].includes(this.action)) {

            this.action = 'panend'
            this.emit('panend', {
                type: 'panend',
                naiveEvent: e
            }, e)
        }
        // 判断是否[tap](单击)
        if (250 > Date.now() - this.$fingerInput.timestamp && 2 > absDeltaX && 2 > absDeltaY) {
            this.cancelPress();
            // 如果没有这个setTimeout, 那么当短促点击的时候, click事件就不触发了
            this.emit('tap', {
                type: 'tap'
            }, e);
        }


        // 判断是否[swipe]
        if (!this.isSwipeDisabled && 250 > Date.now() - this.$fingerInput.timestamp && (0.3 < absVelocityX || 0.3 < absVelocityY)) {
            this.emit('swipe', {
                type: 'swipe',
                velocityX,
                velocityY,
                deltaX: points[0].pageX - this.$fingerInput.startPoints[0].pageX,
                deltaY: points[0].pageY - this.$fingerInput.startPoints[0].pageY,
                nativeEvent: e
            }, e);
        }
    }

    touchCancelHandle(e) {
        this.cancelAll();
    }

    /**
     * "-"格式转成驼峰格式
     * @param {String} string 
     */
    camelize(string) {
        var camelizeRE = /-(\w)/g;
        return string.replace(camelizeRE, word => {
            return word.toLocaleUpperCase().slice(1)
        });
    }

    /**
     * 绑定事件
     * @param {String} 事件名 
     * @param {Function} handle 
     */
    on(eventName, handle) {
        this.handleMap[this.camelize(eventName)] = handle
        // this[`${this.camelize(eventName)}Handle`] = handle;
    }

    /**
     * 解除绑定事件
     * @param {String} 事件名 
     * @param {Function} handle 
     */
    off(eventName, handle) {
        this[`${eventName}Handle`] = () => {};
    }

    destory() {
        this.el.removeEventListener('touchstart', this.touchstart);
        this.el.removeEventListener('touchmove', this.touchmove);
        this.el.removeEventListener('touchend', this.touchend);
        this.el.removeEventListener('touchcancel', this.touchcancel);
        this.cancelAll();
    }

    cancelSingleTap() {
        clearTimeout(this.singleTapTimeout);
        this.singleTapTimeout = null;
    }

    cancelPress() {
        clearTimeout(this.pressTimeout);
        this.pressTimeout = null;
    }

    cancelDoubleTap() {
        clearTimeout(this.doubleTapTimeout);
        this.doubleTapTimeout = null;
    }

    cancelSwipe() {
        clearTimeout(this.swipeTimeout);
        this.swipeTimeout = null;
    }

    cancelPinch() {
        clearTimeout(this.pinchTimeout);
        this.pinchTimeout = null;
    }

    cancelAll() {
        this.cancelSingleTap();
        this.cancelDoubleTap();
        this.cancelSwipe();
        this.cancelPinch();
        this.cancelPress();
    }

    emit(eventName, payload, e) {
        if (undefined !== this.handleMap[eventName]) {
            this.handleMap[eventName](payload, e);
        }
    }
}