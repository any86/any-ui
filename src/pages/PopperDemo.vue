<template>
    <main class="fill">
        <a-button type="success" @click="handle" :is-block="true">$tooltip方式调用</a-button>



        <a-button :is-block="true" type="warning"  @click="isShow1=!isShow1" class="gutter-top trigBtn">
            组件标签方式调用</a-button>

        <a-popper :is-show.sync="isShow1" target=".trigBtn" class="fill">
            <h4 class="fill-bottom-sm fill-top-sm text-danger">是否删除?</h4>
            <a-button type="danger" size="sm" class="gutter-top">删除</a-button>
            <a-button type="lighter" :is-ghost="true"  size="sm" class="gutter-top">取消</a-button>
        </a-popper>


        <a-button id="drop-down" :is-block="true" type="info"  @click="isShow2=!isShow2" class="gutter-top">
            <a-icon value="menu" size="24"/>
            模拟下拉菜单</a-button>

        <a-popper :is-show.sync="isShow2" target="#drop-down">
            <a-cell v-for="n in 5" :key="n">菜单{{n}}</a-cell>
        </a-popper>


    </main>
</template>
<script>
import AButton from '@/packages/Button/Button'
export default {
    name: 'PopperDemo',

    data() {
        return {
            isShow1: true,
            isShow2: false,
        };
    },

    mounted() {
        // const node = document.getElementById('th2');
    },

    methods: {
        handle(e) {
            const vnode = this.$createElement('AButton', {props: {type: 'success'}}, [123]);
            const node = e.currentTarget;
            this.$tooltip(node, 'this.$tooltip方式调用');
        }
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
