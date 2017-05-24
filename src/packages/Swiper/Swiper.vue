<template>
    <div class="component-swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <slot></slot>
        <div class="pages">
            <a v-for="n in count" :class="{active: n - 1 == active}" @click="chnageItem(n-1)"></a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Swiper',

    props: {

    },

    data() {
        return {
            timer: null,
            active: 0,
            count: 0,
            width: 0,
            height: 0,
            touche: {
                status: 0,
                start: 0,
                current: 0,
                distance: 0
            }
        };
    },

    mounted() {
        var {width, height} = this.$el.getBoundingClientRect();
        this.width = width;
        this.height = height;
        // this.play();
    },

    methods: {
        play() {
            this.timer = setInterval(() => {
                // 右边界
                if (this.count - 1 > this.active) {
                    this.active++;
                } else {
                    this.active = 0;
                }
            }, 2000);
        },

        stop() {
            clearInterval(this.timer);
        },

        chnageItem(i) {
            this.active = i;
        },

        touchStart(e) {
            this.stop();
            this.touche.status = 1;
            this.touche.start = e.touches[0].clientX;
        },

        touchMove(e) {
            this.touche.status = 2;
            this.touche.current = e.touches[0].clientX;
            this.touche.distance = this.touche.current - this.touche.start;
            this.touche.translateX = this.touche.distance
            e.preventDefault();
            e.stopPropagation();
        },

        touchEnd(e) {
            this.touche.status = 0;
            // 正向拖拽&反向拖拽
            if (0 > this.touche.distance) {
                // 拖拽超过1/6
                // 当前页不是最后一页 && this.count - 1 > this.active
                if (0 - this.touche.distance > this.width / 6) {
                    this.active++;
                }
            } else {
                // 拖拽超过1/6
                // 当前是第一张
                // if (this.touche.distance > this.width / 6 && 0 != this.active) {
                //     this.active--;
                // }
            }
            // if(0 > this.active) {
            //     this.active = this.count;
            // } else if(this.count < this.active) {
            //     this.active = 0;
            // }



            // 重置移动距离
            this.touche.distance = 0;
            this.$nextTick(() => {
                // this.play();
            });
        }
    },

    computed: {
        translateX() {
            if (2 == this.touche.status) {
                return 0 - this.active * this.width + this.touche.distance;
            } else {
                return 0 - this.active * this.width;
            }
        }
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
.component-swiper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    >.pages {
        position: absolute;
        left: 50%;
        bottom: 10%;
        transform: translateX(-50%);
        >a {
            margin-right: 5px;
            border-radius: 100%;
            display: inline-block;
            width: 12px;
            height: 12px;
            line-height: 12px;
            text-align: center;
            background: $light;
            color: #fff;
            &.active {
                background: $base;
            }
        }
    }
}
</style>
