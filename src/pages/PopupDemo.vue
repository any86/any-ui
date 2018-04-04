<template>
    <a-scroll-view class="fill">
        <a-popup :is-show.sync="isShow" :from="from">
            <a-cell>正常</a-cell>
            <a-cell>困难</a-cell>
            <a-cell>地狱</a-cell>

            <div class="fill">
                <a-button type="primary" :is-block="true">开始游戏</a-button>

                <a-button :is-ghost="true" :is-block="true" @click="isShow=false" class="gutter-top">离开</a-button>
            </div>

        </a-popup>

        <a-button :is-ghost="true" :is-block="true" @click="handle('bottom')" class="gutter-top">
            从下方打开
        </a-button>

        <a-button :is-ghost="true" :is-block="true" @click="handle('top')" class="gutter-top">
            从上方打开
        </a-button>


        <a-button :is-ghost="true" :is-block="true" @click="handle('left')" class="gutter-top">
            从左侧打开
        </a-button>

        <a-button :is-ghost="true" :is-block="true" @click="handle('right')" class="gutter-top">
            从右侧打开
        </a-button>

    </a-scroll-view>
</template>
<script>
import { AScrollView, AButton, ACell, APopup } from '@/packages'

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
        AScrollView,
        AButton,
        ACell,
        APopup
    }
};
</script>
<style scoped lang="scss">

</style>
