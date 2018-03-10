<template>
    <main class="fill">
        <a-button type="success" @click="handle" :is-block="true">$tooltip方式调用</a-button>

        <a-popper :is-show.sync="isShow1" target=".trigBtn">
            <p style="padding:15px;">请输入用户名</p>
            <label slot="reference">用户名: <input @focus="isShow1=true" type="text"/></label>
        </a-popper>

        <a-button type="warning" :is-block="true" @click="isShow1=!isShow1" class="gutter-top trigBtn">
            组件标签方式调用</a-button>
    </main>
</template>
<script>
import AButton from '@/packages/Button/Button'
export default {
    name: 'PopperDemo',

    data() {
        return {
            isShow1: false,
            isShow2: false
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
