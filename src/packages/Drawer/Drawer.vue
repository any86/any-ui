<template>
    <div class="atom-drawer">
        <aside v-show="!$isServer" ref="side" :style="{transform: `translate3d(${translateX}px, 0, 0)`, transitionDuration: `${transitionDuration}ms`}" :class="[`atom-drawer__side--${placement}`]" class="atom-drawer__side">
            <slot name="side"></slot>
        </aside>
        <main class="atom-drawer__main" :style="mainTranslateXStyle">
            <span v-if="0 < handlerWidth" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" :style="{width: `${handlerWidth}px`}" :class="[`main__handler--${placement}`]" class="main__handler"></span>
            <slot></slot>
            <v-mask :portal="portal" :fixed="false" :isShow="isMaskShow" @click="hide"></v-mask>
        </main>
    </div>
</template>
<script>
// https://github.com/react-native-community/react-native-drawer-layout/blob/master/src/DrawerLayout.js
import { getWidth } from '../../utils/dom';
import VMask from '../../packages/Mask/Mask';
export default {
    name: 'AtDrawer',

    props: {
        portal: {
            default: false
        },

        sensitivity: {
            type: Number,
            default: 30
        },

        handlerWidth: {
            type: Number,
            default: 0
        },

        speed: {
            type: Number,
            default: 300
        },

        mode: {
            type: String,
            default: 'overlay'
        },

        moveRate: {
            type: Number,
            default: 1
        },

        value: {
            type: Boolean,
            default: false
        },

        placement: {
            type: String,
            default: 'left'
        }
    },

    data() {
        return {
            sideWidth: 0,
            viewWidth: 0,
            translateX: 0,
            transitionDuration: 0
        };
    },

    beforeMount() {
        this.$nextTick(() => {
            this.sideWidth = getWidth(this.$refs.side);
            this.viewWidth = getWidth(this.$el);
            if ('left' === this.placement) {
                this.translateX = 0 - this.sideWidth;
            } else {
                this.translateX = this.sideWidth;
            }
        });
    },

    mounted() {
        this.$nextTick(() => {
            if (this.value) {
                this.show();
            } else {
                this.hide();
            }
            this.transitionDuration = 0;
            let elSlot = this.$slots.side[0].elm;
            elSlot.style.height = '100%';
            elSlot.style.overflowY = 'auto';
            elSlot.style.overflowX = 'hidden';
        });
    },

    methods: {
        touchstart(e) {
            this.transitionDuration = 0;
        },

        touchmove(e) {
            const point = e.touches ? e.touches[0] : e;
            if ('left' === this.placement) {
                const moveDistance = point.pageX * this.moveRate;
                if (this.sideWidth >= moveDistance) {
                    // 因为是边缘操作, 起始x坐标== 0,
                    // 所以就没有把位置移动用当前x坐标-起始x坐标,
                    // 直接用当前x坐标表示移动距离, 逻辑更精简,
                    // 反正视觉上不太容易被发现不是从最边缘抽出
                    // 参考了DrawerLayout.js
                    this.translateX = moveDistance - this.sideWidth;
                } else {
                    this.translateX = 0;
                }
                // 并没有针对是x/y哪个轴线拖拽做判断
            } else {
                const moveDistance = this.viewWidth - point.pageX * this.moveRate;
                console.log(moveDistance);
                if (this.sideWidth >= moveDistance) {
                    this.translateX = this.sideWidth - moveDistance;
                }
            }
        },

        touchend() {
            this.transitionDuration = this.speed;
            this.snap();
        },

        /**
         * 自动啮合
         * snap: 咔哒一声关上, 哈哈, 有道翻译, 真有道
         */
        snap() {
            if ('left' === this.placement) {
                if (Math.abs(this.translateX) < this.sideWidth / 2) {
                    this.translateX = 0;
                    this.$emit('input', true);
                } else {
                    this.translateX = 0 - this.sideWidth;
                }
            } else {
                if (Math.abs(this.translateX) < this.sideWidth / 2) {
                    this.translateX = 0;
                    this.$emit('input', true);
                } else {
                    this.translateX = this.sideWidth;
                }
            }
        },

        show() {
            this.transitionDuration = this.speed;
            this.translateX = 0;
            this.$emit('input', true);
        },

        hide() {
            this.transitionDuration = this.speed;
            if ('left' === this.placement) {
                this.translateX = 0 - this.sideWidth;
            } else {
                this.translateX = this.sideWidth;
            }
            this.$emit('input', false);
        }
    },

    watch: {
        value(value) {
            if (value) {
                this.show();
            } else {
                this.hide();
            }
        }
    },

    computed: {
        isMaskShow() {
            if ('left' === this.placement) {
                return 0 - this.sideWidth < this.translateX;
            } else {
                return this.sideWidth > this.translateX;
            }
        },

        mainTranslateXStyle() {
            if ('overlay' == this.mode) {
                if ('left' === this.placement) {
                    return {
                        transform: `translate3d(${this.sideWidth + this.translateX}px, 0, 0)`,
                        transitionDuration: `${this.transitionDuration}ms`
                    };
                } else {
                    return {
                        transform: `translate3d(${this.translateX - this.sideWidth}px, 0, 0)`,
                        transitionDuration: `${this.transitionDuration}ms`
                    };
                }
            } else {
                return {};
            }
        }
    },

    components: {
        VMask
    }
};
</script>

<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-drawer {
    position: relative;
    overflow: hidden;
    height: 100%;
    &__side {
        position: absolute;
        overflow-x: hidden;
        overflow-y: auto;
        top: 0;
        z-index: $drawerZIndex;
        background: $background;
        display: block;
        overflow: hidden;
        max-width: 80%;
        height: 100%;
        will-change: transform;
        &--left {
            left: 0;
            transform: translateX(-100%);
        }
        &--right {
            right: 0;
            transform: translateX(100%);
        }
    }

    &__main {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        flex: 1 0 100%;
        min-width: 0;
        height: 100%;
        width: 100%;
        -webkit-overflow-scrolling: touch;
        overflow: hidden;
        .main__handler {
            height: calc(100% - 120px); // 减去头部和尾部高度
            position: absolute;
            z-index: $drawerZIndex;
            background: rgba(0, 0, 0, 0);
            top:60px;
            &--left {
                left: 0;
            }
            &--right {
                right: 0;
            }
        }
    }
}
</style>
