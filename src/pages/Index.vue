<template>
    <a-scroll-view ref="main" @touchstart.native="touchstart">
        <a-collapse :is-accordion="true">
            <a-collapse-item class="group">
                <h4 slot="title">指令</h4>
                <div class="group__item" @click="$router.push({'path': '/touch'})">Touch(手势)</div>
            </a-collapse-item>
            
            <a-collapse-item :has-line="false" class="group">
                <h4 slot="title">表单</h4>
                <div  class="group__item" @click="$router.push({'path': '/switch'})">Switch</div>
                <div class="group__item" @click="$router.push({'path': '/radio'})">Radio</div>
                <div class="group__item" @click="$router.push({'path': '/checkbox'})">Checkbox</div>
                <div class="group__item" @click="$router.push({'path': '/count'})">Count</div>
                <div class="group__item" @click="$router.push({'path': '/input'})">Input</div>
                <div class="group__item" @click="$router.push({'path': '/textarea'})">Textarea</div>
                <div class="group__item" @click="$router.push({'path': '/button'})">Button</div>
                <div class="group__item" @click="$router.push({'path': '/buttonGroup'})">ButtonGroup</div>
                <div class="group__item" @click="$router.push({'path': '/range'})">Range</a-badge></div>
                <div class="group__item" @click="$router.push({'path': '/rate'})">Rate</div>
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
                <div class="group__item" @click="$router.push({'path': '/scrollView'})">ScrollView(滚动容器)</div>
                <div class="group__item" @click="$router.push({'path': '/virtualScroller'})">VirtualScroller(虚拟滚动容器)</div>
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
                <div class="group__item" @click="$router.push({'path': '/swipeOut'})">SwipeOut(抽屉)</div>
            </a-collapse-item>

            <a-collapse-item class="group">
                <h4 slot="title">辅助显示</h4>
                <div class="group__item" @click="$router.push({'path': '/badge'})">Badge</div>
                <div class="group__item" @click="$router.push({'path': '/steps'})">Steps</div>
                <div class="group__item" @click="$router.push({'path': '/tag'})">Tag</div>
                <div class="group__item" @click="$router.push({'path': '/breadCrumb'})">Breadcrumb(面包靴)</div>
                <div class="group__item" @click="$router.push({'path': '/icon'})">Icon(图标集)</div>
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

            
            <a-collapse-item title="组合" class="group">
                <div class="group__item" @click="$router.push({'path': '/popupPicker'})">PopupPicker</div>
            </a-collapse-item>

        </a-collapse>
    </a-scroll-view>
</template>
<script>
import Touch2 from '../utils/touch2'
export default {
    name: 'Index',

    data() {
        return {data: 0};
    },

    mounted(){
        new Touch2(document.documentElement);
        // dir(this)

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
