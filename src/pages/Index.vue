<template>
    <v-scroll-view>
        <v-collapse :is-accordion="false">
            <v-collapse-item>
                <h4 slot="header">表单</h4>
                <v-cell @click="$router.push({'path': '/demos/switch'})">Switch</v-cell>
                <v-cell @click="$router.push({'path': '/demos/radio'})">Radio</v-cell>
                <v-cell @click="$router.push({'path': '/demos/checkbox'})">Checkbox</v-cell>
                <v-cell @click="$router.push({'path': '/demos/count'})">Count</v-cell>
                <v-cell @click="$router.push({'path': '/demos/input'})">Input</v-cell>
                <v-cell @click="$router.push({'path': '/demos/textarea'})">Textarea</v-cell>
                <v-cell @click="$router.push({'path': '/demos/button'})">Button</v-cell>
                <v-cell @click="$router.push({'path': '/demos/button-group'})">ButtonGroup</v-cell>
                <v-cell @click="$router.push({'path': '/demos/range'})">Range</v-cell>
                <v-cell @click="$router.push({'path': '/demos/picker'})">Picker</v-cell>
            </v-collapse-item>

            <v-collapse-item title="对话框">
                <v-cell @click="$router.push({'path': '/demos/alert'})">Alert</v-cell>
                <v-cell @click="$router.push({'path': '/demos/confirm'})">Confirm</v-cell>
                <v-cell @click="$router.push({'path': '/demos/prompt'})">Prompt</v-cell>
                <v-cell @click="$router.push({'path': '/demos/popup'})">Popup</v-cell>
                <v-cell @click="$router.push({'path': '/demos/dialog'})">Dialog</v-cell>
                <v-cell @click="$router.push({'path': '/demos/mask'})">Mask</v-cell>
            </v-collapse-item>

            <v-collapse-item title="容器">
                <v-cell @click="$router.push({'path': '/demos/scroll-view'})">ScrollView</v-cell>
                <v-cell @click="$router.push({'path': '/demos/virtual-scroller'})">VirtualScroller</v-cell>
                <v-cell @click="$router.push({'path': '/demos/draw'})">Draw</v-cell>
            </v-collapse-item>

            <v-collapse-item title="布局">
                <v-cell @click="$router.push({'path': '/demos/cell'})">Cell</v-cell>
                <v-cell @click="$router.push({'path': '/demos/group'})">Group</v-cell>
                <v-cell @click="$router.push({'path': '/demos/affix'})">Affix</v-cell>
            </v-collapse-item>

            <v-collapse-item title="切换">
                <v-cell @click="$router.push({'path': '/demos/tabs'})">Tabs</v-cell>
                <v-cell @click="$router.push({'path': '/demos/collapse'})">Collapse</v-cell>
                <v-cell @click="$router.push({'path': '/demos/carousel'})">Carousel</v-cell>
                <v-cell @click="$router.push({'path': '/demos/segment'})">Segment</v-cell>
            </v-collapse-item>

            <v-collapse-item title="辅助显示">
                <v-cell @click="$router.push({'path': '/demos/badge'})">Badge</v-cell>
                <v-cell @click="$router.push({'path': '/demos/Steps'})">Steps</v-cell>
                <v-cell @click="$router.push({'path': '/demos/Tag'})">Tag</v-cell>
                <v-cell @click="$router.push({'path': '/demos/Breadcrumb'})">Breadcrumb</v-cell>
            </v-collapse-item>

            <v-collapse-item title="等待">
                <v-cell @click="$router.push({'path': '/demos/badge'})">Spinner</v-cell>
                <v-cell @click="$router.push({'path': '/demos/Steps'})">Steps</v-cell>
                <v-cell @click="$router.push({'path': '/demos/Tag'})">Tag</v-cell>
                <v-cell @click="$router.push({'path': '/demos/Progess'})">Progess</v-cell>
                <v-cell @click="$router.push({'path': '/demos/Countdown'})">Countdown</v-cell>
            </v-collapse-item>

            <v-collapse-item title="轻提示">
                <v-cell @click="$router.push({'path': '/demos/Toast'})">Toast</v-cell>
                <v-cell @click="$router.push({'path': '/demos/Popper'})">Popper</v-cell>
            </v-collapse-item>

            <v-collapse-item title="二维码">
                <v-cell @click="$router.push({'path': '/demos/QRCode'})">QRCode</v-cell>
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
        return {};
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
