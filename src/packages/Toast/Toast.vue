<script>
import AMask from '../../packages/Mask';
import AIcon from '../../packages/Icon';
import ALoading from '../../packages/Loading';
export default {
    name: 'AtomToast',

    components: {
        AMask,
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
            type: [String, Object],
        },

        // 延迟自动关闭, 为0永远不关闭
        delay: {
            type: Number,
            default: 3000,
        },

        // 显示位置
        position: {
            type: String,
            default: 'center',
        },

        // 情景, 成功/失败/警告/loading
        type: {
            type: String,
            default: 'danger',
        },

        // 是否点击mask可关闭
        closeable: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return { isShowMask: true, timeoutId: null, bodyOverflow: '' };
    },

    watch: {
        isShow: {
            // immediate: true,
            handler(value) {
                if (value) {
                    clearTimeout(this.timeoutId);
                    if (0 < this.delay) {
                        this.closeAfterDelay(this.delay);
                    }
                }
            },
        },
    },

    methods: {
        closeAfterDelay(time) {
            this.timeoutId = setTimeout(() => {
                this.$emit('update:isShow', false);
            }, time);
        },

        cancelDelayClose() {
            clearTimeout(this, timeoutId);
        },

        afterLeave() {
            this.isShowMask = false;
        },

        /**
         * 关闭
         */
        closeAll(e) {
            if (this.closeable) {
                clearTimeout(this.timeoutId);
                this.isShowMask = false;
                this.$emit('update:isShow', false);
            }
        },
    },

    render(h) {
        // type和图标的映射关系
        let iconMap = {
            success: 'tick',
            warning: 'warning',
            danger: 'close',
            error: 'close',
        };

        let vnodeIcon;
        if ('loading' === this.type) {
            vnodeIcon = h('a-loading', {
                props: { type: 'primary' },
                class: ['gutter-auto', 'gutter-bottom-sm'],
                style: { display: 'block' },
            });
        } else {
            vnodeIcon = h('a-icon', {
                props: {
                    name: iconMap[this.type],
                },
                class: ['gutter-auto'],
                style: { display: 'block' },
            });
        }

        return this.isShowMask && h(
            'a-mask',
            {
                props: {
                    isShow: this.isShow,
                    closeable: this.closeable,
                },
                style: {
                    background: 'rgba(255,255,255, 0)',
                },
                on: {
                    'after-leave': ()=>{this.isShowMask=false},
                    'update:isShow': this.closeAll,
                },
            },
            [
                this.isShow &&
                    h(
                        'transition',
                        {
                            attrs: { name: 'fade' },
                            on: { 'after-leave': this.afterLeave },
                        },
                        [
                            h(
                                'div',
                                { class: [this.position, 'atom-toast'] },
                                // 如果是组件那么渲染成vnode, 否则直接字符串渲染
                                ['default' !== this.type && vnodeIcon, this.content._compiled ? h(this.content) : this.content],
                            ),
                        ],
                    ),
            ],
        );
    },
};
</script>