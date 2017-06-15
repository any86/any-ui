<template>
    <main class="page-index">
        <LayoutHeader class="header"></LayoutHeader>
        <ScrollView v-model="scrollY" class="scroll-view">
            <LayoutHeadSwiper></LayoutHeadSwiper>
            <LayoutCategoryThumb style="margin-top:.3rem" :dataSource="categoryThumbs"></LayoutCategoryThumb>
            <LayoutLooks style="margin-top:.7rem" :dataSource="looks"></LayoutLooks>
            <LayoutShopInstagram></LayoutShopInstagram>
        </ScrollView>
        <LayoutFooter class="footer"></LayoutFooter>
    </main>
</template>
<script>
import LayoutHeader from './Index/Header'
import LayoutHeadSwiper from './Index/HeadSwiper'
import LayoutCategoryThumb from './Index/CategoryThumb'
import LayoutLooks from './Index/Looks'
import LayoutShopInstagram from './Index/ShopInstagram'
import LayoutFooter from '@/components/Footer'
export default {
    name: 'Index',

    data() {
        return {
            scrollY: 0,
            categoryThumbs: [],
            looks: {},
        };
    },

    mounted() {
        this.$axios.get('./static/index.json').then(response => {
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
        LayoutFooter
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
    display: flex;
    flex-direction: column;
    header {
        height: 1.2rem;
    }
    .scroll-view {
        flex: 1;
        padding: 0 .3rem;
    }
}
</style>
