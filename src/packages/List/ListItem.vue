<template>
    <li class="component-list-item">
        <div :class="{body:true, transition: 2 != touche.status}" :style="{transform: 'translateX('+ touche.distance +'px)'}">
            
            <div class="content-bar" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
                <slot></slot>
            </div>
            <!-- 箭头 -->
            <Icon value="angle-right" class="arrow"></Icon>
            <div ref="actionBar" class="action-bar" > 
                <!-- <a class="button-edit">更多</a> -->
                <a @click="remove" class="button-del">删除</a>
            </div>

        </div>
    </li>
</template>
<script>
import Icon from '../Icon/Icon';
export default {
    name: 'ListItem',

    props: {
        actionShow: {
            type: Boolean,
            default: false
        },

        value: {}
    },

    data() {
        return {
            actionBar: {
                width: 0
            },
            touche: {
                status: 0,
                start: 0,
                current: 0,
                distance: 0
            }
        };
    },

    mounted() {
        this.actionBar.width = this.$refs.actionBar.offsetWidth;
    },

    methods: {
        remove(){
            this.$confirm('123').then(()=>{}).catch(()=>{});
        },

        touchStart(e) {
            this.touche.distance = 0;
            this.touche.status = 1;
            this.touche.start = e.touches[0].clientX;
        },

        touchMove(e) {
            this.touche.status = 2;
            this.touche.current = e.touches[0].clientX;
            var distance = (this.touche.current - this.touche.start);
            // 只能从左向右拖拽
            // 并且距离不能大于hidden-bar宽度
            if (0 > distance && 0 - distance <= this.actionBar.width) {
                this.touche.distance = this.touche.current - this.touche.start;
            }
        },

        touchEnd(e) {
            if(0 - this.touche.distance > this.actionBar.width / 2) {
                this.touche.distance = 0 - this.actionBar.width;
            } else {
                this.touche.distance = 0;
            }
            this.touche.status = 0;
        }
    },

    components: {Icon}
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-list-item {
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid $lightest;
    >.body {
        box-sizing: border-box;
        position: relative;
        width: 100%;

        >.content-bar {
            box-sizing: border-box;
            position: relative;
            width: 100%;
        }
        >.action-bar {
            transform:translateX(100%);
            position: absolute;
            top: 0;right:0;
            z-index: 2;
            height: 100%;
            display: flex;
            .button-edit{position: relative;background: $default;color: #fff;height: 100%;display: flex; align-items: center;width: 100%;padding:0 3*$gutter;font-size: 14px;letter-spacing: 1px;}
            .button-del{position: relative;background: $danger;color: #fff;height: 100%;display: flex; align-items: center;width: 100%;padding:0 3*$gutter;font-size: 14px;letter-spacing: 1px;}
        }
    }
}

.arrow{font-size:3em;display: inline-block;}

.transition {
    transition: all .2s ease;
}
</style>
