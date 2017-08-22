<template>
    <ScrollView v-model="scrollY" class="page-canvas">
        <h1>canva1111s</h1>
        <canvas ref="canvas" width="300" height="300" style="border:1px solid #ccc;margin:15px;"></canvas>
    </ScrollView>
</template>
<script>
import {
    fabric
} from 'fabric'
export default {
    name: 'Canvas',

    data() {
        return {
            canvas: null,
            scrollY: 0,
        }
    },

    mounted() {
        // ./static/bg.jpg
        // 生成一个画布
        this.canvas = new fabric.Canvas(this.$refs.canvas);


        var filter = new fabric.Image.filters.BlendImage({
            image: fabricImageObject,
            mode: 'multiply',
            alpha: 0.5
        });
        object.filters.push(filter);
        object.applyFilters();
        this.canvas.renderAll();



    },

    methods: {

    },

    watch: {

    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
