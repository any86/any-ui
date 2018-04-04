<template>
    <a-group class="fill">
        <a-steps v-model="activeIndex">
            <a-steps-item>支持简单模式，即不指定icon，label将垂直居中显示。</a-steps-item>
            <a-steps-item>使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等。</a-steps-item>
            <a-steps-item>当页面加载时，元素将获得焦点 (注意：autofocus 在移动版 Safari 上不工作)。事实上，你访问后还没点击任何内容，input 就获得了焦点。现在让我们完善这个指令：</a-steps-item>
        </a-steps>
        <a-button :is-ghost="true" @click="prev">上一步</a-button>
        <a-button type="primary" @click="next">下一步</a-button>
    </a-group>
</template>
<script>
import { AGroup, AButton, ASteps, AStepsItem } from '@/packages'

export default {
    name: 'StepsDemo',

    data() {
        return {
            activeIndex: 0
        };
    },

    methods: {
        prev() {
            this.activeIndex = Math.max(0, this.activeIndex - 1);
        },

        next() {
            this.activeIndex = Math.min(2, this.activeIndex + 1);
        }
    },

    components: {
        AGroup,
        AButton,
        ASteps,
        AStepsItem
    }
};
</script>
<style scope lang="scss">
@import '../scss/variables.scss';
</style>
