<template>
    <div :style="{height: `${itemHeight * 7}px`}" class="atom-picker">
        <div class="atom-picker__mask"></div>
        <div class="atom-picker__graticule" :style="{height: `${itemHeight}px`}"></div>
        <virtual-scroller 
            ref="scroll"
            v-for="(list, columnIndex) in dataSource" 
            :key="columnIndex" 
            v-model="positions[columnIndex]" 
            :is-prevent-default="true"
            :is-stop-propagation="true" 
            :is-lock-x="true" 
            :is-lock-y="false" 
            :is-bind-body="true" 
            :body-style="bodyStyle" 
            @scroll-end="scrollEndHandle(columnIndex, $event)" 
            @transition-end="transitionEndHandle(columnIndex, $event)"
            class="atom-picker__list">
            <div 
                v-for="(item, rowIndex) in list" 
                :key="rowIndex" 
                :style="{height: `${itemHeight}px`, lineHeight: `${itemHeight}px`}" 
                :class="{'list__item--active': rowIndex == activeIndexList[columnIndex]}" 
                class="list__item">
                {{item.label}}
            </div>
        </virtual-scroller>
    </div>
</template>
<script>
import _ from 'lodash';
import VirtualScroller from '../../packages/VirtualScroller/VirtualScroller';
export default {
    name: 'AtomPicker',

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
            activeIndexList: [], // 当前每列的行索引集合
            positions: [],
            bodyStyle: {
                paddingTop: 3 * this.itemHeight + 'px',
                paddingBottom: 3 * this.itemHeight + 'px'
            }
        };
    },

    created() {
        this._syncPos();
    },

    methods: {
        /**
         * 更新scroll尺寸
         */
        updateSize(){
            this.$refs.scroll.forEach(component=>{
                component.updateSize();
            });
        },

        transitionEndHandle(columnIndex, { y, type }) {
            if ('inertia' === type) {
                const index = Math.round(y / this.itemHeight);
                const { value, label } = this.dataSource[columnIndex][index];
                let newValues = [...this.value];
                newValues[columnIndex] = value;
                this.$emit('input', newValues);
                this.$emit('change', {
                    columnIndex,
                    rowIndex: index,
                    value,
                    label
                });
            }
        },

        /**
         * @param {Number} 列表索引
         * @param {Object} 滚动条距离数据
         */
        scrollEndHandle(columnIndex, position) {
            // 选项index
            const index = Math.round(position.y / this.itemHeight);
            this.activeIndexList.splice(columnIndex, 1, index);
            // 滚动到最近的卡槽位置[驱动VirtualScroller]
            this.positions[columnIndex].y = index * this.itemHeight;
        },
        /**
         * 设置scrollTop
         */
        _syncPos() {
            // 下面有positions的push操作才敢直接赋值为空, 不然数据不响应
            this.positions = [];
            this.activeIndexList = [];
            this.value.forEach((v, columnIndex) => {
                // 寻找当前列中该值的索引
                const rowIndex = this._findIndexByValue(columnIndex, v);
                this.activeIndexList.push(rowIndex);

                // 滑动到指定位置
                this.positions.push({
                    x: 0,
                    y: rowIndex * this.itemHeight
                });
            });
        },
        /**
         * 获取索引通过给定值
         * @param {number} 列表索引
         * @param {any} 给定值
         * @returns {number} 对应的索引
         */
        _findIndexByValue(columnIndex, value) {
            return this.dataSource[columnIndex].findIndex(item => {
                return value == item.value;
            });
        }
    },

    computed: {},

    watch: {
        value() {
            this._syncPos();
        },

        dataSource: {
            deep: true,
            handler() {
                this._syncPos();
            }
        }
    },

    components: { VirtualScroller }
};
</script>