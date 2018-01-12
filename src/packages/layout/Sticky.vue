<template>
    <div class="container">
        <!-- 头部 -->
        <slot name="header" v-if="isShowHeader"></slot>
        <!-- 主体 -->
        <main>
            <slot></slot>
        </main>
        <!-- 底部 -->
        <slot name="footer" v-if="isShowFooter"></slot>
    </div>
</template>
<script>
export default {
    name: 'Sticky',

    props: {
        isShowHeader: {
            type: Boolean,
            default: true
        },

        isShowFooter: {
            type: Boolean,
            default: true
        },

        threshold: {
            type: Number,
            default: 50
        }
    },

    data() {
        return {
            timer: null,
        };
    },

    methods: {}

}
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // 主要内容
    main {
        flex: 1;
        position: relative;
        overflow: hidden;
    }
}
</style>
