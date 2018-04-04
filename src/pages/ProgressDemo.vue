<template>
    <a-scroll-view class="demo-page fill">
        <a-progress-circle v-model="value" style="width:200px;" class="gutter-auto gutter-top" />
        <a-progress-line v-model="value" style="width:200px;" class="gutter-auto gutter-top" />
        <a-input v-model="value" class="fill border gutter-top" />
    </a-scroll-view>
</template>
<script>
import { AScrollView, AProgressLine, AProgressCircle, AInput } from '@/packages'

export default {
    name: 'ProgressDemo',

    data() {
        return {
            value: 0
        };
    },

    methods: {
        clickItem(index) {
            alert(index);
        }
    },

    computed: {},

    components: {
        AScrollView,
        AProgressLine,
        AProgressCircle,
        AInput
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
