<template>
    <div class="svg-pos" :style="{width: radiusDouble+'px', height:radiusDouble+'px' }">
        <svg :width="radiusDouble" :height="radiusDouble" :viewbox="viewBox">
            <circle :cx="radiusAdd" :cy="radiusAdd" :r="radius" :stroke-width="borderWidth" stroke="#e2e2e2" fill="none"></circle>
            <circle :cx="radiusAdd" :cy="radiusAdd" :r="radius" :stroke-width="borderWidth" :stroke="borderColor" fill="none" :transform="matrixCal" :stroke-dasharray="percent"></circle>
        </svg>
        <div class="percentColor" :style="{fontSize:radius/3+'px'}">{{parentValue*100+'%'}}</div>
    </div>
</template>
<script>
export default{
    name:'circleProgress',

    props:{
        parentValue: Number,
        radius: Number,
        borderWidth: Number,
        borderColor: String
    },

    computed:{
        radiusAdd:function(){
            return this.radius+this.borderWidth
        },
        radiusDouble:function(){
            return (this.radius+this.borderWidth)*2
        },
        viewBox:function(){
            return '0'+' '+'0'+' '+"'"+this.radius*2+"'"+' '+"'"+this.radius*2+"'"
        },
        matrixCal:function(){
            return 'matrix(0,-1,1,0,0,'+(this.radius+this.borderWidth)*2+')'
        },
        percent:function(){
            return this.parentValue*parseInt(Math.PI * 2 * this.radius)+' '+parseInt(Math.PI * 2 * this.radius)
        }
    }

}
</script>
<style lang="scss" rel="stylesheet/scss">
    .svg-pos{
        position: relative;
    }
    circle {
        transition: stroke-dasharray ease-in-out 1s;
    }
    .percentColor{
        position: absolute;
        width: 100%;
        height: 30px;
        top: 50%;
        text-align: center;
        margin-top: -15px;
        line-height: 30px;
        font-weight: bold;
        color: #515151
    }
</style>