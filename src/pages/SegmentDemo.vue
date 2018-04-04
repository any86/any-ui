<template>
    <a-scroll-view class="demo-page">
        <a-segment v-model="activeIndex" class="gutter-top">
            <a-segment-item>最热</a-segment-item>
            <a-segment-item>用户评论</a-segment-item>
        </a-segment>
    </a-scroll-view>
</template>
<script>
import { AScrollView, ASegment, ASegmentItem } from '@/packages'

export default {
    name: 'FingerDemo',

    data() {
        return {
            activeIndex: 0
        };
    },

    methods: {
    },

    computed: {
       
    },

    components: {
        AScrollView,
        ASegment,
        ASegmentItem
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
