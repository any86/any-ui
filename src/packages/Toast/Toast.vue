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
        return { isShowMask: true, timeoutId: null };
    },

    watch: {
        isShow: {
            // immediate: true,
            handler(value) {
                this.$nextTick(() => {
                    log(this.delay);
                    clearTimeout(this.timeoutId);
                    if (value) {
                        this.isShowMask = value;
                        if (0 < this.delay) {
                            this.timeoutId = setTimeout(() => {
                                this.isShowMask = false;
                                this.$emit('update:isShow', false);
                            }, this.delay);
                        }
                    }
                });
            },
        },
    },

    methods: {
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
        let map = {
            success: 'tick',
            warning: 'warning',
            danger: 'close',
        };

        if (this.isShowMask) {
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
                        name: map[this.type],
                    },
                    class: ['gutter-auto'],
                    style: { display: 'block' },
                });
            }

            return h(
                'a-mask',
                {
                    props: {
                        isShow: true,
                        closeable: this.closeable,
                    },
                    style: {
                        background: 'rgba(255,255,255, 0)',
                    },
                    on: {
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
                                    { class: [this.position, 'atom-toast', `text-${this.type}`] },
                                    // 如果是组件那么渲染成vnode, 否则直接字符串渲染
                                    ['default' !== this.type && vnodeIcon, this.content._compiled ? h(this.content) : this.content],
                                ),
                            ],
                        ),
                ],
            );
        }
    },
};
</script>