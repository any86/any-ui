<template>
    <div class="component-progress-line">
        <div class="body" :style="{width: (value * 100) + '%', transition: 'width ' + this.speed + 'ms linear'}"></div>
    </div>
</template>
<script>
export default {
    name: 'ProgressLine',

    props: {
        value: {
            type: [Number, String]
        },

        speed: {
            type: [Number, String],
            default: 300
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height:.05rem;
.component-progress-line {
    background: $lighter;
    height: $height;
    position: relative;
    overflow: hidden;
    .body {
        width: 0;
        height: $height;
        background: $base;
    }
}
</style>
