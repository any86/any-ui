<template>
    <section>
        <img :src="url" class="thumb">

        <h5>count: {{count}}</h5>
        <div class="count flex">
            <span v-for="n in 10" :key="n" @click="count=n" :class="{active: n == count}" class="flex-item">{{n}}</span>
        </div>
    </section>
</template>
<script>
export default {
    name: 'AddToCart',

    props: {
        dataSource: {},
    },

    data() {
        return {
            count: 1,
            url: 'https://static.soufeel.com/media/catalog/product/cache/1/thumbnail/640x/17f82f742ffe127f42dca9de82fb58b1/K/N/KNL27_2.png'
        };
    },

    mounted() {

    },

    methods: {

    }
}
</script>
<style scoped lang="scss">
@import '../../../scss/theme.scss';

h4 {
    text-align: center;
    border-bottom: 1px solid $lightest;
    padding: $gutter;
}

.thumb {
    width: 80%;
    margin: $gutter*3 auto 0;
}

.count {
    margin: auto;
    span {
        display: inline-block;
        height: .6rem;
        line-height: .6rem;
        width: .6rem;
        text-align: center;
        border: 1px solid $lightest;
        border-right: none;
        &:last-child {
            border-right: 1px solid $lightest;
        }
        &.active {
            border: 1px solid $base;
        }
    }
}
</style>
