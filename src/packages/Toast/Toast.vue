<script>
import VMask from '@/packages/Dialog/Mask';
export default {
    name: 'Toast',

    props: {
        isShow: {
            type: Boolean,
            default: false
        },

        text: {}
    },

    data() {
        return {
            timer: null,
            delay: 3000,
            position: 'center',
            type: 'default'
        };
    },

    render(h) {
        if (undefined !== this.text) {
            var vnode =
                undefined !== this.text.render ? h(this.text) : this.text;
            return h(
                'v-mask',
                {
                    props: {
                        isShow: true
                    },
                    style: {
                        background: 'rgba(255,255,255, 0)'
                    }
                },
                this.isShow && [
                    h('transition'),
                    { attrs: { name: 'zoom' } },
                    [
                        h('div', { class: [this.position, 'atom-toast'] }, [
                            vnode
                        ])
                    ]
                ]
            );
        }
    },

    methods: {
        close() {
            if (-1 != this.delay) {
                this.timer = setTimeout(() => {
                    this.isShow = false;
                }, this.delay);
            }
        }
    },

    watch: {
        isShow(value) {
            if (value) {
                this.close();
            }
        }
    },

    components: {
        VMask
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: $minHeight;
.atom-toast {
    position: fixed;
    background: $background;
    border-radius: $borderRadius;
    box-shadow: $shadowDown;
    border: 1px solid $lightest;
    padding: $gutter 1.2*$gutter;
    text-align: center;
    &.top {
        z-index: $toastZIndex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-style: preserve-3d;
    }
    &.center {
        z-index: $toastZIndex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-style: preserve-3d;
    }
    &.bottom {
        z-index: $toastZIndex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-style: preserve-3d;
    }
    .icon {
        width: 2*$height;
        height: 2*$height;
        margin: 0 auto;
        text-align: center;
        i {
            font-size: 1rem;
            line-height: 2*$height;
        }
    }
}

// 动画
.toast-enter-active {
    animation: toast-in 0.3s;
}

.toast-leave-active {
    animation: toast-out 0.3s;
}

@keyframes toast-in {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.1);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

@keyframes toast-out {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.1);
    }
}
</style>
