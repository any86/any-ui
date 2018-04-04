<template>
    <a-scroll-view class="fill">
        <a-button type="primary" :is-radius="true" :is-block="true" :is-ghost="true" @click="ok1" class="gutter-top">
            默认无标题
        </a-button>

        <a-button type="primary" :is-radius="true" :is-block="true" :is-ghost="true" @click="ok2" class="gutter-top">
            自定义: title | okText
        </a-button>


        <a-button type="primary" :is-radius="true" :is-block="true" :is-ghost="true" @click="ok3" class="gutter-top">
            上方显示: align: 'top'
        </a-button>
    </a-scroll-view>
</template>
<script>
import { AScrollView, AButton } from '@/packages'

export default {
    name: 'AlertDemo',

    methods: {
        ok1(){
            this.$alert('你好, 我是atom !');
        },

        ok2(){
            this.$alert('你好, 我是atom !', {title: '我是标题!', okText: '自定义确定'})
        },

        ok3(){
            this.$alert('我在上方显示!', {align: 'top'})
            
        }
    },

    components: {
        AScrollView,
        AButton
    }
};
</script>
<style scoped lang="scss">

</style>
