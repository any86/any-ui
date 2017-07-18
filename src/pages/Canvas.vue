<template>
    <ScrollView v-model="scrollY" class="page-canvas">
        <canvas id="c" width="300" height="300" style="border:1px solid #ccc;margin:15px;"></canvas>
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
        var canvas = document.getElementById('c');
        // var context = canvas.getContext('2d');

        var ctx = canvas.getContext('2d');
        var x = 100,
            y = 100,
            width = 100,
            height = 150,
            angle = 90,
            rectCenterPoint = {
                x: x + width / 2,
                y: y + height / 2
            }; // 矩形中心点

        // 旋转前(红色矩形)
        // ctx.fillStyle = '#ccc';
        // ctx.fillRect(x, y, width, height);
        // 旋转后(绿色矩形)
        // 
        ctx.save();
        ctx.translate(rectCenterPoint.x, rectCenterPoint.y);
        ctx.rotate(Math.PI * angle / 180);
        ctx.translate(-rectCenterPoint.x, -rectCenterPoint.y);
        ctx.fillStyle = '#695';
        ctx.fillRect(x , y, width, height);
        ctx.restore();


        ctx.save();
        ctx.fillStyle = '#666';
        ctx.fillRect(x , y, width, height);
        ctx.restore();
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
