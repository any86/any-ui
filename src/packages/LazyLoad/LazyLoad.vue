<template>
    <span class="component-lazyload" :lazy="statusString" :style="{width, height}">
        <img v-if="0 == status" src="./loading.gif">
        <transition name="lazy">
            <img v-if="1 == status" :src="src">
        </transition>
    </span>
</template>
<script>
export default {
    name: 'LazyLoad',

    props: {
        element: {
            required: true
        },

        event: {
            type: String,
            default: 'scroll'
        },

        src: {
            type: String,
        },

        attempt: {
            type: Number,
            default: 1
        }
    },

    data() {
        return {
            status: 0,
            top: 0,
            bottom: 0,
            width: '0',
            height: '0',
            loadTime: 0,
            placeholder: ''
        };
    },

    mounted() {

        this.height = this.$el.getAttribute('height');
        this.width = this.$el.getAttribute('width');

        // 等待style生效, 组件尺寸生效占位后才能获取到实际top
        this.$nextTick(() => {
            this.loadImg();
            this.element.addEventListener(this.event, this.loadImg /*, {once: true}*/ );
        });
    },

    methods: {
        loadImg() {
            var obj = this.$el.getBoundingClientRect();
            this.top = obj.top;
            this.bottom = obj.bottom;
            this.height = obj.height + 'px';

            if (this.top < window.screen.height) {
                // if(img.compulet);
                // const DEFAULT_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
                // const DEFAULT_EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
                let img = new Image();
                img.src = this.src;

                // 加载成功
                img.onload = e => {
                    this.status = 1;
                    this.loadTime = e.timeStamp;
                    // img = null;
                }

                // 错误处理
                img.onerror = e => {
                    this.status = -1;
                    syslog(e);
                }

                this.element.removeEventListener(this.event, this.loadImg);
            }
        }
    },

    computed: {
        isInView() {
            // return window.screen.height;
            return window.screen.height;

        },

        statusString() {
            switch (this.status) {
                case -1:
                    return 'error';
                    break;
                case 0:
                    return 'loading';
                    break;
                case 1:
                    return 'done';
                    break;
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: $gutter*8;
.component-lazyload {
    display: block;
    overflow: hidden;
    >img {
        width: 100%;
        display: block;
    }
}

// 动画
.lazy-enter-active {
    animation: lazy-in 1s;
}

.lazy-leave-active {
    animation: lazy-out 1s;
}

@keyframes lazy-in {
    0% {
        opacity: 0;
        transform: scale(.9) translateY(-5px);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
