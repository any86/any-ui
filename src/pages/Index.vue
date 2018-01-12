<template>
    <v-scroll-view ref="main" @touchstart.native="touchstart">
        <v-collapse :is-accordion="true">
            <v-collapse-item class="group">
                <h4 slot="header">表单</h4>
                <div class="group__item" @click="$router.push({'path': '/demos/switch'})">Switch</div>
                <div class="group__item" @click="$router.push({'path': '/demos/radio'})">Radio</div>
                <div class="group__item" @click="$router.push({'path': '/demos/checkbox'})">Checkbox</div>
                <div class="group__item" @click="$router.push({'path': '/demos/count'})">Count</div>
                <div class="group__item" @click="$router.push({'path': '/demos/input'})">Input</div>
                <div class="group__item" @click="$router.push({'path': '/demos/textarea'})">Textarea</div>
                <div class="group__item" @click="$router.push({'path': '/demos/button'})">Button</div>
                <div class="group__item" @click="$router.push({'path': '/demos/button-group'})">ButtonGroup</div>
                <div class="group__item" @click="$router.push({'path': '/demos/range'})">Range</div>
                <div class="group__item" @click="$router.push({'path': '/demos/picker'})">Picker</div>
            </v-collapse-item>

            <v-collapse-item title="对话框" class="group">
                <div class="group__item" @click="$router.push({'path': '/demos/alert'})">Alert</div>
                <div class="group__item" @click="$router.push({'path': '/demos/confirm'})">Confirm</div>
                <div class="group__item" @click="$router.push({'path': '/demos/prompt'})">Prompt</div>
                <div class="group__item" @click="$router.push({'path': '/demos/popup'})">Popup</div>
                <div class="group__item" @click="$router.push({'path': '/demos/dialog'})">Dialog</div>
                <div class="group__item" @click="$router.push({'path': '/demos/mask'})">Mask</div>
            </v-collapse-item>

            <v-collapse-item title="容器" class="group">
                <div class="group__item" @click="$router.push({'path': '/demos/scroll-view'})">ScrollView</div>
                <div class="group__item" @click="$router.push({'path': '/demos/virtual-scroller'})">VirtualScroller</div>
                <div class="group__item" @click="$router.push({'path': '/demos/draw'})">Draw</div>
            </v-collapse-item>

            <v-collapse-item title="布局" class="group">
                <div class="group__item" @click="$router.push({'path': '/demos/cell'})">Cell</div>
                <div class="group__item" @click="$router.push({'path': '/demos/group'})">Group</div>
            </v-collapse-item>

            <v-collapse-item title="定位" class="group">
                <div class="group__item" @click="$router.push({'path': '/demos/affix'})">Affix</div>
            </v-collapse-item>

            <v-collapse-item title="切换" class="group">
                <div class="group__item" @click="$router.push({'path': '/demos/tabs'})">Tabs</div>
                <div class="group__item" @click="$router.push({'path': '/demos/collapse'})">Collapse</div>
                <div class="group__item" @click="$router.push({'path': '/demos/carousel'})">Carousel</div>
                <div class="group__item" @click="$router.push({'path': '/demos/segment'})">Segment</div>
            </v-collapse-item>

            <v-collapse-item title="辅助显示" class="group">
                <div class="group__item" @click="$router.push({'path': '/demos/badge'})">Badge</div>
                <div class="group__item" @click="$router.push({'path': '/demos/Steps'})">Steps</div>
                <div class="group__item" @click="$router.push({'path': '/demos/Tag'})">Tag</div>
                <div class="group__item" @click="$router.push({'path': '/demos/Breadcrumb'})">Breadcrumb</div>
            </v-collapse-item>

            <v-collapse-item title="等待" class="group">
                <div class="group__item" @click="$router.push({'path': '/demos/spinner'})">Spinner</div>
                <div class="group__item" @click="$router.push({'path': '/demos/progress'})">Progess</div>
            </v-collapse-item>

            <v-collapse-item title="轻提示" class="group">
                <div class="group__item" @click="$router.push({'path': '/demos/toast'})">Toast</div>
                <div class="group__item" @click="$router.push({'path': '/demos/popper'})">Popper</div>
            </v-collapse-item>

            <v-collapse-item title="二维码" class="group">
                <div class="group__item" @click="$router.push({'path': '/demos/qr-code'})">QRCode</div>
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
import Finger from '../utils/finger'
export default {
    name: 'Index',

    data() {
        return {};
    },

    created() {},

    mounted() {
        // const finger = new Finger(this.$refs.main.$el);
        // finger.on('rotate', angel=>{
        //     log(angel);
        // });
    },

    methods: {
        touchstart(e){
            // log(e)
        }
    },

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
@import '../scss/variables.scss';
.group{
    &__item{
        height:55px;line-height: 55px; border-bottom: 1px solid $lightest;
        &:last-child{
            border-bottom: none;
        }
    }
}


.f-bottom {
    margin-top: 15px;
    margin-left: 100px;
}
</style>
