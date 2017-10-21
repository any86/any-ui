<template>
    <v-infinite-scroll v-model="scrollTop">
        <div class="seg">
            <label><input name="a" type="radio" />
                <span>全部</span>
            </label>
            <label><input name="a" type="radio" />
                <span>最新</span>
            </label>
        </div>

        <v-cell v-for="item in dataSource.list" :key="item">
            <v-lazy-load :src="item" :watch="scrollTop" class="image"></v-lazy-load>
        </v-cell>
        
    </v-infinite-scroll>
</template>
<script>
import Mock from 'mockjs';
import VLazyLoad from '@/packages/LazyLoad/LazyLoad';
import VInfiniteScroll from '@/packages/InfiniteScroll/InfiniteScroll';
import VCell from '@/packages/Cell/Cell';
export default {
    name: 'TabsDemo',

    data() {
        return {
            scrollTop: 0,
            dataSource: Mock.mock({
                'list|120': ["@image('300x300')"]
            }),
            isShow: true,
            index: 0
        };
    },

    components: {
        VInfiniteScroll,
        VCell,
        VLazyLoad
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
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
</style>
