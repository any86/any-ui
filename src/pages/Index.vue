<template>
    <v-scroll-view>
        <v-button type="success" style="width:200px;" :is-circle="true" class="f-bottom">按钮</v-button>
        <v-collapse :is-accordion="false">
            <v-collapse-item>
                <h4 slot="header">表单</h4>
                <v-cell @click="$router.push({'path': '/demos/input'})">Input</v-cell>
                <v-cell @click="$router.push({'path': '/demos/textarea'})">Textarea</v-cell>
                <v-cell @click="$router.push({'path': '/demos/switch'})">Switch</v-cell>
                <v-cell @click="$router.push({'path': '/demos/radio'})">Radio</v-cell>
                <v-cell @click="$router.push({'path': '/demos/checkbox'})">Checkbox</v-cell>
                <v-cell @click="$router.push({'path': '/demos/picker'})">Picker</v-cell>
                <v-cell @click="$router.push({'path': '/demos/count'})">Count</v-cell>
                <v-cell @click="$router.push({'path': '/demos/button'})">Button</v-cell>
            </v-collapse-item>

            <v-collapse-item title="对话框">
                <v-cell>Alert</v-cell>
                <v-cell>Confirm</v-cell>
                <v-cell>Confirm</v-cell>
                <v-cell>Popup</v-cell>
                <v-cell>Dialog</v-cell>
                <v-cell>Mask</v-cell>
            </v-collapse-item>

            <v-collapse-item title="容器">
                <v-cell>InfiniteScroll</v-cell>
                <v-cell>VirtualScroller</v-cell>
                <v-cell @click="$router.push({'path': '/demos/collapse'})">Collapse</v-cell>
            </v-collapse-item>

        </v-collapse>
    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VButton from '@/packages/Button/Button';
import VCollapse from '@/packages/Collapse/Collapse';
import VCollapseItem from '@/packages/Collapse/CollapseItem';
import VScrollView from '@/packages/ScrollView/ScrollView';

export default {
    name: 'Index',

    data() {
        return {
        };
    },

    created() {},

    mounted() {},

    methods: {},

    components: {
        VCell,
        VButton,
        VScrollView,
        VCollapse,
        VCollapseItem
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.f-bottom {
    margin-top: 15px;
    margin-left: 100px;
}
</style>
