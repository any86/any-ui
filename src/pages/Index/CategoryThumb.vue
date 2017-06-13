<template>
    <div class="row-category-thumbs" ref="categoryThumbs">
        <span class="item big-item">
            <div>
                <h4>CHARM</h4>
                <h4>BRACELETS</h4>
                <img v-if="dataSource.big" :src="dataSource.big.src" />
            </div>
        </span>
        <router-link v-for="item in dataSource.small" :key="item.title" :to="{path: item.path}" tag="span" class="item">
            <p>{{item.title}}</p>
            <LazyLoad class="img" :src="item.img"></LazyLoad>
        </router-link>
    </div>
</template>
<script>
import LazyLoad from '@/packages/LazyLoad/LazyLoad'
export default {
    name: 'CategoryThumb',

    props: {
        dataSource: {
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
$height: 1.4rem;
.row-category-thumbs {
    margin-top: $gutter * 3;
    overflow: hidden;
    >.item {
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
        >p {
            width: 1rem;
            display: flex;
            margin: auto .2rem;
            box-sizing: border-box;
            font-size: $normal;
        }
        >.img {
            margin: auto;
            box-sizing: border-box;
            width: 1.2rem;
            height: 1.2rem;
        }
        >.img[lazy="loading"] {}
        >.img[lazy="done"] {
            animation: zoom 1s;
        }
        &:nth-child(1) {
            border-right-width: 1px;
        }
        &:nth-child(4) {
            border-right-width: 1px;
        }
        &:nth-child(6) {
            border-right-width: 1px;
        }
        &.big-item {
            overflow: hidden;
            height: 2 * $height;
            div {
                width: 100%;
                h4 {
                    width: 2rem;
                    height: .4rem;
                    display: table;
                    text-align: center;margin: auto;
                    border-bottom:2px solid $darkest;
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
