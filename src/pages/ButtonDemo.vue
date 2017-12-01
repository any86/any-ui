<template>
    <v-scroll-view class="fill">
        <v-button type="primary" class="gutter-sm">primary</v-button>
        <v-button type="success" class="gutter-sm">success</v-button>
        <v-button type="info" class="gutter-sm">info</v-button>
        <v-button type="warning" class="gutter-sm">warning</v-button>
        <v-button type="danger" class="gutter-sm">danger</v-button>
        <v-button type="dark" class="gutter-sm">darkest</v-button>
        <v-button type="dark" class="gutter-sm">darker</v-button>
        <v-button type="dark" class="gutter-sm">dark</v-button>
        <v-button type="light" class="gutter-sm">light</v-button>
        <v-button type="light" class="gutter-sm">lighter</v-button>
        <v-button type="light" class="gutter-sm">lightest</v-button>
    </v-scroll-view>
</template>
<script>
import VScrollView from '@/packages/ScrollView/ScrollView';
import VCell from '@/packages/Cell/Cell';
import VButton from '@/packages/Button/Button';
import VSwitch from '@/packages/Switch/Switch';

export default {
    name: 'ButtonDemo',

    data() {
        return {
            value1: 10,
            value2: 1,
            value3: 1
        };
    },

    mounted() {},

    components: {
        VScrollView,
        VButton,
        VSwitch,
        VCell
    }
};
</script>
<style scope lang="scss">
@import '../scss/theme.scss';
.item {
    padding: $gutter;
    border: 1px solid $lightest;
}
</style>
