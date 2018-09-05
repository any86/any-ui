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
            @scroll-end="scrollEndHandler(columnIndex, $event)" 
            @transition-end="transitionEndHandler(columnIndex, $event)"
            class="atom-picker__list">
            <div 
                v-for="(item, rowIndex) in list" 
                :key="rowIndex" 
                :style="{height: `${itemHeight}px`, lineHeight: `${itemHeight}px`}" 
                :class="{'atom-picker__item--active': rowIndex == activeIndexList[columnIndex]}" 
                class="atom-picker__item">
                {{item.label}}
            </div>
        </virtual-scroller>
    </div>
</template>
<script>
import VirtualScroller from '../../packages/VirtualScroller/VirtualScroller';
export default {
    name: 'AtomPicker',

    props: {
        dataSource: {
            type: Array, // [[{label, value}]]
            required: true,
        },

        value: {
            type: Array, // [value1, value2]
            required: true,
        },

        itemHeight: {
            type: Number,
            default: 36,
        },
    },

    computed: {
        active(){
            if(0 < this.activeIndexList.length) {
                return this.dataSource.map((list, index)=>{
                    let rowIndex = this.activeIndexList[index];
                    let activeRow = list[rowIndex];
                    return {rowIndex, ...activeRow};
                });
            }
        }
    },

    data() {
        return {
            activeIndexList: [], // 当前每列的行索引集合
            positions: [],
            bodyStyle: {
                paddingTop: 3 * this.itemHeight + 'px',
                paddingBottom: 3 * this.itemHeight + 'px',
            },
        };
    },

    created() {
        this.seekPos();
    },

    methods: {
        /**
         * 更新scroll尺寸
         */
        updateSize() {
            this.$refs.scroll.forEach(component => {
                component.updateSize();
            });
        },

        transitionEndHandler(columnIndex, { y, type }) {
            if ('inertia' === type) {
                const index = Math.round(y / this.itemHeight);
                const { value, label } = this.dataSource[columnIndex][index];
                let newValues = [...this.value];
                newValues[columnIndex] = value;
                this.$emit('input', newValues);
            }
        },

        /**
         * @param {Number} 列表索引
         * @param {Object} 滚动条距离数据
         */
        scrollEndHandler(columnIndex, position) {
            // 选项index
            const index = Math.round(position.y / this.itemHeight);
            this.activeIndexList.splice(columnIndex, 1, index);
            // 滚动到最近的卡槽位置[驱动VirtualScroller]
            this.positions[columnIndex].y = index * this.itemHeight;
        
            this.$emit('change', this.active);
        },
        /**
         * 设置scrollTop
         */
        seekPos() {
            // 下面有positions的push操作才敢直接赋值为空, 不然数据不响应
            this.positions = [];
            this.activeIndexList = [];
            this.value.forEach((v, columnIndex) => {
                // 寻找当前列中该值的索引
                const rowIndex = this.findRowIndex(columnIndex, v);
                this.activeIndexList.push(rowIndex);
                // 滑动到指定位置
                this.positions.push({
                    x: 0,
                    y: rowIndex * this.itemHeight,
                });
            });
        },
        /**
         * 获取索引通过给定值
         * @param {number} 列表索引
         * @param {any} 给定值
         * @returns {number} 对应的索引
         */
        findRowIndex(columnIndex, value) {
            return this.dataSource[columnIndex].findIndex(item => {
                return value == item.value;
            });
        },

         /**
         * 获取当前选中信息
         * @param {number} 列索引
         * @param {number} 行索引
         * @returns {Object} 对应的索引{lable, value}
         */   
        findRow(columnIndex, rowIndex) {
            return this.dataSource[columnIndex][rowIndex];
        }
    },

    watch: {
        value() {
            this.seekPos();
        },

        dataSource: {
            deep: true,
            handler(value) {
                this.seekPos();
            },
        },
    },

    components: { VirtualScroller },
};
</script>