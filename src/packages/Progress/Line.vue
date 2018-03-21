<template>
    <div :class="{'atom-progress-line--smooth': hasBorderRadius}" class="atom-progress-line">
        <div :class="{smooth: hasBorderRadius}" class="atom-progress-line__body" :style="{width: value + '%', transition: 'width ' + this.speed + 'ms'}"></div>
    </div>
</template>
<script>
export default {
    name: 'AtomProgressLine',

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
            default: true
        }
    }
};
</script>