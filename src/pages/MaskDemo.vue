<template>
    <a-scroll-view class="fill flex">
        <a-mask :is-show.sync="isShow">
            <div style="margin-top:90%;" class="fill">
                <p class="text-lightest">轻轻的我走了，正如我轻轻的来； 我轻轻的招手，作别西天的云彩。</p>
                <a-button type="lightest" :is-ghost="true" :is-block="true" @click="isShow=false" class="gutter-top">离开</a-button>
            </div>
        </a-mask>

        <a-button :is-ghost="true" type="primary" @click="handle('bottom')" class="gutter-top flex-item--center">
            打开mask
        </a-button>
    </a-scroll-view>
</template>
<script>
import { AButton, AScrollView, ACell, AMask } from '@/packages'

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
        AButton,
        AScrollView,
        ACell,
        AMask
    }
};
</script>
