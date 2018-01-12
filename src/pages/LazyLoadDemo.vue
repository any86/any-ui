<template>
    <v-infinite-scroll v-model="scrollTop">
        <h1 @click="index=1">{{index}}</h1>
        <v-segment v-model="index" ref="trigger">
            <v-segment-item>你想去哪</v-segment-item>
            <v-segment-item>好友去哪</v-segment-item>
        </v-segment>

            <div v-show="0 == index" class="warp">
                <div class="box" v-for="item in dataSource.list" :key="item">
                    <v-lazy-load :src="item" class="image" @loaded="loaded"></v-lazy-load>
                </div>
            </div>

            <div v-show="1 == index" class="warp">
                
                <div class="box" v-for="item in dataSource.list2" :key="item">
                    <v-lazy-load :src="item" class="image" :refreshTime="refreshTime" @loaded="loaded"></v-lazy-load>
                </div>
            </div>


        <!-- <v-cell v-for="item in dataSource.list" :key="item">
                <v-lazy-load :src="item" :watch="scrollTop" class="image"></v-lazy-load>
            </v-cell> -->

    </v-infinite-scroll>
</template>
<script>
import Mock from 'mockjs';
import VLazyLoad from '@/packages/LazyLoad/LazyLoad';
import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';
import VCell from '@/packages/Cell/Cell';
import VSegment from '@/packages/Segment/Segment';
import VSegmentItem from '@/packages/Segment/SegmentItem';

export default {
    name: 'TabsDemo',

    data() {
        return {
            scrollTop: 0,
            dataSource: Mock.mock({
                'list|4': ["@image('300x300')"],
                'list2|6': ["@image('400x400')"]
            }),
            isShow: true,
            index: 0,
            refreshTime: new Date().getTime()
        };
    },
    mounted() {
        // dir(getComputedStyle(this.$refs.warp).getPropertyValue('overflow'));
    },

    methods: {
        loaded(e){
            log(e)
        }
    },

    watch: {
        index(){
            this.refreshTime =  new Date().getTime()
        }
    },

    components: {
        VInfiniteScroll,
        VCell,
        VLazyLoad,
        VSegment,
        VSegmentItem
    }
};
</script>
<style scop lang="scss">
@import '../scss/variables.scss';
.seg {
    width: 230px;
    height: 50px;
    border: 1px solid $base;
    margin: $gutter auto;
    display: flex;
    align-items: center;
    label {
        flex: 1;
        display: block;
        input {
            display: none;
        }
        span {
            text-align: center;
            color: $base;
            display: block;
        }
        input:checked + span {
            background: $base;
            color: $sub;
            height: 50px;
            line-height: 50px;
        }
    }
}

.image {
    margin: $gutter auto;
    min-height: 300px;
}

.warp {
    width: 100%;
    overflow: scroll;
    display: flex;
    .box {
        flex: 0 0 68%;
    }
}
</style>
