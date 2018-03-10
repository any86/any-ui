<template>
    <span>
        <transition name="fadeUp">
            <span ref="popper" v-show="isShowBySelf && isShow" :style="{padding: `${padding}px`}" class="atom-popper" v-dom-portal="isPortal">
                <slot>{{content}}</slot>
            </span>
        </transition>
        <slot name="reference"></slot>
    </span>
</template>
<script>
import Popper from 'popper.js';
export default {
    name: 'AtomPopper',

    props: {
        options: {
            type: Object,
            default: () => {}
        },

        isShow: {
            type: Boolean,
            default: false
        },

        placement: {
            type: String,
            default: 'auto'
        },

        isCloseAfterClick: {
            type: Boolean,
            default: true
        },

        isPortal: {
            type: Boolean,
            default: false
        },

        content: {
            type: String,
            default: ''
        },

        padding: {
            type: Number
        }
    },

    render(h) {
        return h();
    },

    data() {
        return {
            popper: null,
            referenceNode: null,
            popperNode: null,
            isShowBySelf: true
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.createPopper();
        });
        // 当同一个页面出现多个popper时, close会被执行多次
        if (this.isCloseAfterClick) {
            // touchstart有些时候不执行,不知道为什么?
            document.addEventListener('touchstart', this.close);
            document.addEventListener('click', this.close);
        }
    },

    methods: {
        isTargetInContainer(e) {
            // 当前目标元素不在组件内部 && 当popper移动到body外的时候, 目标不在reference/popper中
            return (
                !this.referenceNode.contains(e.target) &&
                !this.popperNode.contains(e.target)
            );
        },

        close(e) {
            e.stopPropagation();

            if (this.isShow) {
                // 点击组件外部关闭popper
                if (this.isTargetInContainer(e)) {
                    this.$emit('update:isShow', false);
                    this.isShowBySelf = false;
                }
            }
        },

        createPopper() {
            this.referenceNode =
                this.referenceNode || this.$slots.reference[0].elm;
            this.popperNode = this.$refs.popper;
            // 插入箭头
            const arrowNode = document.createElement('div');
            arrowNode.setAttribute('x-arrow', '');
            arrowNode.className = 'popper__arrow';
            this.popperNode.appendChild(arrowNode);
            this.popper = new Popper(this.referenceNode, this.popperNode, {
                placement: this.placement,
                modifiers: {
                    // 取消tanslate控制位置, 防止组件定义的动画被影响
                    computeStyle: { gpuAcceleration: false }
                },
                onUpdate(data, options) {
                    this.$emit('update', { data, options });
                }
            });
        },

        toggle() {
            this.isShow = !this.isShow;
        },

        show() {
            this.$nextTick(() => {
                this.isShow = true;
                this.updatePopper();
            });
        },

        updatePopper() {
            this.popperNode
                ? this.popper.scheduleUpdate()
                : this.createPopper();
        }
    },

    breforeDestory() {
        document.removeEventListener('click', this.close);
        document.removeEventListener('touchstart', this.close);
    },

    destroyed() {
        this.popper.destroy();
        this.popper = null;
    }
};
</script>
<style lang="scss">
@import '../../scss/variables.scss';
$arrowSize: 8px;
$arrowBorderSize: 1px;

.atom-popper {
    z-index: $popperZIndex;
    display: inline-block;
    border: 1px solid $lightest;
    border-radius: $borderRadius;
    background: $sub;

    &[x-placement^='top'] {
        box-shadow: $shadowDown;
        margin-bottom: 10px;
        .popper__arrow {
            position: absolute;
            bottom: -$arrowSize;
            width: 0;
            height: 0;
            border-width: $arrowSize $arrowSize 0 $arrowSize;
            border-style: solid;
            border-bottom-color: transparent;
            border-left-color: transparent;
            border-top-color: hsla(0, 0%, 85%, 0.5);
            border-right-color: transparent;
            &:after {
                content: '';
                position: absolute;
                top: -($arrowSize + $arrowBorderSize);
                right: -($arrowSize - $arrowBorderSize);
                width: 0;
                height: 0;
                border-width: $arrowSize - $arrowBorderSize $arrowSize -
                    $arrowBorderSize 0 $arrowSize - $arrowBorderSize;
                border-style: solid;
                border-bottom-color: transparent;
                border-left-color: transparent;
                border-top-color: $sub;
                border-right-color: transparent;
            }
        }
    }

    &[x-placement^='bottom'] {
        box-shadow: $shadowDown;
        margin-top: 10px;
        .popper__arrow {
            position: absolute;
            top: -$arrowSize;
            width: 0;
            height: 0;
            border-width: 0 $arrowSize $arrowSize $arrowSize;
            border-style: solid;
            border-bottom-color: hsla(0, 0%, 85%, 0.5);
            border-left-color: transparent;
            border-top-color: transparent;
            border-right-color: transparent;
            &:after {
                content: '';
                position: absolute;
                top: $arrowBorderSize;
                right: -($arrowSize - $arrowBorderSize);
                width: 0;
                height: 0;
                border-width: 0 $arrowSize - $arrowBorderSize $arrowSize -
                    $arrowBorderSize $arrowSize - $arrowBorderSize;
                border-style: solid;
                border-bottom-color: $sub;
                border-left-color: transparent;
                border-top-color: transparent;
                border-right-color: transparent;
            }
        }
    }

    &[x-placement^='left'] {
        box-shadow: $shadowDown;
        margin-right: 10px;
        .popper__arrow {
            position: absolute;
            right: -$arrowSize;
            width: 0;
            height: 0;
            border-width: $arrowSize 0 $arrowSize $arrowSize;
            border-style: solid;
            border-bottom-color: transparent;
            border-left-color: hsla(0, 0%, 85%, 0.5);
            border-top-color: transparent;
            border-right-color: transparent;
            &:after {
                content: '';
                position: absolute;
                top: -($arrowSize - $arrowBorderSize);
                right: $arrowBorderSize * 2;
                width: 0;
                height: 0;
                border-width: $arrowSize - $arrowBorderSize 0 $arrowSize -
                    $arrowBorderSize $arrowSize - $arrowBorderSize;
                border-style: solid;
                border-bottom-color: transparent;
                border-left-color: $sub;
                border-top-color: transparent;
                border-right-color: transparent;
            }
        }
    }

    &[x-placement^='right'] {
        box-shadow: $shadowDown;
        margin-left: 10px;
        .popper__arrow {
            position: absolute;
            left: -$arrowSize;
            width: 0;
            height: 0;
            border-width: $arrowSize $arrowSize $arrowSize 0;
            border-style: solid;
            border-bottom-color: transparent;
            border-right-color: hsla(0, 0%, 85%, 0.5);
            border-top-color: transparent;
            border-left-color: transparent;
            &:after {
                content: '';
                position: absolute;
                top: -($arrowSize - $arrowBorderSize);
                left: $arrowBorderSize * 2;
                width: 0;
                height: 0;
                border-width: $arrowSize - $arrowBorderSize $arrowSize -
                    $arrowBorderSize $arrowSize - $arrowBorderSize 0;
                border-style: solid;
                border-bottom-color: transparent;
                border-right-color: $sub;
                border-top-color: transparent;
                border-left-color: transparent;
            }
        }
    }
}
</style>
