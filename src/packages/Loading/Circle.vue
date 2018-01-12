<template>
    <svg viewBox="0 0 100 100" style="display: block; width: 100%;">
        <path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" stroke="#eee" stroke-width="2" fill-opacity="0"></path>
        <path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" stroke="rgb(127,127,127)" stroke-width="2" fill-opacity="0" style="stroke-dasharray: 300, 300; stroke-dashoffset: 300;"></path>
    </svg>
</template>
<script>
export default {
    name: 'LoadingCircle',

    data() {
        return { number: 60, x: 0, y: 0 };
    },

    mounted() {
        var rad = 0;
        var r = 50;
        setInterval(() => {
            this.x = (Math.sin(rad) * r).toFixed(2);
            this.y = -(Math.cos(rad) * r).toFixed(2);
            rad++;
        }, 200);
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
</style>
