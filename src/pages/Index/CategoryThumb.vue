<template>
    <div class="row-category-thumbs" ref="categoryThumbs">
        <!-- 第一行 -->
        <div class="first-part">
            <router-link :to="{path: 'list'}" tag="span" class="item big-item">
                <div>
                    <h4>CHARM</h4>
                    <h4>BRACELETS</h4>
                    <img v-if="dataSource.big" :src="dataSource.big.src" />
                </div>
            </router-link>
            <router-link v-if="1 >= i" v-for="(item, i) in dataSource.small" :key="item.title" :to="{path: item.path}" tag="span" class="item">
                <h4>{{item.title}}</h4>
                <LazyLoad class="img" :src="item.img" :watch="scrollY"></LazyLoad>
            </router-link>
        </div>
        <!-- 普通行 -->
        <div class="other-part">
            <router-link v-if="1 < i" v-for="(item, i) in dataSource.small" :key="item.title" :to="{path: item.path}" tag="span" class="item">
                <h4>{{item.title}}</h4>
                <LazyLoad class="img" :src="item.img" :watch="scrollY"></LazyLoad>
            </router-link>
        </div>
    </div>
</template>
<script>
import LazyLoad from '@/packages/LazyLoad/LazyLoad'
export default {
    name: 'CategoryThumbLayout',

    props: {
        dataSource: {
            required: true
        },

        scrollY: {
            required: true
        }
    },

    components: {
        LazyLoad
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 1.9rem;
.row-category-thumbs {
    margin-top: $gutter * 3;
    overflow: hidden;
    .first-part {
        overflow: hidden;
    }
    .other-part {
        overflow: hidden;
        .item:nth-child(2n+1) {
            border-right-width: 1px;
        }
    }
    .item {
        height: $height;
        width: 50%;
        box-sizing: border-box;
        border-style: solid;
        border-color: $lightest;
        border-width: 0;
        border-bottom-width: 1px;
        display: flex;
        float: left;
        justify-content: space-between;
        >h4 {
            width: 1rem;
            display: flex;
            margin: auto .4rem;
            box-sizing: border-box;
        }
        >.img {
            margin: auto;
            box-sizing: border-box;
            width: 1.3rem;
            height: 1.3rem;
        }
        // >.img[lazy="loading"] {}
        >.img[lazy="done"] {
            animation: zoom 1s;
        }
        &.big-item {
            overflow: hidden;
            height: 2 * $height;
            border-right-width: 1px;
            div {
                width: 100%;
                h4 {
                    width: 2rem;
                    height: .4rem;
                    display: table;
                    text-align: center;
                    margin: auto;
                    border-bottom: 2px solid $darkest;
                }
                img {
                    width: 2rem;
                    height: 2rem;
                    display: block;
                    margin: auto;
                }
            }
        }
    }
}
</style>
