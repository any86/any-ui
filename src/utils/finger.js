/**
 * https://segmentfault.com/a/1190000010511484#articleHeader0
 * https://segmentfault.com/a/1190000007448808#articleHeader1
 */
export default class Finger {
    /**
     *
     * @param {Element} el
     * @param {Object} param1
     */
    constructor(el, {
        isStopPropagation = false,
        isPreventDefault = false,
        tapMaxTime = 250,
    } = {}) {
        this.tapMaxTime = tapMaxTime;
        this.isStopPropagation = isStopPropagation;
        this.isPreventDefault = isPreventDefault;
        this.minVelocity = 0.3;
        this.startTime = null;
        this.lastTime = null;
        this.startScale = 1;
        this.activeScale = 1;
        this.startAngel = 0;
        this.activeAngel = 0;
        this.isPreventSwipe = false;
        this.preventSwipeTimeout = null;
        this.panThreshold = 10;
        this.startV = {
            x: null,
            y: null
        }; // 起始向量
        this.activeV = {
            x: null,
            y: null
        }; // 当前向量
        this.startPoint = [{
                x: null,
                y: null
            },
            {
                x: null,
                y: null
            }
        ]; // 接触点坐标, 相对屏幕左上角, touchstart的时候更新为activePoint的值
        this.activePoint = [{
                x: null,
                y: null
            },
            {
                x: null,
                y: null
            }
        ]; // 接触点坐标, 相对屏幕左上角
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

    set({
        isStopPropagation = false,
        isPreventDefault = true
    } = {}) {
        this.isStopPropagation = isStopPropagation;
        this.isPreventDefault = isPreventDefault;
    }

    touchStartHandle(e) {
        if (!e.touches) return;
        this.isPreventDefault && e.preventDefault();
        this.isStopPropagation && e.stopPropagation();
        const points = e.touches;
        const pointCount = points.length;

        this.lastTime = this.startTime;
        this.startTime = Date.now();
        this.interval = this.startTime - (this.lastTime || this.startTime);
        // [!tap] 为tap系列做准备
        this.activePoint[0].x = points[0].pageX;
        this.activePoint[0].y = points[0].pageY;

        // [!doubleTap]
        if (null !== this.startPoint[0].x) {
            this.isDoubleTap = this.interval > 0 && this.interval <= this.tapMaxTime && Math.abs(this.activePoint[0].x - this.startPoint[0].x) < 30 && Math.abs(this.activePoint[0].y - this.startPoint[0].y) < 30;
        }

        // [!press] 点击超过750ms,且时间内没有触发touchmove和touchstart, 那么触发press
        this.pressTimeout = setTimeout(() => {
            this.type = 'press';
            this._pressHandle(e);
        }, 750);

        // [!tap]设置当前点为起始点
        this.startPoint[0].x = this.activePoint[0].x;
        this.startPoint[0].y = this.activePoint[0].y;

        // 接触点超过1个
        if (1 < pointCount) {
            // 取消press事件
            this._cancelPress();

            // 向量的x/y投影距离
            const vx = points[1].pageX - points[0].pageX;
            const vy = points[1].pageY - points[0].pageY;

            // 起始向量
            this.startV = {
                x: vx,
                y: vy
            };

            // 初始向量模
            this.startVModule = this._getVLength(this.startV);

            // 获取之前操作值作为起始值
            this.startScale = this.activeScale;
            this.startAngel = this.activeAngle;
        } else {}
    }

    touchMoveHandle(e) {
        this.isPreventDefault && e.preventDefault();
        this.isStopPropagation && e.stopPropagation();

        const points = e.touches;
        const pointCount = points.length;
        this.isDoubleTap = false;
        if (1 < pointCount) {
            this.activePoint[1].x = points[1].pageX;
            this.activePoint[1].y = points[1].pageY;

            // 当前2个触点间距离
            const vx = points[1].pageX - points[0].pageX;
            const vy = points[1].pageY - points[0].pageY;

            // [!rotate][!pinch], 当前向量
            this.activeV = {
                x: vx,
                y: vy
            };

            // [!pinch], 当前向量模
            this.activeVModule = this._getVLength(this.activeV);

            // [!pinch], 当前缩放比例
            this.activeScale = this.activeVModule / this.startVModule;

            // [!rotate], 本次touchmove和上次touchmove的夹角
            this.activeAngle = this._getAngle(this.activeV, this.startV);

            // [!rotate], 重置, 起始向量为当前向量, 这样activeAngel是每次touchmove的夹角
            this.startV = this.activeV;

            // [!pinch], 重置
            this.startVModule = this.activeVModule;

            this._rotateHandle(this.activeAngle, e);

            this._pinchHandle(this.activeScale, e);

            this.isPreventSwipe = true;
            this.preventSwipeTimeout = setTimeout(() => {
                this.isPreventSwipe = false;
            }, 300);

        } else {
            // [!pan]
            let deltaX = 0;
            let deltaY = 0;
            if (null !== this.startPoint[0].x) {
                deltaX = points[0].pageX - this.activePoint[0].x;
                deltaY = points[0].pageY - this.activePoint[0].y;
            } else {
                // 2指移开一个1指, 那么重新给起始点赋值,
                // 防止一直进行上面null !== this.startPoint[0].x的逻辑
                // 这样移开一个手指后, 另一个手指也可以继续拖拽移动
                this.startPoint[0].x = this.activePoint[0].x;
                this.startPoint[0].y = this.activePoint[0].y;
            }

            //
            const touchMoveX = Math.abs(points[0].pageX - this.startPoint[0].pageX);
            const touchMoveY = Math.abs(points[0].pageY - this.startPoint[0].pageY);

            //   if(this.panThreshold < Math.max(touchMoveX, touchMoveY)) {
            e.fingerData = {deltaX, deltaY};
            this._panHandle(e);
            //   }
        }

        // 重置当前起点
        this.activePoint[0].x = points[0].pageX;
        this.activePoint[0].y = points[0].pageY;

        // [!long-tap] 发生移动, 取消long-tap
        this._cancelPress();
        if (1 < pointCount) {
            e.preventDefault();
        }
    }

    touchEndHandle(e) {
        this.isPreventDefault && e.preventDefault();
        this.isStopPropagation && e.stopPropagation();

        // 触发end的时候, 屏幕上剩余的接触点个数
        const remainTouchsCount = e.touches.length;
        const points = e.changedTouches;
        const pointCount = points.length;
        this.activePoint[0].x = points[0].pageX;
        this.activePoint[0].y = points[0].pageY;

        // [!swipe], 用来计算拖拽事件
        this.lastTime = Date.now();

        // [!tap]
        const deltaX = this.activePoint[0].x - this.startPoint[0].x;
        const deltaY = this.activePoint[0].y - this.startPoint[0].y;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (5 > absDeltaX && 5 > absDeltaY) {
            // [!singleTap !doubleTap] 如果不是双击, 那么让单击事件this.tapMaxTimems后执行
            if (!this.isDoubleTap) {
                this.singleTapTimeout = setTimeout(() => {
                    this._singleTapHandle(e);
                }, this.tapMaxTime);
            }
        } else {
            // [!swiper]
            // minVelocity
            // 拖拽时间
            const holdTime = this.lastTime - this.startTime;
            const velocity = Math.max(absDeltaX, absDeltaY) / holdTime;
            const velocityX = absDeltaX / holdTime;
            const velocityY = absDeltaY / holdTime;

            if (0.3 < velocity && 200 > Date.now() - this.startTime) {
                let direction = 'none';
                if (absDeltaX > absDeltaY) {
                    direction = 0 < Math.sign(deltaX) ? 'right' : 'left';
                } else {
                    direction = 0 < Math.sign(deltaY) ? 'down' : 'up';
                }
                if (0 == remainTouchsCount && !this.isPreventSwipe) {
                    // [!swiper]
                    this.swipeTimeout = setTimeout(() => {
                        this._swipeHandle({
                            deltaX,
                            deltaY,
                            direction,
                            velocity,
                            velocityX,
                            velocityY,
                            holdTime
                        }, e);
                    }, 0);
                }
            }
        }

        // [!singleTap !doubleTap] 如果当前是双击, 那么取消单击事件
        if (this.isDoubleTap) {
            clearTimeout(this.singleTapTimeout);
            this._doubleTapHandle(e);
        }

        // [!long-tap] 手指离开屏幕, 取消long-tap
        this._cancelPress();
        // [!pan] 用来当发生pinch/rotate时, 避免同时发生pan
        this.startPoint[0] = {
            x: null,
            y: null
        };
        this.startPoint[1] = {
            x: null,
            y: null
        };
    }

    touchCancelHandle(e) {
        this._cancelALl();
        // this.isStopPropagation && e.stopPropagation();
    }

    on(type, handle) {
        switch (type) {
            case 'rotate':
                {
                    this._rotateHandle = handle;
                    break;
                }

            case 'pinch':
                {
                    this._pinchHandle = handle;
                    break;
                }

            case 'tap':
                {
                    this._singleTapHandle = handle;
                    break;
                }

            case 'doubleTap':
                {
                    this._doubleTapHandle = handle;
                    break;
                }

            case 'press':
                {
                    this._pressHandle = handle;
                    break;
                }

            case 'pan':
                {
                    this._panHandle = handle;
                    break;
                }

            case 'swipe':
                {
                    this._swipeHandle = handle;
                    break;
                }
        }
    }

    destory() {
        el.removeEventListener('touchstart', this._touchstart);
        el.removeEventListener('touchmove', this._touchmove);
        el.removeEventListener('touchend', this._touchend);
        el.removeEventListener('touchcancel', this._touchcancel);
        this._cancelALl();
    }

    _cancelPress() {
        clearTimeout(this.pressTimeout);
    }

    _cancelDoubleTap() {
        clearTimeout(this.doubleTapTimeout);
    }

    _cancelSwipe() {
        clearTimeout(this.swipeTimeout);
    }

    _cancelPinch() {
        clearTimeout(this.pinchTimeout);
    }

    _cancelALl() {
        clearTimeout(this.pressTimeout);
        clearTimeout(this.singleTapTimeout);
        clearTimeout(this.doubleTapTimeout);
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