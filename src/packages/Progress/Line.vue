<template>
    <div :class="{smooth: hasBorderRadius}" class="atom-progress-line">
        <div :class="{smooth: hasBorderRadius}" class="atom-progress-line__body" :style="{width: value + '%', transition: 'width ' + this.speed + 'ms'}"></div>
    </div>
</template>
<script>
export default {
    name: 'Line',

    props: {
        value: {
            type: [Number, String]
        },

        speed: {
            type: [Number, String],
            default: 300
        },

        hasBorderRadius: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height:.1rem;
.atom-progress-line {
    background: $lightest;
    height: $height;
    position: relative;
    overflow: hidden;
    &__body {
        width: 0;
        height: $height;
        background: $base;
        box-shadow: 0 0 10px $darkest;
        
    }
}
.smooth{
    border-radius: $height;
}
</style>
