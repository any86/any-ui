export default class PanRecognizer {
    
    constructor({
        points,
        absOffsetX,
        absOffsetY
    }) {
        this.type = 'panend';
    };

    /**
     * 移动超过10px, 才能算作pan
     */
    isPan() {
        return 10 < absOffsetX || 10 < absOffsetY;
    };

    start(){
        if('panend' === this.type){
            this.type = 'panstart';
        } else if('panstart' === this.type) {
            this.type = 'panmove';
        }
    };

    stop() {
        if('panmove' === this.type){
            this.type = 'panend';
        }
    };


    // computedPanData(e) {
    //     return {
    //         type: 'pan',
    //         deltaX: this.$fingerInput.deltaX,
    //         deltaY: this.$fingerInput.deltaY,
    //         nativeEvent: e
    //     }
    // }

    // // 识别[pan]
    // if (!isStop && (10 < fingerInput.absOffsetX || 10 < fingerInput.absOffsetY)) {
    //     this.emit('pan', this.computedPanData(e), e);
    // }

    // // 识别[panstart | panmove]
    // if ('none' === this.panState) this.panState = 'panstart';
    // else this.panState = 'panmove';
    // this.emit(this.panState, this.computedPanData(e), e);
};