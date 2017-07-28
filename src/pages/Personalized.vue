<template>
    <ScrollView v-model="scrollY" class="page-personalized">
        <LayoutHeader></LayoutHeader>
        <div class="grid">
            <div v-for="n in 20" class="item">
                <img src="http://jer.soufeel.org/media/catalog/product/F/J/FJ1148.png">
                <h4>{{n}} soufeel catalog media catalog media catalog media</h4>
            </div>
        </div>
    </ScrollView>
</template>
<script>
// 模块
import LayoutHeader from './Personalized/Header'

export default {
    name: 'Personalized',

    data() {
        return {
            scrollY: 0
        }
    },

    mounted() {

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
.page-personalized {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; // padding-bottom: 3*$gutter;
    .grid {
        display: flex;
        flex-wrap: wrap;
        .item {
            // height: 2.8rem;
            flex: 0 0 33.33%;
            border-style: solid;
            border-color: $lightest;
            border-width: 0;
            border-right-width: 1px;
            border-bottom-width: 1px;
            &:nth-child(3n) {
                border-right-width: 0;
            }
            >img {
                display: block;
                width: 100%;
                height: 2rem;
                overflow: hidden;
            }
            >h4 {
                font-weight: 400;

                text-align: center;
                margin: .2rem auto;
                height: 0.8rem;
                padding: 0 .2rem;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>
