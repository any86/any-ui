<template>
    <div :style="{height: `${itemHeight * 7}px`}" class="atom-picker">
        <div class="atom-picker__graticule" :style="{height: `${itemHeight}px`}"></div>
        <v-scroller :minMoveRatio="1" v-model="positions[i]" v-for="(list, i) in dataSource" :key="i" @scroll-leave="scrollLeave(i, $event)" :is-lock-x="true" :is-lock-y="false" :is-bind-body="true" :prevent-default="true" :max-holder-time="50" @scroll-buffer="isMoving = $event" :body-style="bodyStyle" class="atom-picker__list">
            <div v-for="(item, j) in list" :key="j" :style="{height: `${itemHeight}px`, lineHeight: `${itemHeight}px`}" :class="{active: j == activeIndexList[i]}" class="list__item">
                {{item.label}}
            </div>
        </v-scroller>
    </div>
</template>
<script>
import VScroller from '@/packages/VirtualScroller/VirtualScroller';
export default {
    name: 'Picker',

    props: {
        dataSource: {
            type: Array, // [[{label, value}]]
            required: true
        },

        value: {
            type: Array, // [v1, v2]
            required: true
        },

        itemHeight: {
            type: Number,
            default: 36
        }
    },

    data() {
        return {
            positions: [],
            isMoving: false,
            bodyStyle: {
                paddingTop: 3 * this.itemHeight + 'px',
                paddingBottom: 3 * this.itemHeight + 'px'
            }
        };
    },

    created() {
        this._syncPositionition();
    },

    methods: {
        /**
        * @param {Number} 列表索引
        * @param {Object} 滚动条距离数据
        */
        scrollLeave(columnIndex, e) {
            // 选项index
            const index = Math.round(e.scrollTop / this.itemHeight);
            const absIndex = Math.abs(index);
            // 当前列scrollTop
            this.positions[columnIndex].scrollTop = index * this.itemHeight;
            const activeItem = this.dataSource[columnIndex][absIndex];
            const _value = [...this.value];
            _value.splice(columnIndex, 1, activeItem.value);
            // 同步value
            this.$emit('input', _value);
            // 携带更详细的信息
            this.$emit('change', {
                columnIndex,
                rowIndex: absIndex,
                ...activeItem
            });
        },
        /**
         * 设置scrollTop
         */
        _syncPositionition() {
            if (!this.isMoving) {
                // 下面有positions的push操作才敢直接赋值为空, 不然数据不响应
                this.positions = [];
                this.value.forEach((v, i) => {
                    var index = this._findIndexByValue(i, v);
                    this.positions.push({
                        scrollLeft: 0,
                        scrollTop: index * this.itemHeight
                    });
                });
            }
        },
        /**
         * 获取索引通过给定值
         * @param {number} 列表索引
         * @param {any} 给定值
         * @returns {number} 对应的索引
         */
        _findIndexByValue(listIndex, value) {
            return this.dataSource[listIndex].findIndex(item => {
                return value == item.value;
            });
        }
    },

    computed: {
        activeIndexList() {
            var array = [];
            this.value.forEach((v, i) => {
                var index = this._findIndexByValue(i, v);
                array.push(index);
            });
            return array;
        }
    },

    watch: {
        value() {
            this._syncPositionition();
        },

        dataSource: {
            deep: true,
            handler() {
                this._syncPositionition();
            }
        }
    },

    components: { VScroller }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-picker {
    position: relative;
    overflow: hidden;
    display: flex;
    &__graticule {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        box-shadow: $shadowUp, $shadowDown;
    }
    &__list {
        flex: 1;
        box-sizing: border-box;
        .list__item {
            box-sizing: border-box;
            width: 100%;
            display: block;
            text-align: center;
            color: $dark;
            font-size: $big;
            &.active {
                color: $darkest;
            }
        }
    }
}
</style>
