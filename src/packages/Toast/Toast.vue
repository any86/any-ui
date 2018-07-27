<template>
    <main 
        :style="{pointerEvents: pointerEvents}"
        class="atom-toast">
        <!-- toast核心 -->
        <transition name="zoom">
            <span v-show="isShow" class="atom-toast__box">
                <a-loading 
                    v-if="'loading' === type" 
                    type="lightest" 
                    name="android"
                    class="gutter-auto gutter-bottom-sm d-block"
                    />
                <a-icon 
                    v-else-if="iconName" 
                    :name="iconName" 
                    class="gutter-auto d-block"/>
                {{content}}
            </span>
        </transition>
    </main>
</template>

<script>
import AIcon from '../../packages/Icon';
import ALoading from '../../packages/Loading/Loading';
export default {
    name: 'AtomToast',

    components: {
        ALoading,
        AIcon,
    },

    props: {
        // 是否显示
        isShow: {
            type: Boolean,
            default: false,
        },

        // 内容, 支持vnode
        content: {
            type: String,
        },

        // 延迟自动关闭, 为0永远不关闭
        time: {
            type: Number,
            default: 2000,
        },

        // 情景, 成功/失败/警告/loading
        type: {
            type: String,
        },

        // 点击其他地方是否可关闭
        // closeable: {
        //     type: Boolean,
        //     default: true,
        // },
    },

    computed: {
        pointerEvents() {
            return this.isShow ? 'auto' : 'none';
        },

        iconName() {
            let iconMap = {
                success: 'tick',
                warning: 'warning',
                danger: 'close',
                error: 'close',
            };
            return iconMap[this.type];
        },
    },

    data() {
        return {
            isShowMask: false,
            isShowBox: false,
            timeoutId: null,
        };
    },

    methods: {
        close() {
            // clearTimeout(this.timeoutId);
            // this.$emit('update:isShow', false);
        },
    },

    watch: {
        // 引入默认值是false,
        // 但是通过$toast传递了true,
        // 所以初始化会运行watch
        isShow(isShow) {
            if (isShow) {
                document.documentElement.classList.toggle('ovh', isShow);
                document.body.classList.toggle('ovh', isShow);
                // 延迟关闭
                if (0 < this.time) {
                    this.timeoutId = setTimeout(() => {
                        // this.$emit('timeout', this.timeoutId);
                        this.$emit('update:isShow', false);
                    }, this.time);
                }
            }
        },
    },
};
</script>