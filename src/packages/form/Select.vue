<template>
    <div class="com-select">
        <!-- 搜索 -->
        <div class="btn-group">
            <a @click="showPopup" class="btn btn-default">
                {{null == value ? opts.placeholder : text}}  
                <i class="caret" :class="{rotate: popup.show}"></i>
            </a>
            <a @click="empty" class="btn btn-default" v-if="null != value">
                <i class="fa fa-remove"></i>
            </a>
        </div>
        <!-- popup -->
        <v-modal v-model="popup.show">
            <v-dialog v-model="popup.show">
                <input slot="header" ref="search" v-model="keyword" type="text" class="search form-control" :placeholder="opts.placeholder">
                <!-- 选项列表 -->
                <v-list-group :isGroup="isGroup" :value="value" :list="list" @clickItem="selectOption">
                </v-list-group>
            </v-dialog>
        </v-modal>
    </div>
</template>
<script>
import VModal from '../Dialog/Modal'
import VDialog from '../Dialog/Dialog'
import VListGroup from '../layout/ListGroup'

export default {
    name: 'select',

    props: {
        opts: {
            type: Object
        },
        value: {}
    },

    components: {
        VModal,
        VDialog,
        VListGroup
    },

    data() {
        return {
            keyword: '',
            popup: {
                show: false
            },
            isGroup: false,
            listHeight: window.screen.height - 400 + 'px'
        }
    },

    computed: {
        /**
         * 找出默认的label, 显示到input
         * @return {String} 当前input应该显示的text
         */
        text() {
            var _text = '';

            if (this.isGroup) {
                var _break = false;
                this.opts.children.forEach(group => {
                    group.children.forEach(item => {
                        if (this.value == item.value) {
                            // 默认item传到父级
                            _text = item.label;
                            _break = true;
                            return false;
                        }
                    });
                    // 跳出第一层forEach
                    if (_break) {
                        return false;
                    }
                })
            } else {
                this.opts.children.forEach(item => {
                    if (this.value == item.value) {
                        _text = item.label;
                        return false;
                    }
                });
            }
            return _text;
        },


        /**
         * 过滤关键词
         * @return {[Array]} [列表数据]
         */
        list() {
            if (this.isGroup) {
                return this.opts.children.map(group => {
                    var obj = {};
                    obj.title = group.title;
                    obj.children = group.children.filter(option => {
                        return (-1 != option.label.indexOf(this.keyword));
                    });
                    return obj;
                });
            } else {
                return this.opts.children.filter(option => {
                    return (-1 != option.label.indexOf(this.keyword));
                });
            }
        }
    },

    created() {
        // 判断是否是组结构数据
        this.isGroup = (undefined != this.opts.children[0].title);
    },

    methods: {
        showPopup() {
            this.popup.show = true;
            this.$nextTick(() => {
                this.$refs.search.select()
            });
        },

        /**
         * 单选事件, 传递input事件, 模拟v-model
         */
        selectOption(option) {
            this.$emit('input', option.value);
            this.popup.show = false;
        },

        empty() {
            this.popup.show = false;
            this.keyword = '';

            this.$emit('input', null);
        }
    }

}
</script>
<style scoped lang=scss>
.com-select {
    position: relative;
    width: 100%;
    .rotate {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    .caret {
        transition: all .5s;
    }
}
</style>
