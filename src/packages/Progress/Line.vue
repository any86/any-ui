<template>
    <div class="component-progress-line">
        <div class="body" :style="{width: value + '%', transition: 'width ' + this.time + 'ms linear'}"></div>
    </div>
</template>
<script>
export default {
    name: 'ProgressLine',

    props: {
        value: {
            type: [Number, String]
        },

        time: {
            type: [Number, String],
            default: 300
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-progress-line {
    background: $lighter;
    height: 2px;
    position: relative;
    overflow: hidden;
    .body {
        width: 0;
        height: 2px;
        background: $base;
    }
}
</style>
