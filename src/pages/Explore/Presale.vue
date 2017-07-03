<template>
    <ScrollView v-model="scrollY">
        <div class="banner"></div>
        <main>
            <h2>Collection UK Rings</h2>
            <section v-for="n in 10">
                <router-link tag="div" :to="{path: 'presaleDetail', query: {id: n}}" class="img"></router-link>
                <div class="info">
                    <h3 class="ellipsis">order-xxxx-{{n}}</h3>
                    <small class="ellipsis">UK123123213222123123-UK123123213222123123-{{n}}</small>
                    <div class="price">
                        <a>Current Price : $2{{n}}</a>
                        <a>$1{{n}}</a>
                    </div>
                    <p class="date">Ship on 06/07</p>
                    <VProgress :value="Math.random()"></VProgress>
                    <div class="order">
                        <span>
                            <h6>$15.50</h6>
                            <p>1-20th</p>
                        </span>
                        <span>
                            <h6>$25.50</h6>
                            <p>21-50th</p>
                        </span>
                        <span>
                            <h6>$35.50</h6>
                            <p>>50th</p>
                        </span>
                    </div>
                </div>
            </section>
        </main>
    </ScrollView>
</template>
<script>
import VProgress from '@/packages/Progress/Line'
export default {
    name: 'Presale',

    data() {
        return {
            scrollY: 0
        }
    },

    mounted() {


    },

    components: {
        VProgress
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.banner {
    height: 3.35rem;
    background: $lighter;
}

main {
    >h2 {
        text-align: center;
        height: 1rem;
        line-height: 1rem;
    }
    >section {
        display: flex;
        height: 4rem;
        padding: 3*$gutter;
        border-bottom: 1px solid $lightest;
        &:first-of-type {
            border-top: 1px solid $lightest;
        }
        >.img {
            // height: 3rem;
            margin-right: 3*$gutter;
            width: 3rem;
            background: $lighter;
        }
        >.info {
            flex: 1;
            min-width: 0;
            >h3 {
                font-size: $bigger;
                line-height: .5rem;
            }
            >small {
                font-size: $bigger;
                line-height: .8rem;
                display: block;
            }
            >.price {
                a {
                    font-size: $big;
                    &:last-child {
                        text-decoration: line-through;
                        color: $dark;
                    }
                }
            }
            >.date {
                color: $dark;
                font-size: $bigger;
                line-height: .8rem;
            }

            >.order{display: flex;margin-top: .2rem;
                >span{flex:1;}
            }
        }
    }
}
</style>
