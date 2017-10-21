<template>
    <v-infinite-scroll v-model="scrollTop">
        <v-group>
            <v-cell>
                <v-popper v-model="isShow" :options="{placement: 'top'}">
                    <p style="padding:15px;">用户名密码不对!</p style="padding:15px;">
                    <label slot="reference">用户名: <input style="background:#ccc;" type="text" name="" id=""></label>
                </v-popper>
            </v-cell>
            <v-cell>
                <v-popper v-model="isShow" :options="{placement: 'top'}">
                    <p style="padding:15px;">用户名密码不对!</p style="padding:15px;">
                    <button slot="reference" class="button button-warning">弹出</button>
                </v-popper>
            </v-cell>
        </v-group>
    </v-infinite-scroll>
</template>
<script>
import Mock from 'mockjs';
import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';
import VCell from '@/packages/Cell/Cell';
import VGroup from '@/packages/Group/Group';
import VSwitch from '@/packages/Switch/Switch';
import VPopper from '@/packages/Popper/Popper';
export default {
    name: 'PopperDemo',

    data() {
        return {
            scrollTop: 0,
            tabs: Mock.mock({
                'list|5': ['@province()']
            }),
            index: 0,
            isShow: false
        };
    },

    mounted() {},

    methods: {

    },

    components: {
        VInfiniteScroll,
        VCell,
        VGroup,
        VPopper,
        VSwitch
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.popperNode {
    padding: 30px;
    box-shadow: $shadowDown;
}
</style>
