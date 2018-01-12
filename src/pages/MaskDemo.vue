<template>
    <v-scroll-view class="fill flex">
        <v-mask :is-show.sync="isShow">
            <div style="margin-top:90%;" class="fill">
                <p class="text-lightest">轻轻的我走了，正如我轻轻的来； 我轻轻的招手，作别西天的云彩。</p>
                <v-button type="lightest" :is-ghost="true" :is-block="true" @click="isShow=false" class="gutter-top">离开</v-button>
            </div>
        </v-mask>

        <v-button :is-ghost="true" type="primary" @click="handle('bottom')" class="gutter-top flex-item--center">
            打开mask
        </v-button>

    </v-scroll-view>
</template>
<script>
import VMask from '@/packages/Mask/Mask';
import VCell from '@/packages/Cell/Cell';
import VButton from '@/packages/Button/Button';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'MaskDemo',

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
        VMask,
        VCell,
        VScrollView
    }
};
</script>
<style scoped lang="scss">

</style>
