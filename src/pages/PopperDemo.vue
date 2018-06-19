<template>
    <a-scroll-view v-model="scrollTop" class="fill">

        <a-cell :has-ripple="true" v-for="n in 15" :key="n+10" @click="scrollTop=9999">
            滑动到底部{{String.fromCharCode(64 + parseInt(n))}}</a-cell>

        <!-- 模拟confirm -->
        <a-button  type="success"  @click="isShow1=!isShow1" class="gutter-top trigBtn">
            模拟confirm</a-button>

        <a-popper :is-show.sync="isShow1" target=".trigBtn" class="fill">
            <h4 class="fill-bottom-sm fill-top-sm text-darkest">查看更多?</h4>
            <a-button type="dark"  size="sm" @click="showMore" class="gutter-top" >取消</a-button>
            <a-button type="danger" size="sm"  @click="showMore" class="gutter-top">确定</a-button>
        </a-popper>

        <!-- 模拟下拉菜单 -->
        <a-button id="drop-down"  type="info"  @click="isShow2=!isShow2" class="gutter-top">
            <a-icon name="menu" size="16"/>
            模拟下拉菜单</a-button>

        <a-popper :is-show.sync="isShow2" target="#drop-down">
            <a-cell :has-ripple="true" v-for="n in 5" :key="n" @click="isShow2=false">系统菜单{{String.fromCharCode(64 + parseInt(n))}}</a-cell>
        </a-popper>

        <!-- 通过theme属性支持情景色 -->
        <a-button id="type-theme"  type="danger" @click="isShow3=true" class="gutter-top">
            通过type属性支持情景色</a-button>

        <a-popper type="danger" :is-show.sync="isShow3" target="#type-theme" class="fill">
            情景色
        </a-popper>

    </a-scroll-view>
</template>
<script>
import AButton from '@/packages/Button/Button';
export default {
    name: 'PopperDemo',

    data() {
        return {
            scrollTop: 0,
            isShow1: false,
            isShow2: false,
            isShow3: false
            
        };
    },

    mounted() {
        this.isShow1 = true;
    },

    methods: {
        showMore(){
            this.scrollTop=9999;
            this.isShow1 = false;
        },
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.popperNode {
    padding: 30px;
    box-shadow: $shadowDown;
}
</style>
