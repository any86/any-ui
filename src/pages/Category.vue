<template>
    <main class="page-category">
        <ScrollView v-model="scrollY">
            <LayoutHeader></LayoutHeader>
            <ul>
                <li>
                    <div class="img"></div>
                    <h1>Dress</h1>
                </li>
                <li>
                    <div class="img"></div>
                    <h1>TShirt TShirt TShirt</h1></li>
                <li>
                    <div class="img"></div>
                    <h1>Charms</h1></li>
                <li>
                    <div class="img"></div>
                    <h1>Earrings</h1></li>
            </ul>
        </ScrollView>
    </main>
</template>
<script>
import LayoutHeader from '@/components/Header'

export default {
    name: 'Category',

    data() {
        return {
            scrollY: 0
        }
    },

    methods: {

    },

    components: {
        LayoutHeader,
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-category {
    display: flex;flex-direction:column;position: absolute;top:0;left:0;right: 0;bottom: 0;
    ul {
        flex:1;
        padding: $gutter;
        display: flex;
        flex-wrap: wrap;
        li {
            flex: 0 1 50%;
            height: 2.2rem;
            display: flex;
            overflow: hidden;
            padding: $gutter;
            justify-content: center;
            .img {
                background: $dark;
                width: 100%;
            }
            h1 {
                color: $sub;
                align-self: center;
                text-align: center;
                position: absolute;
                width: 50%;
            }
        }
    }
}
</style>
