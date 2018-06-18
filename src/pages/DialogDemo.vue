<template>
    <v-scroll-view class="fill flex">
        <v-dialog :is-show.sync="isShow">
            <v-cell>正常</v-cell>
            <v-cell>困难</v-cell>
            <v-cell>地狱</v-cell>

            <v-button theme="primary"  class="gutter-top">开始游戏</v-button>
            <v-button outline  @click="isShow=false" class="gutter-top">离开</v-button>
        </v-dialog>

        <v-button outline  theme="primary" @click="handle('bottom')" class="gutter-top flex-item--center">
            打开dialog
        </v-button>

    </v-scroll-view>
</template>
<script>
import VDialog from '@/packages/Dialog/Dialog';
import VCell from '@/packages/Cell/Cell';
import VButton from '@/packages/Button/Button';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'DialogDemo',

    data() {
        return {
            isShow: false
        };
    },

    methods: {
        handle(from) {
            this.isShow = true;
        }
    },

    components: {
        VButton,
        VDialog,
        VCell,
        VScrollView
    }
};
</script>
<style scoped lang="scss">

</style>
