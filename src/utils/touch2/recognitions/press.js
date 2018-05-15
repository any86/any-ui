export default class PressRecognizer {

    constructor() {
        this.type = 'pressup';
        this.$fingerInput = {};
        this.pressTimeout = null;
    };

    start(fingerInput, callback) {
        this.$fingerInput = fingerInput;
        this.pressTimeout = setTimeout(() => {
            this.type = 'press';
            callback(this.type);
        }, 251);
    }

    move(fingerInput) {
        this.$fingerInput = fingerInput;
        if (9 < this.$fingerInput.absDeltaX || 9 < this.$fingerInput.absDeltaY) {
            this.cancelPress();
        }
    };

    end(fingerInput) {
        this.$fingerInput = fingerInput;
        // 识别[pressup]
        if (null !== this.pressTimeout) {
            this.type = 'pressup';
            this.pressTimeout = null;
        }

        if (250 > this.$fingerInput.offsetTime && 2 > this.$fingerInput.absOffsetX && 2 > this.$fingerInput.absOffsetY) {
            this.cancelPress();
        }
    }

    cancel() {
        clearTimeout(this.pressTimeout);
        this.pressTimeout = null;
    };

    computedData(e) {
        return {
            type: this.type,
            nativeEvent: e
        }
    }
};