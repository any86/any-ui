<template>
    <v-scroll-view>
        <div v-show="isShow">
            <!-- <v-cell>InputDem</v-cell> -->
            <div class="zoom-enter-active">11112222233333</div>
        </div>
    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VInput from '@/packages/Input/Input';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'InputDemo',

    data() {
        return {
            isShow: false,
            value: 'hello vue !'
        };
    },

    mounted(){
        // setInterval(()=>{
        //     this.isShow = !this.isShow;
        // },  600);
    },

    methods: {},

    components: {
        VInput,VCell,
        VScrollView
    }
};
</script>
<style scoped lang="scss">

</style>
