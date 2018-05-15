export default class PressRecognizer {

    constructor() {
        this.type = 'preesup';
        this.pressTimeout = null;
        this.$fingerInput = {};
    };

    start(callback){
        this.$fingerInput = fingerInput;
        this.pressTimeout = setTimeout(() => {
            this.type = 'press';
            callback(this.type);
        }, 251);
    }

    move(fingerInput, callback = ()=>{}) {
        this.$fingerInput = fingerInput;
        // 点击后250秒内
        // 位置偏移在2px以内
        // 才可以触发press
        if (9 < this.$fingerInput.absDeltaX || 9 < this.$fingerInput.absDeltaY) {
            // touchmove阶段触发
            this.cancel();
            return false;
        }
    };

    end() {
        // 触发pressup
        if (null !== this.pressTimeout) {
            this.emit('pressup', {
                type: 'pressup'
            });
            this.pressTimeout = null;
        }
    };

    cancel() {
        clearTimeout(this.pressTimeout);
        this.pressTimeout = null;
    }
};