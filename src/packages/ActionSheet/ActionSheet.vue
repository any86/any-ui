<template>
    <a-mask
        :is-show="isShow"
        @update:isShow="isShowPanel=false"
        @after-enter="afterMaskEnter"
        class="atom-action-sheet">
        <transition name="fadeDown" @after-leave="afterPanelLeave">
            <section v-show="isShowPanel" class="action-sheet__panel">
                <section class="actions">
                    <h1 v-if="title" class="actions__title" align="center">{{title}}</h1>
                    <!-- 自定义按钮 -->
                    <ul class="actions__buttons">
                        <li 
                            v-for="({content, type}, index) in dataSource" 
                            :key="content"
                            @click="select(index)"
                            class="button">{{content}}</li>
                    </ul>
                </section>
                <!-- 关闭按钮 -->
                <a-button @click="closePanel" type="white" class="gutter-top gutter-bottom-sm text-dark">{{cancelText}}</a-button>
            </section>
        </transition>
    </a-mask>
</template>
<script>
import AMask from '../../packages/Mask/Mask';
import AButton from '../../packages/Button/Button';
export default {
    name: 'ActionSheet',

    components: { AMask, AButton },

    props: {
        isShow: {
            type: Boolean,
            default: false,
        },

        dataSource: {
            type: Array,
        },

        title: {
            type: String,
        },

        cancelText: {
            type: String
        }
    },

    data() {
        return {
            isShowPanel: false,
        };
    },

    mounted() {
        // alert(321);
    },

    methods: {
        /**
         * Mask进入动画执行完毕后, 显示面板
         */
        afterMaskEnter() {
            this.isShowPanel = true;
        },

        /**
         * 面板动画结束后关闭Mask
         */
        afterPanelLeave() {
            this.$emit('update:isShow', false);
        },

        /**
         * 点击选项
         */
        select(index) {
            this.$emit('select', index);
        },

        /**
         * 关闭面板
         */
        closePanel() {
            this.isShowPanel = false;
        },
    },
};
</script>