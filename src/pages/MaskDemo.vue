<template>
    <a-scroll-view class="fill flex">
        <a-mask :is-show.sync="isShow">
            <div style="margin-top:90%;" class="fill">
                <p class="text-lightest">轻轻的我走了，正如我轻轻的来； 我轻轻的招手，作别西天的云彩。</p>
                <a-button type="lightest" outline @click="isShow=false" class="gutter-top">离开</a-button>
            </div>
        </a-mask>

        <a-button outline @click="handle('bottom')" class="gutter-top flex-item--center">
            打开mask
        </a-button>

    </a-scroll-view>
</template>
<script>
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
    }
};
</script>
<style scoped lang="scss">
</style>
