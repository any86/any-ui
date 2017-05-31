<template>
    <ScrollView class="page-index">
        <Spinner slot="background"></Spinner>
        <!-- 轮播 -->
        <Swiper v-model="swiperValue" :loop="true">
            <SwiperItem>
                <div style="width:100%;height: 4rem;background:#ddd;font-size: 1rem;line-height: 4rem;text-align: center;">
                    1
                </div>
            </SwiperItem>
            <SwiperItem>
                <div style="width:100%;height: 4rem;background:#ccc;font-size: 1rem;line-height: 4rem;text-align: center;">2</div>
            </SwiperItem>
            <SwiperItem>
                <div style="width:100%;height: 4rem;background:#bbb;font-size: 1rem;line-height: 4rem;text-align: center;">3</div>
            </SwiperItem>
            <SwiperItem>
                <div style="width:100%;height: 4rem;background:#69c;font-size: 1rem;line-height: 4rem;text-align: center;">4</div>
            </SwiperItem>
        </Swiper>


        <VButton @click="click" style="margin: 100px 0;" type="ghost">确定</VButton>

    </ScrollView>
</template>
<script>
import Tabs from '@/packages/Tabs/Tabs';
import TabsItem from '@/packages/Tabs/TabsItem';
import Swiper from '@/packages/Swiper/Swiper'
import SwiperItem from '@/packages/Swiper/SwiperItem'
import Badge from '@/packages/Badge/Badge'
import VButton from '@/packages/Button/Button'


export default {
    name: 'Index',

    data() {
        return {
            swiperValue: 0,
            tabSelect: 0,
            titles: ['tab1', 'tab2', 'tab3', 'tab4'],
            acitve: 0
        };
    },

    methods: {
        click(){
            this.$input().then(value=>{
                alert(value);
            }).catch((e)=>{
                alert(e)
            });
        }
    },

    components: {
        Tabs,
        TabsItem,
        Badge,
        Swiper,
        SwiperItem,VButton
    }
}
</script>
<style scoped lang="scss">
.page-index {
    box-sizing: border-box;
    padding:0 15px;

}
</style>
