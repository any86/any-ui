export default class Finger {
    /**
     * 
     * @param {Element} el 
     * @param {Object} param1 
     */
    constructor(el) {
        this._action = '';
        this.deltaX = 0;
        this.deltaY = 0;
        this.startPageX = 0;
        this.startPageY = 0;
        this.distanceX = 0;
        this.distanceY = 0;
        this.startDistance = 0;
        this.distance = 0;
        this.startScale = 1;
        this.scale = 1;
        this.startAngel = 0;
        this.angel = 0;
        this._rotateHandle = () => { };
        this._pinchHandle = () => { };
        el.addEventListener('touchstart', this.touchStartHandle.bind(this));
        el.addEventListener('touchmove', this.touchMoveHandle.bind(this));
        el.addEventListener('touchend', this.touchEndHandle.bind(this));


        // var angel = this._getAngle({x: 1, y: 0}, {x: 2, y: 1});
        // console.log(angel)
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
     * 向量夹角
     * @param {Object} v1 
     * @param {Object} v2 
     */
    _getAngle(v1, v2) {
        if (typeof v1 !== 'object' || typeof v2 !== 'object') {
            console.error('getAngle error!');
            return;
        }
        // 判断方向，顺时针为 1 ,逆时针为 -1；
        let direction = v1.x * v2.y - v2.x * v1.y > 0 ? 1 : -1,
            // 两个向量的模；
            len1 = this._getVLength(v1),
            len2 = this._getVLength(v2),
            mr = len1 * len2,
            dot, r;
        if (mr === 0) return 0;
        // 通过数量积公式可以推导出：
        // cos = (x1 * x2 + y1 * y2)/(|a| * |b|);
        dot = v1.x * v2.x + v1.y * v2.y;
        r = dot / mr;
        if (r > 1) r = 1;
        if (r < -1) r = -1;
        // 解值并结合方向转化为角度值；
        return Math.acos(r) * direction * 180 / Math.PI;
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

    touchStartHandle(e) {
        const points = e.touches;
        if (1 < points.length) {
            this.distanceX = points[1].pageX - points[0].pageX;
            this.distanceY = points[1].pageY - points[0].pageY;
            this.startDistance = Math.round(Math.sqrt(this.distanceX * this.distanceX + this.distanceY * this.distanceY));
            this.startScale = this.scale;
            // this.startAngel = this.angel;
            this._rotateHandle({ angel: this.angel, x1: Math.round(points[1].pageX), x0: Math.round(points[0].pageX), y1: Math.round(points[1].pageY), y0: Math.round(points[0].pageY) });
        }
    }

    touchMoveHandle(e) {
        const points = e.touches;
        if (1 < points.length) {
            this.distanceX = points[1].pageX - points[0].pageX;
            this.distanceY = points[1].pageY - points[0].pageY;
            this.distance = Math.round(Math.sqrt(this.distanceX * this.distanceX + this.distanceY * this.distanceY));
            this.scale = this.distance / this.startDistance * this.startScale;
            this.angel = this._getAngle({ x: points[1].pageX, y: points[1].pageY }, { x: points[0].pageX, y: points[0].pageY });

            if (0 >= this.scale) this.scale = 0.01;
            this._rotateHandle({ angel: this.angel, x1: Math.round(points[1].pageX), x0: Math.round(points[0].pageX), y1: Math.round(points[1].pageY), y0: Math.round(points[0].pageY) });

        }
    }

    touchEndHandle(e) {
        const points = e.touches ? e.touches[0] : e;
    }
}