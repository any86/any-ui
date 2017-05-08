<template>
<div class="head-pic">
    <div class="head-circle color-animation">
        <img :src="opts.imgUrl" :alt="opts.userName">
    </div>
    <div class="head-info">
        <div class="head-name">{{opts.userName}}</div>
        <div class="head-dpt"><span class="title">部门</span>:{{opts.userDpt}}</div>
        <div class="head-tel"><span class="title">Tel</span>:{{opts.userTel}}</div>
        <div class="head-qq"><span class="title">QQ</span>:{{opts.userQq}}</div>
    </div>
</div>
</template>
<script>
export default{
    name:'HeadPic',
    data(){
        return {

        };
    },
    props: {
        opts: {
            type: Object
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    @keyframes borderColor
    {
        0%   { border-color: #eee;}
        25%  { border-color: #8fc31f;}
        50%  { border-color: #13b5b1;}
        75%  { border-color: #8c97cb;}
        100% { border-color: #eee;}
    }
    .color-animation{
        animation: borderColor ease-in-out 10s infinite;
    }
    .head-pic{
        overflow: hidden;
        .head-circle{
            width: 120px;
            height: 120px;
            float: left;
            border-radius: 60px;
            border: 2px solid #eee;
            transition: all 1s;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
            &:hover{
                border-color: #0A8;
            }
        }
        .head-info{
            float: left;
            margin-left: 20px;
            padding-top: 10px;
            .head-name{
                font-size: 16px;
                font-weight: bold;
                color: #646464;
            }
            .head-dpt,.head-tel,.head-qq{
                span.title{
                    display: inline-block;
                    width: 30px
                }
                margin-top: 7px;
                font-size: 14px;
            }
        }
    }
</style>