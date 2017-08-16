<template>
    <ScrollView v-model="scrollY" class="page-canvas">

        <div class="button">确定</div>  
    </ScrollView>
</template>
<script>

export default {
    name: 'Canvas',

    data() {
        return {
            canvas: null,
            scrollY: 0,
        }
    },

    mounted() {

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

    .button{height: 50px;width:200px;text-align: center;line-height: 50px; background: $base;color: $sub;margin:30% auto;position: relative;
        &:after{content:''; position: absolute;top:0;right: 0;height: 50px;width:200px;text-align: center;line-height: 50px;color: $fff;}
        &:active:after{background: $success;}
    }
}
</style>
