<template>
    <div class="com-steps">
        <div class="steps-bar">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Steps',
        data() {
            return {
            };
        },
        props: {
        },
        watch: {

        }
    };
</script>
<style lang="scss" scope rel="stylesheet/scss">
    .com-steps{
        width: 100%;
        padding: 55px 0 35px 0;
        .steps-bar{
            display: -webkit-box;
            height: 12px;
            width: 100%;
            border-radius: 6px;
            background: #eee;
        }
    }
</style>