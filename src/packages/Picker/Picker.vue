<template>
    <div class="component-picker">
        <div class="graticule" :style="{height: `${itemHeight}px`}"></div>
        <ul v-for="(list, i) in dataSource" @touchstart="touchstart(i, $event)" @touchmove="touchmove(i, $event)" @touchend="touchend(i, $event)" :style="{paddingTop: `${itemHeight*3}px`, height: `${itemHeight*7}px`, transform: 'translate3d(0,' + touchStatusList[i].translateYNew + 'px,0)'}" :class="{transition: 0 == touchStatusList[i].status}">
            <li v-for="item in list" :class="{active: item.value == newValue[i]}" :style="{height: `${itemHeight}px`}">{{item.label}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Picker',

    props: {
        dataSource: {
            type: Array,
            required: true
        },

        value: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            active: {}, // 当前拖拽列表
            itemHeight: 36,
            touchStatusList: [],
            newValue: []
        };
    },

    created() {
        // 构造列表结构
        this.dataSource.forEach(() => {
            this.touchStatusList.push({
                value: 0,
                status: 0,
                translateYOld: 0,
                translateYNew: 0,
                start: 0,
                current: 0,
                distance: 0
            });
        });
    },

    mounted() {
        this._syncPosition();
    },

    methods: {
        /**
         * 滚动UI到默认值位置
         */
        _syncPosition() {
            this.value.forEach((value, index) => {
                // 寻找当前值在所在列中的索引
                var i = this.dataSource[index].findIndex(item => {
                    return item.value == value;
                });

                // 如果默认值没有被传递或者为null, 那么默认选取第一项
                if (-1 == i) {
                    i = 0;
                }
                this.newValue[index] = this.dataSource[index][i].value;
                // 移动选项到适合位置
                this.touchStatusList[index].translateYNew = 0 - i * this.itemHeight;
                this.touchStatusList[index].translateYOld = this.touchStatusList[index].translateYNew;
            });
        },

        /**
         * 开始拖拽
         * @param  {Number} index 当前列表索引
         * @param  {Object} e     event
         */
        touchstart(index, e) {
            // 标记当前
            this.active = this.touchStatusList[index];
            // 开始拖拽
            this.active.status = 0;
            this.active.start = e.touches[0].clientY;
        },

        /**
         * 拖拽中
         * @param  {Number} index 当前列表索引
         * @param  {Object} e     event
         */
        touchmove(index, e) {
            // 拖拽中
            this.active.status = 1;
            this.active.current = e.touches[0].clientY;
            this.active.distance = this.active.current - this.active.start;
            this.active.translateYNew = this.active.translateYOld + this.active.distance;
            e.preventDefault();
            e.stopPropagation();
        },

        /**
         * 手指离开屏幕
         * @param  {Number} index 当前列表索引
         * @param  {Object} e     event
         */
        touchend(index, e) {
            var listLength = this.dataSource[index].length;
            this.active.status = 0;

            // 边界 向上/向下
            if (0 < this.active.translateYNew) {
                this.active.translateYNew = 0;
            } else if (0 - this.itemHeight * (listLength - 1) > this.active.translateYNew) {
                this.active.translateYNew = 0 - this.itemHeight * (listLength - 1)
            }

            // 对准(四舍五入)
            // 确定value
            var itemIndex = Math.round((0 - this.active.translateYNew) / this.itemHeight);
            this.active.value = this.dataSource[index][itemIndex].value;
            this.active.translateYNew = 0 - itemIndex * this.itemHeight;

            //同步当前位置
            this.active.translateYOld = this.active.translateYNew;

            this.newValue = this.value.map((item, i) => {
                return i == index ? this.active.value : item;
            });

            this.$emit('change', {
                index,
                value: this.active.value
            });

            this.$emit('input', this.newValue);
        }
    },

    watch: {
        value() {
            // 初始化默认值
            this._syncPosition();
        },

        dataSource() {
            // 初始化默认值
            this._syncPosition();
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$itemHeight: 7 * $gutter;
.component-picker {
    position: relative;
    overflow: hidden;
    display: flex;
    overflow: hidden; // height: 7 * $itemHeight;
    .graticule {
        // height: $itemHeight;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        box-shadow: $shadowUp, $shadowDown;
    }
    ul {
        flex: 1;
        box-sizing: border-box; // padding: 3 * $itemHeight 0;
        li {
            box-sizing: border-box;
            width: 100%;
            height: $itemHeight;
            line-height: $itemHeight;
            display: block;
            text-align: center;
            font-size: $big;
            color: $dark;
            &.active {
                color: $darkest;
            }
        }
        &.transition {
            transition: all .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
    }
}
</style>
