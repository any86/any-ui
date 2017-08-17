<template>
    <div class="component-tabs" @click="click" @touchstart="touchstart" @touchmove.stop.prevent="touchmove" @touchend="touchend">
        <div ref="film" :class="['film', 0 == touch.status && 'transition']" :style="{transform: `translate3d(${touch.translateXNew}px, 0, 0)`}">
            <slot></slot>
            <!-- runway -->
            <div class="active-runway">
                <div class="nonius" :style="{width: itemWidth[active] + 'px', transform: `translate3d(${noniusTranslateX}px, 0, 0)`}">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TWEEN from 'tween.js'
export default {
    name: 'Tabs',

    props: {
        value: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            isFixed: false,
            scrollNode: null,
            itemWidth: [],
            width: -1,
            filmWidth: -1,
            count: 0,
            touch: {
                status: 0,
                start: 0,
                current: 0,
                distance: 0,
                translateXNew: 0,
                translateXOld: 0,
            }
        }
    },

    mounted() {
        this.width = this.$el.offsetWidth;
        window.addEventListener('resize', () => {
            this.width = this.$el.offsetWidth;
        });

        // this.scrollNode = this.findScrollParent(this.$el);

        // // 监听scrollNode
        // this.scrollNode.addEventListener('scroll', e => {
        //     var { top } = this.$el.getBoundingClientRect();
            
        //     if(0 >= top){
        //         this.isFixed = true;
        //     } else {
        //         this.isFixed = false;
        //     }
        // }, false);

    },

    methods: {
        findScrollParent(el) {
            var parentNode = el.parentNode;
            var overflowY = getComputedStyle(parentNode, null).overflowY;
            while ('scroll' != overflowY && parentNode) {
                parentNode = parentNode.parentNode;
                overflowY = getComputedStyle(parentNode, null).overflowY;
            }
            return parentNode;
        },

        animate(from, to, time, cb) {
            var tween = new TWEEN.Tween({ value: from });
            tween.to({ value: to }, time);
            tween.start();
            animate();
            function animate() {
                requestAnimationFrame(animate);
                TWEEN.update();
            }
            tween.onUpdate(function () {
                cb(this.value);
            });
        },

        click(e) {
            // var { top } = e.target.getBoundingClientRect();
            // // 移动到顶部
            // var from = this.scrollNode.scrollTop;
            // var to = this.scrollNode.scrollTop + top;
            // this.animate(from, to, 300, value => {
            //     this.scrollNode.scrollTop = value;
            // });
        },

        touchstart(e) {
            this.touch.status = 1;
            this.touch.start = e.touches[0].clientX;
        },

        touchmove(e) {
            this.touch.status = 2;
            this.touch.current = e.touches[0].clientX;
            var translateXNew = this.touch.current - this.touch.start + this.touch.translateXOld;
            // 左边界 && 右边界
            if (0 >= translateXNew && this.width - this.filmWidth <= translateXNew) {
                this.touch.translateXNew = translateXNew;
            }
        },

        touchend(e) {
            this.touch.status = 0;
            this.touch.translateXOld = this.touch.translateXNew;
        }
    },

    computed: {
        active: {
            get() {
                return this.value;
            },

            set(value) {
                this.$emit('input', value);
            }
        },
        noniusTranslateX() {
            var translateX = 0;
            for (var i = 0; i < this.active; i++) {
                translateX += this.itemWidth[i];
            }
            return translateX;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 1rem;

.component-tabs {
    background: $background;
    border-bottom: 1px solid $lightest;
    position: relative;
    height: $height;
    width: 100%;
    &-fixed {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
    } // &:before {
    //     pointer-events: none;
    //     position: absolute;
    //     top: 0;
    //     left:0;
    //     display: block;
    //     width: 1.18rem;
    //     height: 100%;
    //     content: " ";
    //     z-index: 10;
    //     background: -webkit-gradient(linear,0 0,100% 0,from(#fff),to(hsla(0,0%,100%,0)));
    // }
    // &:after {
    //     pointer-events: none;
    //     position: absolute;
    //     top: 0;
    //     right:0;
    //     display: block;
    //     width: 1.18rem;
    //     height: 100%;
    //     content: " ";
    //     z-index: 10;
    //     background: -webkit-gradient(linear,100% 0,0 0,from(#fff),to(hsla(0,0%,100%,0)));
    // }
    .film {
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
        &.transition {
            transition: transform 300ms;
        }
    }
    .active-runway {
        height: 1px;
        position: absolute;
        z-index: 2;
        bottom: -1px;
        left: 0;
        .nonius {
            // margin: 0 3*$gutter;
            transition: all .3s cubic-bezier(0.35, 0, 0.25, 1);
            height: 1px;
            background: $base;
        }
    }
}
</style>
