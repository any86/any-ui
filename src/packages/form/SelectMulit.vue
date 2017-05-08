<template>
    <div class="com-select-mulit">
        <!-- select -->
        <div class="btn-group">
            <a @click="showPopup" class="btn btn-default">
                <template v-if="0 >= selectedOptions.length">
                    {{opts.placeholder}}  
                    <i class="caret" :class="{rotate: popup.show}"></i>
                </template>

                <template v-else>
                    已选择
                    <a class="text-info">{{selectedOptions.length}}</a> 项
            <i class="caret" :class="{rotate: popup.show}"></i>
            </template>
            </a>
            <a v-if="0 < selectedOptions.length" @click="empty" class="btn btn-default">
                <i class="fa fa-remove"></i>
            </a>
            </div>
<!-- popup  -->
<v-modal v-model="popup.show">
    <v-dialog v-model="popup.show">
        <!-- 已选择 -->
        <div slot="header">
            <div class="selected-list">
                <button @click="selectReverse(option)" v-for="option in selectedOptions" class="btn btn-xs btn-primary">{{option.label}}
                    <i class="fa fa-remove"></i>
                </button>
            </div>
            <v-input v-model="keyword" :opts="{placeholder: '输入关键词'}"></v-input>
        </div>
        <!-- 选项列表 -->
        <v-list-group :isGroup="isGroup" :value="value" :list="unSelectedOptions" @clickItem="selectOption">
        </v-list-group>
        <div slot="footer" class="btn-group">
            <a @click="reverse" class="btn btn-default btn-sm">
                <i class="fa fa-retweet"></i> 反选
            </a>
            <a @click="empty" class="btn btn-default btn-sm">
                <i class="fa fa-trash"></i> 清空
            </a>
            <a @click="close" class="btn btn-default btn-sm">
                <i class="fa fa-check"></i> 确定
            </a>
        </div>
    </v-dialog>
</v-modal>
</div>
</template>
<script>
import VInput from '../form/Input'
import VModal from '../Dialog/Modal'
import VDialog from '../Dialog/Dialog'
import VListGroup from '../layout/ListGroup'

export default {
    name: 'selectMulit',

    props: {
        opts: {
            type: Object
        },
        value: {
            type: Array,

            default (value) {
                if (null == value || undefined == value) {
                    return [];
                }
            }
        }
    },

    data() {
        return {
            list: [],
            isGroup: false,
            selectedOptions: [],
            keyword: '',
            popup: {
                top: 0,
                left: 0,
                show: false
            }
        }
    },

    created() {
        // 判断是够有组结构
        this.isGroup = (undefined != this.opts.children[0].children);
    },

    components: {
        VDialog,
        VModal,
        VListGroup,
        VInput
    },

    methods: {
        /**
         * 弹出对话框
         */
        showPopup() {
            this.popup.show = true;
        },

        /**
         * 选择事件, 传递input事件, 模拟v-model
         */
        selectOption(option) {
            this.$emit('input', [...this.value, option.value]);
        },

        selectReverse(option) {
            // 取消选择
            this.$emit('input', this.value.filter(optionValue => {
                return optionValue != option.value;
            }));
        },

        reverse() {
            // 反向选择
            var array = [];
            if (this.isGroup) {
                this.opts.children.forEach(group => {
                    group.children.forEach(option => {
                        if (-1 == this.value.indexOf(option.value)) {
                            array.push(option.value);
                        }
                    });
                });
            } else {
                this.opts.children.forEach(option => {
                    if (-1 == this.value.indexOf(option.value)) {
                        array.push(option.value);
                    }
                });
            }
            this.$emit('input', array);
        },

        empty() {
            this.opts.children.forEach(option => {});
            this.$emit('input', []);
        },

        close() {
            this.popup.show = false;
        },

        leavePopup() {
            this.popup.show = false;
        }
    },

    computed: {
        /**
         * 待选择列表
         */
        unSelectedOptions() {
            // 重置已选择列表
            this.selectedOptions = [];
            // 如果没有默认值, 那么修改null为[]
            // 同时设置未选择列表为全部列表
            if (null == this.value) {
                this.$emit('input', []);
                return this.opts.children;
            } else {
                // 填充已选择/未选择列表
                if (this.isGroup) {
                    // 带组的列表
                    return this.opts.children.map(group => {
                        var obj = {};
                        obj.title = group.title
                        obj.children = group.children.filter(option => {
                            // 未选择返回数据
                            // 已选择放入this.selectedOptions
                            if (-1 == this.value.indexOf(option.value)) {
                                // 未选择, 过滤关键词
                                if (-1 != option.label.indexOf(this.keyword)) {
                                    return true;
                                }
                            } else {
                                this.selectedOptions.push(option);
                            }
                        });
                        return obj;
                    });
                } else {
                    // 不带组列表
                    return this.opts.children.filter(option => {
                        // 未选择返回数据
                        // 已选择放入this.selectedOptions
                        if (-1 == this.value.indexOf(option.value)) {
                            // 过滤关键词
                            if (-1 != option.label.indexOf(this.keyword)) {
                                return true;
                            }
                        } else {
                            this.selectedOptions.push(option);
                        }
                    });
                }
            }
        }
    }
}
</script>
<style scoped lang=scss>
$color: #69c;
$padding: 15px;
$disable_color: #ccc;
.com-select-mulit {
    position: relative;
    button {
        outline: none;
    }
    .rotate {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    .caret {
        transition: all .5s;
    }
    .selected-list {
        .btn {
            margin-right: 15px;
            margin-bottom: 15px;
        }
    }
    .keyword {
        margin: 5px auto;
    }
}
</style>
