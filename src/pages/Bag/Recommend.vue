<template>
    <section class="row-recommend">
        <header>
            {{dataSource.title}}
        </header>
        <main class="container">
            <section class="scroll-body">
                <span class="item" v-for="item in dataSource.children">
                    <div class="body">
                        <span class="button-add">
                            <Icon value="plus"></Icon>
                        </span>
                <VLazyLoad class="img" :src="item.img" :watch="scrollY"></VLazyLoad>
                <h4 class="title">{{item.title}}</h4>
                <p class="price">{{item.price}}</p>
                </div>
                </span>
            </section>
        </main>
    </section>
</template>
<script>
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
export default {
    name: 'Recommend',

    props: {
        dataSource: {
            required: true
        },

        scrollY: {
            required: true
        }
    },

    data() {
        return {

        };
    },

    created() {

    },

    components: {
        VLazyLoad,
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$headerHeight: .88rem;
.row-recommend {
    background: $background;
    header {
        font-size: $big;
        height: $headerHeight;
        line-height: $headerHeight;
        width: 100%;
        overflow: hidden;
        padding: 0 3*$gutter;
    }
    main {
        margin-top: 3*$gutter;
        >.scroll-body {
            display: flex;
            >.item {
                position: relative;
                flex: 0 0 50%;
                >.body {
                    position: relative;
                    width: 3rem;
                        margin: auto;
                    >.button-add {
                        position: absolute;
                        top: .1rem;
                        right: .1rem;
                        background: $darkest;
                        height: .5rem;
                        line-height: .5rem;
                        width: .5rem;
                        text-align: center;
                        border-radius: 100%;
                        color: $sub;
                        font-size: $big;
                        overflow: hidden;
                    }
                    >.img {
                        display: block;
                        width: 3rem;
                        height: 3rem;
                    }
                    >.title {
                        text-align: center;
                        color: $dark;
                        height: .5rem;
                    }
                    >.price {
                        text-align: center;
                        color: $darkest;
                        height: .5rem;
                        font-size: $bigger;
                    }
                }
            }
        }
    }
}
</style>
