<template>
    <div class="step"
         :class="{'step-active': inStep,'step-first':(firstNode == index) ? true : false,'step-last':(itemLength-1 == index) ? true : false}">
        <span class="step-title" :class="{'title-active': inStep, 'current-title':active}">
            {{stepTitle}}
            <span v-if="active" class="light"></span>
        </span>
        <span class="step-wrap-annular">
            <span class="step-inner-annular">{{index+1}}</span>
        </span>
    </div>
</template>
<script>
    export default {
        name: 'Step',
        data() {
            return {
                firstNode:0,
            };
        },
        props: {
            value: 0,
            inStep:{
                type: Boolean,
                default: false
            },
            index:{
                type:Number
            },
            itemLength:{
                type:Number
            },
            active:{
                type:Boolean
            },
            stepTitle:{
                type:String
            }
        },
        watch: {

        }
    };
</script>
<style scope lang="scss" rel="stylesheet/scss">

    @keyframes barberpole {
        from {
            background-position: 0% 0%;
        }

        to {
            background-position: 600px 0%;
        }
    }
    .step{
        -webkit-box-flex: 1;
        text-align: center;
    }
    .step-active{
        background-image: linear-gradient(top,#ababab,#eee 50%,#ababab 100%);
    }
    .step-first{
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }
    .step-last{
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    .step-title{
        position: relative;
        top:22px;
        display: block;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #ccc;
        font-weight: bold;
    }
    .title-active{
        color: #788184;
    }
    .step-wrap-annular{
        display: inline-block;
        position: relative;
        bottom: 68px;
        width: 40px;
        height: 40px;
        background: #ddd;
        border-radius: 20px;
        .step-inner-annular{
            display: block;
            width: 30px;
            height: 30px;
            position: relative;
            top:5px;
            left: 5px;
            border-radius: 15px;
            background: #fff;
            color: #ddd;
            line-height: 30px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
        }
    }
    .step-active{
        .step-wrap-annular{
            background: #bababa;
            .step-inner-annular{
                background: #fff;
                color: #f98451;
            }
        }
    }
    .light{
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        width: 60px;
        height: 20px;
        background-image: linear-gradient(0deg,rgba(255,255,255,0),rgba(255,255,255,0.8),rgba(255,255,255,0));
        transform: skewx(-25deg);
        animation: lightmove ease-in-out 1500ms infinite;
    }
    @keyframes lightmove
    {
        from {left:0;}
        to {left:100%;}
    }
    .current-title{
        color: #aba082;
        /*color: #f98451;*/
    }
</style>