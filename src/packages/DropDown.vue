<template>
    <div class="component-dropdown" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <slot></slot>
        <transition name="dialog" @enter="enter">
            <div ref="dialog" v-show="dialog.isShow" class="dialog" :style="{top, left}">
                <slot name="dialog">我是对话框</slot>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'DropMenu',

    props: {
        reLocation: {
            type: Boolean,
            default: false
        },

        value: {
            type: Array
        }
    },

    mounted() {
        // window.addEventListener('resize', () => {
        //     this.dialog.isShow = false;
        //     // this.location();
        // });
    },

    data() {
        return {
            top: '0',
            left: '0',
            dialog: {
                isShow: false
            }
        }
    },

    methods: {
        enter() {
            this.location();
        },
        /**
         * 定位
         */
        location() {
            var {
                height: dialogHeight,
                width: dialogWidth
            } = window.getComputedStyle(this.$refs.dialog, null);
            
            var {
                top,
                left,
                bottom,
                right,
                height,
                width
            } = this.$el.getBoundingClientRect();

            // 判断是左还是右
            if(0 < window.innerWidth - left  - parseInt(dialogWidth)) {
                this.left = left + 'px';
            } else {
                this.left = left + width - parseInt(dialogWidth) + 'px';
            }

            // 判断是上还是下
            if(0 < window.innerHeight - top - height - parseInt(dialogHeight)) {
                this.top = top + height + 'px';
            } else {
                this.top = top - parseInt(dialogHeight) + 'px';
            }
            // syslog(this.top)
        },

        mouseenter() {
            this.dialog.isShow = true;
        },

        mouseleave() {
            this.dialog.isShow = false;
        }
    },

    watch: {
        reLocation(){
            this.location();
        }
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.component-dropdown {
    overflow: hidden;
    display: inline-block;
    .dialog {
        padding: $gutter 0;
        display: inline-block;
        position: fixed;
        z-index: $dropDownZIndex;
    }
}


/*动画*/

.dialog-enter-active {
    animation: dialog-in .3s;
}

.dialog-leave-active {
    animation: dialog-out .3s;
}

@keyframes dialog-in {
    0% {
        opacity: 0;
        transform: translateY(-5px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes dialog-out {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-5px);
    }
}
</style>
