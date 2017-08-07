export default {
    data() {
        return {
            touch: {
                status: 0,
                x: {
                    translateOld: 0,
                    translateNew: 0,
                    distance: 0
                },
                y: {
                    translateOld: 0,
                    translateNew: 0,
                    distance: 0
                }
            }
        }
    },

    methods: {
        /**
        * 触摸屏幕
        */
        touchstart(e) {
            this.touch.status = 0;
            this.touch.startX = e.touches[0].clientX;
            this.touch.startY = e.touches[0].clientY;
        },

        touchmove(e) {

        },

        touchend(e) {

        },
    }
};