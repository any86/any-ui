<template>
    <div>
        <svg viewBox="0 0 100 100" style="display: block; width: 100%;">
            <path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" stroke="#eee" stroke-width="1" fill-opacity="0"></path>
            <path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" stroke="rgb(127,127,127)" stroke-width="2.062553749271137" fill-opacity="0" style="stroke-dasharray: 301.635, 301.635; stroke-dashoffset: 194.801;"></path>
        </svg>

        <v-stepper v-model="number"></v-stepper>
    </div>
</template>
<script>
import VStepper from '@/packages/Stepper/Stepper'
export default {
    name: 'LoadingCircle',

    data() {
        return { number: 30, x: 0, y: 0 };
    },

    mounted() {
        var rad = 0;
        var r = 50;
        setInterval(() => {
            this.x = (Math.sin(rad) * r).toFixed(2);
            this.y = -(Math.cos(rad) * r).toFixed(2);
            rad++;
        }, 200)
    },

    components: { VStepper }
}

</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
</style>
