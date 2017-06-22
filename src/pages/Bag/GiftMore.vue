<template>
    <section class="row-gift-more">
        <section v-for="row in dataSource" :key="row.title">
            <h4 class="title">{{row.title}}</h4>
            <ul class="list">
                <li v-for="item in row.children" :key="item.id">
                    <VLazyLoad class="img" :src="item.img" :watch="scrollY"></VLazyLoad>
                    <span>
                        <h4>FREE</h4>
                        <p>$20.00</p>
                    </span>
                </li>
            </ul>
        </section>
    </section>
</template>
<script>
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
export default {
    name: 'GiftMore',

    props: {
        dataSource: {
            required: true
        },

        scrollY: {
            required: true
        }
    },

    components: {
        VLazyLoad
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.row-gift-more {
    background: $background;
    overflow: hidden;
    >section {
        border-bottom: 1px solid $lightest;
        overflow: hidden;
        .title {
            margin: 0 auto;
            text-align: center;
            display: block;
            width: 100%;
            height: 1rem;
            line-height: 1rem;
        }
        $height: 2rem;
        ul.list {
            display: flex;
            width: 100%;
            padding: .2rem;
            overflow-x: scroll;
            li {
                flex: 1 0 45%;
                border-right: 1px solid $lightest;
                display: flex;
                &:last-child{border-right: none;}
                >.img {
                    margin: .2rem 0 0 .3rem;
                    width: 1.3rem;
                    height: 1.3rem;
                    display: block;
                }
                >span {
                    flex: 1;
                    height: 1rem;
                    margin: .3rem 0 0 .2rem;
                    >h4 {
                        height: 0.5rem;
                        line-height: 0.5rem;
                    }
                    >p {
                        height: 0.2rem;
                        line-height: 0.2rem;
                        text-decoration: line-through;
                        color: $dark;
                    }
                }
            }
        }
    }
}
</style>
