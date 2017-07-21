<template>
    <main v-if="1 == status" class="page-index">
        <LayoutHeader class="header"></LayoutHeader>
        <ScrollView v-model="scrollY" class="scroll-view">
            <LayoutHeadSwiper></LayoutHeadSwiper>
            <LayoutCategoryThumb style="margin-top:.3rem" :dataSource="categoryThumbs" :scrollY="scrollY"></LayoutCategoryThumb>
            <LayoutLooks style="margin-top:.7rem" :dataSource="looks"></LayoutLooks>
            <LayoutShopInstagram></LayoutShopInstagram>
        </ScrollView>
    </main>
</template>
<script>
import LayoutHeader from './Index/Header'
import LayoutHeadSwiper from './Index/HeadSwiper'
import LayoutCategoryThumb from './Index/CategoryThumb'
import LayoutLooks from './Index/Looks'
import LayoutShopInstagram from './Index/ShopInstagram'
export default {
    name: 'Index',

    data() {
        return {
            status: -1,
            scrollY: 0,
            categoryThumbs: [],
            looks: {},
        };
    },

    mounted() {
        this.$axios.get('./static/index.json').then(response => {
            this.status = 1;

            this.categoryThumbs = {
                ...this.categoryThumbs,
                ...response.data['category-thumbs']
            };

            this.looks = {
                ...this.looks,
                ...response.data['looks']
            };
        });
    },

    methods: {
        showSideBar() {
            this.$store.commit(types.SHOW_SIDE_BAR);
        }
    },

    watch: {
        scrollY(newValue, oldValue) {
            this.isShowHeader = newValue < oldValue;
        }
    },

    components: {
        LayoutHeader,
        LayoutHeadSwiper,
        LayoutCategoryThumb,
        LayoutLooks,
        LayoutShopInstagram,

    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-index {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // position: relative;
    // height: 100%;
    // width: 100%;
    display: flex;
    flex-direction: column;

    .scroll-view {
        flex: 1;
        padding: 0 .3rem .3rem .3rem;
    }
}
</style>
