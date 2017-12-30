/**
 * https://segmentfault.com/a/1190000010511484#articleHeader0
 * https://segmentfault.com/a/1190000007448808#articleHeader1
 */
// 私有属性
const _noop = () => { };
// let _action = '';

export default class Finger {
    /**
     * 
     * @param {Element} el 
     * @param {Object} param1 
     */
    constructor(el) {
        this.startTime = null;
        this.lastTime = null;
        this.startScale = 1;
        this.activeScale = 1;
        this.startAngel = 0;
        this.activeAngel = 0;
        this.startV = { x: null, y: null };
        this.activeV = { x: null, y: null };
        this.startPoint = { x: null, y: null };
        this.activePoint = { x: null, y: null };
        this.isDoubleTap = false;
        this._rotateHandle = () => { };
        this._pinchHandle = () => { };
        this._tapHandle = () => { };


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

    touchStartHandle(e) {
        if (!e.touches) return;
        e.stopPropagation();
        const points = e.touches;
        this.lastTime = this.startTime;
        this.startTime = Date.now();
        this.interval = this.startTime - (this.lastTime || this.startTime);
        // [!tap] 为tap系列做准备
        this.activePoint.x = points[0].pageX;
        this.activePoint.y = points[0].pageY;

        // [!doubleTap]
        if (null !== this.startPoint.x) {
            this.isDoubleTap = (this.interval > 0 && this.interval <= 250 && Math.abs(this.activePoint.x - this.startPoint.x) < 30 && Math.abs(this.activePoint.y - this.startPoint.y) < 30);
            log(this.isDoubleTap)
        }

        // [!tap]设置当前点为起始点
        this.startPoint.x = this.activePoint.x;
        this.startPoint.y = this.activePoint.y;

        

        // 
        if (1 < points.length) {
            // 向量的x/y投影距离
            const vx = points[1].pageX - points[0].pageX;
            const vy = points[1].pageY - points[0].pageY;

            // 起始向量
            this.startV = { x: vx, y: vy };

            // 初始向量模
            this.startVModule = this._getVLength(this.startV);

            // 获取之前操作值作为起始值
            this.startScale = this.activeScale;
            this.startAngel = this.activeAngle;

        }
    }

    touchMoveHandle(e) {
        e.stopPropagation();
        const points = e.touches;
        this.isDoubleTap = false;
        if (1 < points.length) {
            // 当前2个触点间距离
            const vx = points[1].pageX - points[0].pageX;
            const vy = points[1].pageY - points[0].pageY;

            // [!rotate][!pinch], 当前向量
            this.activeV = { x: vx, y: vy };

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

            this._rotateHandle(this.activeAngle);

            this._pinchHandle(this.activeScale);
        }
    }

    touchEndHandle(e) {
        e.stopPropagation();
        const points = e.touches ? e.touches[0] : e;
        if(this.isDoubleTap) {
            // this._doubleTapHandle();
        }
    }

    touchCancelHandle(e) {
        e.stopPropagation();
    }

    on(type, handle) {
        switch (type) {
            case 'rotate': {
                this._rotateHandle = handle;
                break;
            }
            case 'pinch': {
                this._pinchHandle = handle;
                break;
            }
        }
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