<template>
    <div class="component-lazyload" :lazy="statusString" :style="{width, height}">
        <img v-if="0 == status || !isLoad" src="./loading.gif">
        <transition name="alert">
            <img v-if="1 == status && isLoad" :src="src">
        </transition>
    </div>
</template>
<script>
export default {
    name: 'LazyLoad',

    props: {
        src: {
            type: String,
        },

        isLoad: {
            type: Boolean
        }
    },

    mounted() {

        this.attempt = this.$el.getAttribute('attempt');
        this.height = this.$el.getAttribute('height');
        this.width = this.$el.getAttribute('width');

        this.loadImg();

        // 等待style生效, 组件尺寸生效占位后才能获取到实际top
        this.$nextTick(() => {
            var obj  = this.$el.getBoundingClientRect();
            this.top = obj.top;
            this.bottom = obj.bottom;
            this.height = obj.height + 'px';
        });
    },

    data() {
        return {
            status: 0,
            top: 0,
            bottom: 0,
            width: '0',
            height: '0',
            loadTime: 0,
            attempt: 3,
            placeholder: ''
        };
    },

    methods: {
        loadImg() {

            // if(img.compulet);

            if (this.isLoad) {
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
            }
        }
    },

    computed: {
        isInView(){
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
    },

    watch: {
        isLoad() {
            this.loadImg();
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: $gutter*8;
.component-lazyload {
    // display: flex;
    // align-items: center;
    overflow: hidden;
    // >svg {
    //     margin: auto;
    //     stroke: $light;
    // }
    >img {
        width: 100%;
        display: block;
    }
}

// 动画
.alert-enter-active {
    animation: alert-in 1s;
}

.alert-leave-active {
    animation: alert-out 1s;
}

@keyframes alert-in {
    0% {
        opacity: 0;
        transform: scale(.9) translateY(5px);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes alert-out {
    0% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
    100% {
        opacity: 0;
        transform: scale(1.1) translateY(15px);
    }
}
</style>
