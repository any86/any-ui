export default class TapRecognizer {
    constructor() {
        this.type = 'tap';
        this.$fingerInput = {};
        this.tapTimeout = null;
        this.tapCount = 0;
    };

    // start(fingerInput) {

    // };

    // move(fingerInput) {

    // };

    /**
     * touchend阶段触发
     * @param {Object} 手势数据 
     * @param {Boolean} 是否同时识别doubletap, 如果不识别,tap会反应快些(50ms)
     */
    end(fingerInput, hasDoubletap = false) {
        this.$fingerInput = fingerInput;
        // 判断是否[tap|doubeltap]
        // 点击后250ms以内
        // 位移小于2px
        if (250 > this.$fingerInput.offsetTime && 2 > this.$fingerInput.absOffsetX && 2 > this.$fingerInput.absOffsetY) {
            if (0 === this.tapCount) {
                // 识别[tap]
                // 如果没有绑定双击事件, 那么让tap快速执行, 不需要等待200ms去识别doubletap
                this.tapCount++;
                this.tapTimeout = setTimeout(() => {
                    this.type = 'tap';
                    this.tapCount = 0;
                }, hasDoubletap ? 200 : 50);
            } else {
                // 识别[doubletap]
                this.cancel();
                this.type = 'doubletap';
                this.tapCount = 0;
            }
            return this.type;
        }
    };

    cancel() {
        clearTimeout(this.tapTimeout);
        this.tapTimeout = null;
    };

    computedData() {
        return {
            type: this.type,
            nativeEvent: this.$fingerInput.nativeEvent
        }
    }
};