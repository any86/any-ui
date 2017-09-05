<template>
    <div :style="{height: height + 'px'}" v-on="$listeners" @click="click" class="component-affix">
        <div ref="main" :class="{'fixed': isFixed}" :style="{top: this.offsetTop + 'px'}">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { getElementTopFromDocument } from '@/packages/Tools/dom'
export default {
    name: 'Affix',

    props: {
        scrollY: {
            required: true,
            type: Number
        },

        offsetTop: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            top: 0,
            height: 'auto',
        };
    },

    mounted() {
        // 固定占位容器的高度为内容高度
        // 防止内容定位变成fixed时抖动
        this.height = this.$el.offsetHeight;
        // 获取距离文档顶部的距离
        // const top = getElementTopFromDocument(this.$el)
        // this.$emit('mounted', { top });
    },

    methods: {
        click() {
            const top = getElementTopFromDocument(this.$el);
            this.$emit('click', { top });
        }
    },

    computed: {
        isFixed() {
            if (0 == this.top) {
                return false;
            } else {
                return this.offsetTop > this.top;
            }
        }
    },

    watch: {
        scrollY(value) {
            this.top = this.$el.getBoundingClientRect().top;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-affix {
    position: relative;
    .fixed {
        position: fixed;
        left: 0;
        z-index: 100;
        width: 100%;
    }
}
</style>
