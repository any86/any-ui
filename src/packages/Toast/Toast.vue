<script>
import VMask from '@/packages/Mask/Mask';
export default {
    name: 'Toast',

    props: {
        isShow: {
            type: Boolean,
            default: false
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

    data() {
        return { isShowMask: true };
    },

    render(h) {
        if (this.isShowMask ) {
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
                    this.isShow &&
                        h(
                            'transition',
                            {
                                attrs: { name: 'fade'},
                                on: {'after-leave': this.afterLeave }
                            },
                            [
                                h(
                                    'div',
                                    { class: [this.position, 'atom-toast'] },
                                    [this.text]
                                )
                            ]
                        )
                ]
            );
        }
    },

    methods: {
        afterLeave() {
            this.isShowMask = false;
        }
    },

    watch: {
        isShow(value) {
            if(value){
                this.isShowMask = value;
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
    background: rgba($darkest, 0.8);
    color: $sub;
    border-radius: $borderRadius;
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
