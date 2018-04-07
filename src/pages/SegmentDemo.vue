<template>
    <v-scroll-view class="demo-page">
        <v-segment v-model="activeIndex" class="gutter-top">
            <v-segment-item>最热</v-segment-item>
            <v-segment-item>用户评论</v-segment-item>
        </v-segment>
    </v-scroll-view>
</template>
<script>
import VSegment from '@/packages/Segment/Segment';
import VSegmentItem from '@/packages/SegmentItem/SegmentItem';
import VScrollView from '@/packages/ScrollView/ScrollView';
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
        VSegment,
        VSegmentItem,
        VScrollView
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
