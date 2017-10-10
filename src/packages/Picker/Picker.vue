<template>
    <div :style="{height: `${itemHeight * 7}px`}" class="component-picker">
        <div class="graticule" :style="{height: `${itemHeight}px`}"></div>
        <virtual-scroll v-model="positions[i]" v-for="(list, i) in dataSource" :key="i" @scroll-leave="scrollLeave(i, $event)" :isSelfMoving.sync="isSelfMoving" :bodyStyle="bodyStyle" class="list">
            <div v-for="(item, j) in list" :key="j" :style="{height: `${itemHeight}px`, lineHeight: `${itemHeight}px`}" :class="{active: j == activeIndexList[i]}">
                {{item.label}}
            </div>
        </virtual-scroll>
    </div>
</template>
<script>
import VirtualScroll from '@/packages/VirtualScroll/VirtualScroll'
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
            isSelfMoving: false,
            bodyStyle: { paddingTop: 3 * this.itemHeight + 'px', paddingBottom: 3 * this.itemHeight + 'px' }
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
        scrollLeave(listIndex, e) {
            const index = Math.round(e.scrollTop / this.itemHeight);
            this.positions[listIndex].scrollTop = index * this.itemHeight;
            const value = [...this.value];
            value[listIndex] = this.dataSource[listIndex][Math.abs(index)].value;
            this.$emit('input', value);
        },
        /**
         * 设置scrollTop
         */
        _syncPositionition() {
            if (!this.isSelfMoving) {
                // this.positions.splice(0, this.positions.length);
                // 由于下面紧接着push操作, 所以数据可以相应, 暂时没发现直接赋值[]的负面影响
                this.positions = [];
                this.value.forEach((v, i) => {
                    var index = this._findIndexByValue(i, v);
                    this.positions.push({ scrollLeft: 0, scrollTop: (0 - index) * this.itemHeight });
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
                return value == item.value
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

    components: { VirtualScroll }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-picker {
    position: relative;
    overflow: hidden;
    display: flex;
    .graticule {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        box-shadow: $shadowUp, $shadowDown;
    }
    .list {
        flex: 1;
        box-sizing: border-box;
        div {
            box-sizing: border-box;
            width: 100%;
            display: block;
            text-align: center;
            font-size: $big;
            color: $dark;
            &.active {
                color: $darkest;
            }
        }
    }
}
</style>
