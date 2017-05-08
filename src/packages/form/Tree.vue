<template>
    <ul class="com-tree">
        <li v-for="(item, i) in data">
            <!-- 有子节点 -->
            <template v-if="undefined != item.children">
                <div class="node" :style="{paddingLeft: level * paddingIndex + 'px'}" @click="toggle(item)">
                    <a>{{item.label}} </a>
                    <i class="fa fa-caret-right" :class="item.open && 'rotate'"></i>
                </div>
                <v-tree :value="value" :level="level + 1" v-show="item.open" :data="item.children" @input="bubble">
                </v-tree>
            </template>
            <!-- 无子节点 -->
            <template v-else>
                <div @click="select(item)" class="node" :style="{paddingLeft: level * paddingIndex + 'px'}">
                    <a :class="{active: value.value == item.value}">{{item.label}} </a>
                </div>
            </template>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'tree',

    beforeCreate: function() {
        this.$options.components.VTree = require('./Tree');
    },

    props: {
        data: {
            type: Array
        },

        value: {

        },

        level: {
            type: Number,
            default () {
                return 0;
            }
        }
    },

    data() {
        return {
            paddingIndex: 30
        };
    },

    methods: {
        toggle(item) {
            item.open = !item.open;
        },

        select(item) {
            this.$emit('input', item);
        },
        /**
         * 冒泡value到父组件
         * @param  {Any} item 
         */
        bubble(item) {
            this.$emit('input', item);
        }
    }
}
</script>
<style scoped lang=scss>
ul.com-tree {
    >li {
        overflow: hidden;
        /* 包含自己的子节点 */
        .node {
            padding: 8px 30px;
            overflow: hidden;
            border-radius: 4px;
            &:hover {
                cursor: pointer;
                background: #ccc;
            }
            >a {
                transition: all .3s;
                padding: 0 15px;
                font-size: 12px;
                margin: 0;
                text-decoration: none;
                display: block;
                float: left;
                color: #444;
                &.active {
                    color: #69c;
                }
            }
            >i {
                margin-left: 5px;
                transition: all .3s;
                &.rotate {
                    transform: rotate(90deg);
                }
            }
        }
    }
}
</style>
