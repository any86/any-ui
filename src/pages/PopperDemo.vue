<template>
        <main>
            <a-button type="success" @click="handle" class="gutter">$tooltip方式调用</a-button>

                <a-popper :is-show.sync="isShow1" link-id="h1">
                    <p style="padding:15px;">请输入用户名</p>
                    <label slot="reference">用户名: <input @focus="isShow1=true" type="text"/></label>
                </a-popper>

    <h1 id="h1">我是标题1234567</h1>

            <!-- <a-cell>
                <a-popper :is-show.sync="isShow1" >
                    <p style="padding:15px;">请输入用户名</p>
                    <label slot="reference">用户名: <input @focus="isShow1=true" type="text"/></label>
                </a-popper>
            </a-cell>
            <a-cell>
                <a-popper :is-show.sync="isShow2">
                    <p style="padding:15px;">用户名密码不对!</p>
                    <a-button slot="reference" type="warning" class="gutter-sm" @click="isShow2=true">弹出</a-button>
                </a-popper>
            </a-cell> -->
        </main>
</template>
<script>
import AButton from '@/packages/Button/Button'
export default {
    name: 'PopperDemo',

    data() {
        return {
            isShow1: true,
            isShow2: false
        };
    },

    mounted() {
        // const node = document.getElementById('th2');
    },

    methods: {
        handle(e) {
            const vnode = this.$createElement('AButton', {props: {type: 'success'}}, [123]);
            dir(vnode)
            const node = e.currentTarget;
            this.$tooltip(node, vnode);
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
