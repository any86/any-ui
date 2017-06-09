<template>
    <div class="container">
        <!-- 头部 -->
        <header>
            <slot name="header"></slot>
        </header>
        <!-- 主体 -->
        <main>
            <slot></slot>
        </main>
        <!-- 底部 -->
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>
<script>
export default {
    name: 'Sticky'

}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
.container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    header {
        overflow: hidden;
    }
    main {
        flex: 1;
        position: relative;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
    }
    footer {
        position: relative;
        overflow: hidden;
        width: 100%;
    }
}
</style>
