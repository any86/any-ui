<template>
    <div class="container">
        <!-- 头部 -->
        <slot name="header"></slot>
        
        <!-- 主体 -->
        <main>
            <slot></slot>
        </main>

        <!-- 底部 -->
        <slot name="footer"></slot>
    </div>
</template>
<script>
export default {
    name: 'Sticky',

    props: {
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

    methods: {
    }

}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // 主要内容
    main {
        flex:1;
        position: relative;
        overflow: hidden;
    }
}
</style>
