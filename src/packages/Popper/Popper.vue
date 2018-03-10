<template>
  <transition name="fadeUp">
      <span v-show="isShow" :style="{padding: `${padding}px`}" :class="[type && 'atom-popper--'+type]" class="atom-popper">
          <slot>{{content}}</slot>
      </span>
  </transition>
</template>

<script>
import Popper from 'popper.js';
export default {
    name: 'AtomPopper',

    props: {
        type:{
            type: String
        },

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

        content: {
            type: String,
            default: ''
        },

        padding: {
            type: Number
        },

        // 目标元素的选择器
        target: {
            type: String
        }
    },

    render(h) {
        return h(
            'transition',
            {
                attrs: { name: 'fadeUp' }
            },
            [
                h(
                    'span',
                    {
                        class: ['atom-popper'],

                        style: {
                            display: this.isShow ? undefined : 'none',
                            padding: `${this.padding}px`
                        }
                    },

                    this.content || this.$slots.default
                )
            ]
        );
    },

    data() {
        return {
            popper: undefined,
            referenceNode: undefined,
            popperNode: undefined,
            arrowNode: undefined,
            isTrigerByCommond: false // 是否由$toolTip打开
        };
    },

    mounted() {
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
                    // 因为是$toolTip驱动的, vue居然没有提示prop不能进行反向赋值, 暂时先这样
                    if (this.isTrigerByCommond) {
                        this.isShow = false;
                    }
                    this.$emit('update:isShow', false);
                }
            }
        },

        /**
         * 构造箭头dom
         */
        _insertArrow() {
            if (undefined !== this.arrowNode) return;
            this.arrowNode = document.createElement('div');
            this.arrowNode.setAttribute('x-arrow', '');
            this.arrowNode.className = 'popper__arrow';
            this.popperNode.appendChild(this.arrowNode);
        },

        /**
         * 初始化popper
         */
        createPopper() {
            // 构造dom结构
            this.referenceNode =
                this.referenceNode || document.querySelector(this.target);
            this.popperNode = this.$el;
            // 插入箭头
            this._insertArrow();
            this.popper = new Popper(this.referenceNode, this.popperNode, {
                placement: this.placement,
                removeOnDestroy: true,
                modifiers: {
                    // 取消tanslate控制位置, 防止组件定义的动画被影响
                    computeStyle: { gpuAcceleration: false }
                },
                onUpdate: (data, options) => {
                    this.$emit('update', { data, options });
                }
            });
        }
    },

    watch: {
        async isShow(isShow) {
            if (!isShow) return;
            await this.$nextTick();
            if (undefined !== this.referenceNode) {
                this.popper.scheduleUpdate();
            } else {
                this.createPopper();
            }
        }
    },

    breforeDestory() {
        document.removeEventListener('click', this.close);
        document.removeEventListener('touchstart', this.close);
        this.popper.destroy();
        this.popper = null;
    }
};
</script>
<style lang="scss">
@import '../../scss/function.scss';
@import '../../scss/variables.scss';
$arrowSize: 8px;
$arrowBorderSize: 1px;

.atom-popper {
    z-index: $popperZIndex;
    display: inline-block;
    border: 1px solid $lightest;
    border-radius: $borderRadius;
    background: $white;

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
                border-top-color: $white;
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
                border-bottom-color: $white;
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
                border-left-color: $white;
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
                border-right-color: $white;
                border-top-color: transparent;
                border-left-color: transparent;
            }
        }
    }
}


// 支持情景色
@each $key, $value in $theme_colors {
    .atom-popper--#{$key} {
        background: rgba($value, 1);
        border-color: rgba($value, 1);
        color: color-yiq(rgba($value, 1));
        &[x-placement^='top'] {
            .popper__arrow {
                border-top-color: rgba($value, 1);
                &:after {
                    border-top-color: rgba($value, 1);
                }
            }
        }
    }
}
</style>
