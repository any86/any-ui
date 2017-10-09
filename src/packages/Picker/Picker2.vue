<template>
    <div :style="{height: `${itemHeight * 7}px`}" class="component-picker">
        <div class="graticule" :style="{height: `${itemHeight}px`}"></div>
        <virtual-scroll v-model="positions[i]" v-for="(list, i) in dataSource" :key="i" @scroll-end="scrollEnd(i, $event)" class="list">
            <div :style="{height: `${3*itemHeight}px`}"></div>
            <div v-for="(item, j) in list" :key="j" :style="{height: `${itemHeight}px`, lineHeight: `${itemHeight}px`}">{{item.label}}</div>
            <div :style="{height: `${3*itemHeight}px`}"></div>
        </virtual-scroll>
    </div>
</template>
<script>
import VirtualScroll from '@/packages/VirtualScroll/VirtualScroll'
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
            positions: [],
            active: {}, // 当前拖拽列表
            itemHeight: 36,
            touchStatusList: []
        };
    },

    created() {
        this._syncPositionition();
    },

    mounted() {

    },

    methods: {
        scrollEnd(listIndex, e){
            var index = Math.round(e.scrollTop / this.itemHeight);
            this.positions[listIndex].scrollTop = index * this.itemHeight;
            // this.$emit('input', );
        },

        /**
         * 设置scrollTop
         */
        _syncPositionition() {
            this.positions.splice(0, this.positions.length - 1);
            this.value.forEach((v, i) => {
                var index = this._findIndexByValue(i, v);
                this.positions.push({ scrollLeft: 0, scrollTop: (0 - index) * this.itemHeight });
            });
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

    watch: {
        value() {
            this._syncPositionition();
        },

        dataSource() {
            this._syncPositionition();
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
        &.transition {
            transition: all .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
    }
}
</style>
