<template>
    <div class="component-tabs" @touchstart="touchstart" @touchmove.stop.prevent="touchmove" @touchend="touchend">
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
        })
    },

    methods: {
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
    border-bottom: 1px solid $lightest;
    position: relative;
    height: $height;
    width: 100%;
    .film {
        display: flex;
        align-items:center;
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
