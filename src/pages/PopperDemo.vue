<template>
    <v-infinite-scroll v-model="scrollTop">
        <v-popper :options="{placement: 'top'}">
            <v-cell v-for="n in tabs.list" :key="n">{{n}}</v-cell> 
            <button slot="reference" class="button button-danger" style="margin:100px;">确定
            </button>
        </v-popper>

        <v-group>
        <v-cell>
            <button ref="referenceObject" class="button button-info" >Info</button>
            <p class="popperNode" ref="popperNode">描述</p>
        </v-cell>
        </v-group>
    </v-infinite-scroll>
</template>
<script>
import Mock from 'mockjs';
import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';
import VCell from '@/packages/Cell/Cell';
import VGroup from '@/packages/Group/Group';

import VPopper from '@/packages/Popper/Popper';
import Popper from 'popper.js';
export default {
    name: 'PopperDemo',

    data() {
        return {
            scrollTop: 0,
            tabs: Mock.mock({
                'list|10': ['@province()']
            }),
            index: 0
        };
    },

    mounted() {
        new Popper(this.$refs.referenceObject, this.$refs.popperNode);
    },

    methods: {},

    components: {
        VInfiniteScroll,
        VCell,
        VGroup,
        VPopper
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
