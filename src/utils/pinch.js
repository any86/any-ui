export default class Pinch {
    /**
     * 
     * @param {Element} el 
     * @param {Object} param1 
     */
    constructor(el, { }) {
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
        el.addEventListener('touchstart', this.touchStartHandle.bind(this));
        el.addEventListener('touchmove', this.touchMoveHandle.bind(this));
        el.addEventListener('touchend', this.touchEndHandle.bind(this));
    }

    touchStartHandle(e) {
        const points = e.touches;
        if (1 < points.length) {
            this.distanceX = points[1].pageX - points[0].pageX;
            this.distanceY = points[1].pageY - points[0].pageY;
            this.startDistance = Math.round(Math.sqrt(this.distanceX * this.distanceX + this.distanceY * this.distanceY));
            this.startScale = this.scale;

        }
    }

    touchMoveHandle(e) {
        const points = e.touches;
        if (1 < points.length) {
            this.distanceX = points[1].pageX - points[0].pageX;
            this.distanceY = points[1].pageY - points[0].pageY;
            this.distance = Math.round(Math.sqrt(this.distanceX * this.distanceX + this.distanceY * this.distanceY));
            this.scale = this.distance / this.startDistance * this.startScale;
            if (0 >= this.scale) this.scale = 0.01;
        }
    }

    touchEndHandle(e) {
        const points = e.touches ? e.touches[0] : e;
    }
}