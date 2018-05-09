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

const $_session = {};
export default class Touch2 {
    /**
     * @param {Element} el
     * @param {Object} param1
     */
    constructor(el, {
        triggerTapMaxTime = 250, // triggerTapMaxTime时间内, 只发生一次touchstart算作tap
        triggerTapMaxSize = 2, // 触发tap事件的最大尺寸范围
        triggerPressTime = 500, // 触发press所需时间
    } = {}) {
        this.el = el;
        this.triggerTapMaxTime = triggerTapMaxTime;
        this.triggerTapMaxSize = triggerTapMaxSize;
        this.triggerPressTime = triggerPressTime;
        this.startTime = null;
        this.lastTime = null;
        this.startScale = 1;
        this.activeScale = 1;
        this.startAngle = 0;
        this.activeAngle = 0;
        this.isPreventSwipe = false;
        this.preventSwipeTimeout = null;
        // this.panThreshold = 10;
        // 起始向量(2指间)
        this.startV = {
            x: null,
            y: null
        };

        // 当前向量(2指间)
        this.activeV = {
            x: null,
            y: null
        };

        // 接触点坐标, 相对屏幕左上角, touchstart的时候更新为activePoint的值
        this.startPoint = [{
            x: null,
            y: null
        }, {
            x: null,
            y: null
        }];

        // 当前接触点坐标, 相对屏幕左上角
        this.activePoint = [{
            x: null,
            y: null
        }, {
            x: null,
            y: null
        }];

        // 判断doubleTap所需临时变量
        this.preTapPonit = {
            x: null,
            y: null
        };

        this.isDoubleTap = false;
        this.tapTimeout = null;
        this.singleTapTimeout = null;
        this.doubleTapTimeout = null;
        this.pressTimeout = null;
        this.swipeTimeout = null;
        this.rotateTimeout = null;
        this.pinchTimeout = null;
        this.type = '';

        this._rotateHandle = () => {};
        this._pinchHandle = () => {};
        this._singleTapHandle = () => {};
        this._doubleTapHandle = () => {};
        this._pressHandle = () => {};
        this._panHandle = () => {};
        this._swipeHandle = () => {};
        this.touchStart = () => {};
        this.touchMove = () => {};
        this.touchEnd = () => {};

        // 替换事件中的this(元素)为class
        this._touchstart = this.touchStartHandle.bind(this);
        this._touchmove = this.touchMoveHandle.bind(this);
        this._touchend = this.touchEndHandle.bind(this);
        this._touchcancel = this.touchEndHandle.bind(this);

        // 绑定事件
        el.addEventListener('touchstart', this._touchstart);
        el.addEventListener('touchmove', this._touchmove);
        el.addEventListener('touchend', this._touchend);
        el.addEventListener('touchcancel', this._touchcancel);
    }

    /**
     * start阶段, 主要记录初始位置信息
     * @param {Event} e 
     */
    touchStartHandle(e) {
        if (!e.touches) return;
        const points = e.touches;
        const pointCount = points.length;

        // modify
        $_session.timestamp = Date.now();
        $_session.points = points;
        
        // 存储起始点
        $_session.startPoints = points;

        this.pressTimeout = setTimeout(() => {
            this._pressHandle({
                type: 'press'
            }, e);
        }, 500);

    }

    /**
     * touchmove事件触发
     * @param {Event} e 
     */
    touchMoveHandle(e) {
        const points = e.touches;
        const pointCount = points.length;

        const deltaX = Math.ceil(points[0].pageX - $_session.startPoints[0].pageX);
        const deltaY = Math.ceil(points[0].pageY - $_session.startPoints[0].pageY);
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
        
        
        // 识别pan
        if (10 < absDeltaX || 10 < absDeltaY) {
            this._panHandle({
                type: 'pan',
                deltaX: Math.ceil(points[0].pageX - $_session.points[0].pageX),
                deltaY: Math.ceil(points[0].pageY - $_session.points[0].pageY)
            }, e);
        }
        
        // 存储当前点, 供下次移动做差值计算
        $_session.points = points;

        // 取消press
        if (9 < absDeltaX || 9 < absDeltaY) {
            this._cancelPress();
        }
    }

    touchEndHandle(e) {
        const points = e.changedTouches;
        const pointCount = points.length;

        const deltaX = points[0].pageX - $_session.startPoints[0].pageX;
        const deltaY = points[0].pageY - $_session.startPoints[0].pageY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // 判断是否单击
        if (250 > Date.now() - $_session.timestamp && 2 > absDeltaX && 2 > absDeltaY) {
            this._cancelPress();

            // 如果没有这个setTimeout, 那么当短促点击的时候, click事件就不触发了
            this.tapTimeout = setTimeout(() => {
                this._singleTapHandle({
                    type: 'tap'
                }, e);
            }, 0);
        }


        // // 判断是否swipe
        // let deltaTime = Date.now() - $_session.timestamp;
        // let velocityX = absDeltaX / deltaTime;
        // let velocityY = absDeltaY / deltaTime;
        // if (0.3 < velocityX || 0.3 < velocityY) {
        //     this._swipeHandle({
        //         type: 'swipe',
        //         deltaX: points[0].pageX - $_session.lastX,
        //         deltaY: points[0].pageY - $_session.lastY
        //     }, e);
        // }
    }

    touchCancelHandle(e) {
        this._cancelAll();
    }

    /**
     * "-"格式转成驼峰格式
     * @param {String} string 
     */
    _camelize(string) {
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
        if ('tap' === eventName) {
            this._singleTapHandle = handle;
        } else {
            this[`_${this._camelize(eventName)}Handle`] = handle;
        }
    }

    /**
     * 解除绑定事件
     * @param {String} 事件名 
     * @param {Function} handle 
     */
    off(eventName, handle) {
        this[`_${eventName}Handle`] = () => {};
    }

    destory() {
        this.el.removeEventListener('touchstart', this._touchstart);
        this.el.removeEventListener('touchmove', this._touchmove);
        this.el.removeEventListener('touchend', this._touchend);
        this.el.removeEventListener('touchcancel', this._touchcancel);
        this._cancelAll();
    }

    _cancelSingleTap() {
        clearTimeout(this.singleTapTimeout);
        this.singleTapTimeout = null;
    }

    _cancelPress() {
        clearTimeout(this.pressTimeout);
        this.pressTimeout = null;
    }

    _cancelDoubleTap() {
        clearTimeout(this.doubleTapTimeout);
        this.doubleTapTimeout = null;
    }

    _cancelSwipe() {
        clearTimeout(this.swipeTimeout);
        this.swipeTimeout = null;
    }

    _cancelPinch() {
        clearTimeout(this.pinchTimeout);
        this.pinchTimeout = null;
    }

    _cancelAll() {
        this._cancelSingleTap();
        this._cancelDoubleTap();
        this._cancelSwipe();
        this._cancelPinch();
        this._cancelPress();
    }

    /**
     * 获取向量长度
     * @param {Object} 向量
     */
    _getVLength(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    /**
     * 点积
     * @param {Object} v1
     * @param {Object} v2
     */
    _getDotProduct(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    /**
     * 向量夹角(弧度)
     * @param {Object} v1
     * @param {Object} v2
     */
    _getRadian(v1, v2) {
        var mr = this._getVLength(v1) * this._getVLength(v2);
        if (mr === 0) return 0;
        var r = this._getDotProduct(v1, v2) / mr;
        if (r > 1) r = 1;
        return Math.acos(r);
    }

    /**
     * 求旋转方向
     * 顺时针/逆时针
     */
    _getCross(v1, v2) {
        return v1.x * v2.y - v2.x * v1.y;
    }

    /**
     * 向量夹角(角度)
     * @param {Object} v1
     * @param {Object} v2
     */
    _getAngle(v1, v2) {
        var angle = this._getRadian(v1, v2);
        if (this._getCross(v1, v2) > 0) {
            angle *= -1;
        }
        return angle * 180 / Math.PI;
    }
}