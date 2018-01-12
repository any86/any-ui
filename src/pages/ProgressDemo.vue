<template>
    <v-scroll-view class="demo-page fill">
        <v-progress-circle v-model="value" style="width:200px;" class="gutter-auto gutter-top" />
        <v-progress-line v-model="value" style="width:200px;" class="gutter-auto gutter-top" />
        <v-input v-model="value" class="fill border gutter-top" />
    </v-scroll-view>
</template>
<script>
import VInput from '@/packages/Input/Input';
import VProgressCircle from '@/packages/Progress/Circle';
import VProgressLine from '@/packages/Progress/Line';
import VScrollView from '@/packages/ScrollView/ScrollView';
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
        VInput,
        VProgressCircle,
        VProgressLine,
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
