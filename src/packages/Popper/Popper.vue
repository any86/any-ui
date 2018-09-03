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

        // 暂时未实现
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

        // 准备删除
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
                props: { name: 'fadeUp' }
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