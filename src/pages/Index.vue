<template>
    <a-scroll-view ref="main" @touchstart.native="touchstart">
        <a-collapse :is-accordion="true">
            <a-collapse-item :has-line="false" class="group">
                <h4 slot="header"><a-badge value="2">表单</a-badge></h4>
                <div  class="group__item" @click="$router.push({'path': '/switch'})">Switch</div>
                <div class="group__item" @click="$router.push({'path': '/radio'})">Radio</div>
                <div class="group__item" @click="$router.push({'path': '/checkbox'})">Checkbox</div>
                <div class="group__item" @click="$router.push({'path': '/count'})">Count</div>
                <div class="group__item" @click="$router.push({'path': '/input'})">Input</div>
                <div class="group__item" @click="$router.push({'path': '/textarea'})">Textarea</div>
                <div class="group__item" @click="$router.push({'path': '/button'})">Button</div>
                <div class="group__item" @click="$router.push({'path': '/button-group'})">ButtonGroup</div>
                <div class="group__item" @click="$router.push({'path': '/range'})">Range<a-badge value="new"></a-badge></div>
                <div class="group__item" @click="$router.push({'path': '/rate'})">Rate<a-badge value="new"></a-badge></div>
                <div class="group__item" @click="$router.push({'path': '/picker'})">Picker</div>
            </a-collapse-item>

            <a-collapse-item title="对话框" class="group">
                <div class="group__item" @click="$router.push({'path': '/alert'})">Alert</div>
                <div class="group__item" @click="$router.push({'path': '/confirm'})">Confirm</div>
                <div class="group__item" @click="$router.push({'path': '/prompt'})">Prompt</div>
                <div class="group__item" @click="$router.push({'path': '/popup'})">Popup</div>
                <div class="group__item" @click="$router.push({'path': '/dialog'})">Dialog</div>
                <div class="group__item" @click="$router.push({'path': '/mask'})">Mask</div>
            </a-collapse-item>

            <a-collapse-item title="滚动" class="group">
                <div class="group__item" @click="$router.push({'path': '/affix'})">Affix(滚动固定)</div>
                <div class="group__item" @click="$router.push({'path': '/lazyLoad'})">Lazyload(懒加载)</div>
                <div class="group__item" @click="$router.push({'path': '/scroll-view'})">ScrollView(滚动容器)</div>
                <div class="group__item" @click="$router.push({'path': '/virtual-scroller'})">VirtualScroller(虚拟滚动容器)</div>
            </a-collapse-item>

            <a-collapse-item title="布局" class="group">
                <div class="group__item" @click="$router.push({'path': '/cell'})">Cell</div>
                <div class="group__item" @click="$router.push({'path': '/group'})">Group</div>
            </a-collapse-item>

            <a-collapse-item title="切换" class="group">
                <div class="group__item" @click="$router.push({'path': '/drawer'})">Draw(抽屉)</div>
                <div class="group__item" @click="$router.push({'path': '/tabs'})">Tabs(选项卡)</div>
                <div class="group__item" @click="$router.push({'path': '/collapse'})">Collapse(折叠)</div>
                <div class="group__item" @click="$router.push({'path': '/carousel'})">Carousel(轮播)</div>
                <div class="group__item" @click="$router.push({'path': '/segment'})">Segment(分段)</div>
                <div class="group__item" @click="$router.push({'path': '/swipe-out'})">SwipeOut(分段)</div>
            </a-collapse-item>

            <a-collapse-item class="group">
                <h4 slot="header"><a-badge value="1">辅助显示</a-badge></h4>
                <div class="group__item" @click="$router.push({'path': '/badge'})">Badge</div>
                <div class="group__item" @click="$router.push({'path': '/steps'})">Steps</div>
                <div class="group__item" @click="$router.push({'path': '/tag'})">Tag</div>
                <div class="group__item" @click="$router.push({'path': '/bread-crumb'})">Breadcrumb(面包靴)</div>
                <div class="group__item" @click="$router.push({'path': '/icon'})">Icon(图表集)<a-badge value="new"></a-badge></div>
                <div class="group__item" @click="$router.push({'path': '/qrcode'})">QRCode(二维码)</div>
            </a-collapse-item>

            <a-collapse-item title="等待" class="group">
                <div class="group__item" @click="$router.push({'path': '/spinner'})">Spinner</div>
                <div class="group__item" @click="$router.push({'path': '/progress'})">Progess</div>
            </a-collapse-item>

            <a-collapse-item title="轻提示" class="group">
                <div class="group__item" @click="$router.push({'path': '/toast'})">Toast</div>
                <div class="group__item" @click="$router.push({'path': '/popper'})">Popper</div>
            </a-collapse-item>

            <a-collapse-item title="手势" class="group">
                <div class="group__item" @click="$router.push({'path': '/finger'})">Finger</div>
            </a-collapse-item>
            
            <a-collapse-item title="组合" class="group">
                <div class="group__item" @click="$router.push({'path': '/popup-picker'})">PopupPicker</div>
            </a-collapse-item>

        </a-collapse>
    </a-scroll-view>
</template>
<script>
import Finger from '../utils/finger';
export default {
    name: 'Index',

    data() {
        return {data: 0};
    },

    mounted(){
        setTimeout(()=>{
            this.data = 100;
        }, 1000)
    },

    methods: {
        touchstart(e) {
            // log(e)
        }
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.group {
    &__item {
        height: 55px;
        line-height: 55px;
        border-bottom: 1px solid $lightest;
        &:last-child {
            border-bottom: none;
        }
    }
}

.f-bottom {
    margin-top: 15px;
    margin-left: 100px;
}
</style>
