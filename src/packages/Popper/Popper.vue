<template>
    <span  @click="showPopper">
        <transition name="fade">
            <span ref="popper" v-show="isShow" class="atom-popper">
                <slot></slot>
            </span>
        </transition>
        <slot name="reference"></slot>
    </span>
</template>
<script>
import Popper from 'popper.js';
export default {
    name: 'Popper',

    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        },

        placement: {
            type: String,
            default: 'auto'
        }
    },

    data() {
        return {
            popper: null,
            top: 0,
            left: 0,
            isShow: false,
            referenceElm: null,
            popperElm: null
        };
    },

    mounted() {
        this.createPopper();
        document.addEventListener('click', this.closePopper);
    },

    methods: {
        handleDocumentClick(e) {
            if (
                this.$el.contains(e.target) ||
                this.referenceElm.contains(e.target) ||
                this.popperElm.contains(e.target)
            ) {
                return;
            }
        },

        closePopper(e) {
            this.handleDocumentClick(e);
            this.isShow = false;
        },

        showPopper() {
            this.isShow = !this.isShow;
            this.$nextTick(() => {
                this.updatePopper();
            });
        },

        createPopper() {
            this.referenceElm = this.$slots.reference[0].elm;
            this.popperElm = this.$refs.popper;
            // 插入箭头
            const arrow = document.createElement('div');
            arrow.setAttribute('x-arrow', '');
            arrow.className = 'popper__arrow';
            this.popperElm.appendChild(arrow);
            this.popper = new Popper(this.referenceElm, this.popperElm);
        },

        updatePopper() {
            this.popperElm ? this.popper.scheduleUpdate() : this.createPopper();
        }
    },

    destroyed() {
        this.popper.destroy();
    }
};
</script>
<style lang="scss">
@import '../../scss/theme.scss';
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
