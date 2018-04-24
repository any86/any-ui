<template>
    <v-scroll-view class="fill">
        <v-popup :is-show.sync="isShow" :from="from">
            <v-cell>正常</v-cell>
            <v-cell>困难</v-cell>
            <v-cell>地狱</v-cell>

            <div class="fill">
                <v-button type="primary" :is-block="true">开始游戏</v-button>

                <v-button :is-ghost="true" :is-block="true" @click="isShow=false" class="gutter-top">离开</v-button>
            </div>
        </v-popup>

        <v-button :is-ghost="true" :is-block="true" @click="handle('bottom')" class="gutter-top">
            从下方打开
        </v-button>

        <v-button :is-ghost="true" :is-block="true" @click="handle('top')" class="gutter-top">
            从上方打开
        </v-button>


        <v-button :is-ghost="true" :is-block="true" @click="handle('left')" class="gutter-top">
            从左侧打开
        </v-button>

        <v-button :is-ghost="true" :is-block="true" @click="handle('right')" class="gutter-top">
            从右侧打开
        </v-button>

    </v-scroll-view>
</template>
<script>
import VPopup from '@/packages/Popup/Popup';
import VCell from '@/packages/Cell/Cell';
import VButton from '@/packages/Button/Button';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'PopupDemo',

    data() {
        return {
            from: 'top',
            isShow: false
        };
    },

    methods: {
        handle(from){
            this.from = from;
            this.isShow = true;
        }
    },

    components: {
        VButton,
        VPopup,
        VCell,
        VScrollView
    }
};
</script>
<style scoped lang="scss">

</style>
