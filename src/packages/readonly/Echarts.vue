<template>
    <div ref="echarts" :style="echartSize"></div>
</template>
<script>
    import echarts from 'echarts'
    export default{
        name:'ECharts',
        data() {
            return {

            };
        },
        props: {
            opts: {
                type : Object
            },
            echartSize:{
                type : Object
            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(this.$refs.echarts);
            // 制定图表的配置项和数据
            let option = this.opts;
            myChart.setOption(option);
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .pie-wrap{
        height: 400px;
        width: 600px;
    }
</style>