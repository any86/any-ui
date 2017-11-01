<script>
import VMask from '@/packages/Dialog/Mask';
export default {
    name: 'Toast',

    props: {
        isShow: {
            type: Boolean,
            default: false
        },

        render: {
            type: Function
        },

        text: {
            type: String
        },

        delay: {
            type: Number,
            default: 3000
        },

        position: {
            type: String,
            default: 'center'
        },

        type: {
            type: String,
            default: 'default'
        }
    },

    render(h) {
        if (this.isShow) {
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
                [
                    h('transition', { attrs: { name: 'zoom' } }, [
                        h('div', { class: [this.position, 'atom-toast'] }, [
                            this.text
                        ])
                    ])
                ]
            );
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
    background: rgba($darkest, 0.8);
    color: $sub;
    border-radius: $borderRadius;
    box-shadow: $shadowDown;
    border: 1px solid $lightest;
    padding: $gutter $gutter*1.5;
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
}
</style>
