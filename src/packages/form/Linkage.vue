<template>
    <div class="com-linkage">
        <div class="btn-group">
            <a @click="showPopup" class="btn btn-default">
                {{null == value ? opts.placeholder : value.texts.join(' / ')}}
                <i class="caret" :class="{rotate: popup.show}"></i>
            </a>
            <a @click="empty" class="btn btn-default" v-if="null != value">
                <i class="fa fa-remove"></i>
            </a>
        </div>
        <v-modal v-model="popup.show">
            <v-dialog v-model="popup.show">
                <v-tab v-model="activeIndex">
                    <!-- panel -->
                    <v-tab-panel v-for="(page, i) in opts.children" :key="i" :label="page.label" :disabled="!newValues[i] && 0 == group[i].children.length">
                        <!-- spinner -->
                        <v-spinner v-show="loading" class="spinner-gutter"></v-spinner>
                        <!-- listGroup -->
                        <!-- 无默认值 -->
                        <v-list-group v-if="null == value" v-show="!loading" :isGroup="false" :list="group[i].children" @clickItem="select">
                        </v-list-group>
                        <!-- 有默认值 -->
                        <v-list-group v-else v-model="value.values[i]" v-show="!loading" :isGroup="false" :list="group[i].children" @clickItem="select">
                        </v-list-group>
                    </v-tab-panel>
                </v-tab>
            </v-dialog>
        </v-modal>
    </div>
</template>
<script>
import VModal from '../Dialog/Modal'
import VDialog from '../Dialog/Dialog'
import VTab from '../layout/Tab'
import VTabPanel from '../layout/TabPanel'
import VSpinner from '../Spinner'
import VListGroup from '../layout/ListGroup'

export default {
    name: 'linkage',

    props: {
        opts: {
            type: Object
        },

        value: {
            type: Object
        }
    },

    data() {
        return {
            // 当前页索引
            activeIndex: 0,
            pageCount: this.opts.children.length,
            popup: {
                show: false
            },
            loading: false,
            newValues: [], // 存储当前所经历的value
            newTexts: [] // 存储当前所经历的text
        }
    },

    methods: {
        showPopup(e) {
            // 如果不为空, 那么可以假设当前激活页为最后一页
            if (null != this.value) {
                this.activeIndex = this.pageCount - 1;
                this.newValues = [...this.value.values];
                this.newTexts = [...this.value.texts];
            } else {
                // this.$emit('input', {values: [], texts: []});
            }
            this.popup.show = true;
        },
        /**
         * newTexts, newValues用来记录点击
         * @param  {Object} item 选项信息{文字, 值}
         */
        select(item) {
            // 记录id和text
            this.newValues[this.activeIndex] = item.value;
            this.newTexts[this.activeIndex] = item.label;

            // 每次点击清空后面级别的默认值
            for (var i = this.activeIndex + 1; i < this.pageCount; i++) {
                // 清空children, 这样才能触发获取数据
                this.group[i].children = [];
                this.newValues[i] = null;
                this.newTexts[i] = '无';
            }

            // if: 非最后一页
            // elseif: 最后一页
            if (this.activeIndex + 1 < this.pageCount) {
                // 翻页
                this.activeIndex++;
            } else if (this.activeIndex + 1 == this.pageCount) {
                // 关闭弹窗
                this.popup.show = false;

                // 只有点击最后一页的选项
                // 才input数据
                // this.$emit('input', {
                //     values: this.newValues,
                //     texts: this.newTexts
                // });
            }

            this.$emit('input', {
                values: this.newValues,
                texts: this.newTexts
            });


        },

        close() {
            this.popup.show = false;
        },

        empty() {
            this.newValues = [];
            this.newTexts = [];
            this.activeIndex = 0;
            this.group.map((page, i) => {
                if (0 == i) {
                    return page;
                } else {
                    return page.children = [];
                }
            });
            this.$emit('input', null);
        }
    },

    watch: {
        /**
         * 只要翻页, 自动获取列表数据
         */
        activeIndex(index) {
            // 如果
            // URL不能没有
            // children为空([])
            if (undefined != this.activeUrl && 0 >= this.activeList.length) {
                this.loading = true;
                // 获取数据
                var key = this.group[index].name;
                axios.get(this.activeUrl, {
                    params: {
                        [key]: this.parentId
                    }
                }).then(res => {
                    this.group[this.activeIndex].children = res.data.data;
                    this.loading = false;
                }).catch(e => {
                    console.info(e);
                });
            }
        }
    },

    computed: {
        // 当前页面请求URL
        activeUrl() {
            return this.opts.children[this.activeIndex].url;
        },

        // 当前页面的列表数据
        activeList() {
            return this.group[this.activeIndex].children;
        },

        // 当前页选中值
        parentId() {
            if (null != this.value) {
                return this.value.values[this.activeIndex - 1];
            }
        },

        group() {
            var group = [];
            this.opts.children.forEach((page, i) => {
                group.push(page);
            });
            return group;
        }

    },

    components: {
        VModal,
        VDialog,
        VTab,
        VTabPanel,
        VSpinner,
        VListGroup
    }
}
</script>
<style scoped lang=scss>
$color: #69c;
$padding: 5px 15px;
$disable_color: #ccc;
.com-linkage {
    position: relative;
    .rotate {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    .spinner-gutter {
        margin: 30px auto;
    }
}
</style>
