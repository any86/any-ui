export default class Ripple {
    constructor(el, options = { zIndex: 1986, opacity: 0.2, duration: 1000, background: 'rgb(0,0,0)' }) {

        // touchstart触发水波纹动画
        el.addEventListener('touchstart', event => {
            // 如果非下列定位, 那么设置目标元素的position为relative
            if (!/absolute|relative|fixed|sticky/.test(this.orgPosition)) {
                el.style.position = 'relative';
            }

            // 目标元素样式
            this._orgStyle = getComputedStyle(el).position;
            this.orgPosition = this._orgStyle.position;

            // 创建元素
            this.$rippleNode = this._createRippleNode(event);
            this.$rippleContainerNode = this._createRippleContainerNode(event);
            this.$rippleContainerNode.appendChild(this.$rippleNode);

            // 插入到目标元素
            el.appendChild(this.$rippleContainerNode);

            // setTimeout(()=>{

            // }, duration);

        });

        // touchend时切换class触发动画
        el.addEventListener('touchend', event => {
            this.$rippleNode.className = 'ripple--end';
        });

    }
    /**
     * 建立水波纹容器
     */
    _createRippleContainerNode(event) {
        let $rippleContainerNode;
        $rippleContainerNode = event.target.querySelector('.ripple-container');
        if ($rippleContainerNode) {
            $rippleContainerNode.remove();
        }
        // 在目标元素相同位置制作一个一样尺寸的div
        $rippleContainerNode = document.createElement('div');
        $rippleContainerNode.className = 'ripple-container';
        return $rippleContainerNode;
    }
    /**
     * 建立水波纹
     */
    _createRippleNode(event) {
        // 获取目标元素的信息
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
        $rippleNode.className = 'ripple--start';
        return $rippleNode;
    }

}