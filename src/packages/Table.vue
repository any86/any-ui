<template>
    <div class="com-table">
        <v-mask v-show="-1 == status">
            <v-spinner class="spinner"></v-spinner>
        </v-mask>
        <p v-if="0 == status" class="alert alert-warning">
            <strong>系统: </strong>{{message}}
            <a class="btn btn-link btn-xs" @click="$router.go(-1)">返回</a>
        </p>
        <!-- 表格 暂时不加class: table-bordered  table-striped-->
        <table v-else class="table table-responsive table-hover table-bordered  table-striped">
            <!-- 头 -->
            <thead>
                <tr>
                    <th @click="selectAll">
                        <v-checkbox style="margin:0" :size="checkboxSize" v-model="allSelect"></v-checkbox>
                    </th>
                    <slot name="header"></slot>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!removeList[row[primaryKey]]" v-for="(row, i) in table" :key="row[primaryKey]">
                    <td>
                        <v-checkbox @click.native="select(i)" style="margin:0" :size="checkboxSize" :value="checkedList[i]">
                        </v-checkbox>
                    </td>
                    <slot name="row" :row="row" :primaryKey="row[primaryKey]" :index="i"></slot>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import VMask from './Mask'
import VSpinner from './Spinner'
import VCheckbox from './form/Checkbox'

export default {
    name: 'table',

    props: {
        table: {
            type: Array
        },

        status: {

            // type: Number
        },

        message: {
            type: String
        },

        primaryKey: {
            type: String,
            require: true
        },

        activePrimaryKey: {
            type: [String, Number]
        },

        action: {
            type: String
        },

        value: {
            type: Array
        }
    },

    mounted() {
        var array = [];
        this.table.forEach((item, i) => {
            if (this.checkedList[i]) {
                array.push(item[this.primaryKey]);
            }
        });
        this.$emit('input', array);
    },

    data() {
        return {
            checkboxSize: '15px',
            allSelect: false,
            checkedList: [],
            removeList: {} // 存储删除行的主键{ArrayLike}
        }
    },

    watch: {
        activePrimaryKey(value) {
            if ('remove' == this.action) {
                this.removeList[value] = true;
            }

        },

        checkedList(value) {
            var array = [];
            this.table.forEach((item, i) => {
                if (value[i]) {
                    array.push(item[this.primaryKey]);
                }
            });
            this.$emit('input', array);
        },

        status(value, oldValue) {
            if (1 == value) {
                this.table.forEach(row => {
                    // 初始化checkbox状态映射
                    this.checkedList.push(false);
                });
            }
            // 清空总checkbox
            this.allSelect = false;

            // 清空行checkbox
            this.checkedList = this.checkedList.map(bool => false);

            // 清空v-model
            this.$emit('input', []);
        }
    },

    methods: {
        select(i){
            // 清空行checkbox
            this.table.forEach(() => {
                this.checkedList.push(false);
            });
            this.checkedList[i] = true;
        },

        selectAll() {
            var bool = !this.allSelect;
            if (0 == this.checkedList.length) {
                this.table.forEach(() => {
                    this.checkedList.push(false);
                });
            }
            this.checkedList = this.checkedList.map(() => {
                return !bool;
            });
        }
    },

    components: {
        VMask,
        VSpinner,
        VCheckbox
    }
};
</script>
<style scoped lang="scss">
.com-table {
    margin: 0;
    min-height: 200px;
    overflow: hidden;
    position: relative;
    .spinner {
        background: rgba(0, 0, 0, .8);
        // display: table;
        width: 150px;
        height: 90px;
        margin: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 1986;
        padding: 15px 0;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .25);
    }
    .tr-enter {
        opacity: 0;
        transform: translateX(-.5rem);
    }
    .tr-enter-active {
        transition: all .5s;
    }
    .tr-leave-active {
        opacity: 0;
        transition: all .5s;
        transform: translateX(-.5rem);
    }
}
</style>
