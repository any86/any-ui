<template>
    <img :src="url" class="component-lazyload" :lazy="statusString">
</template>
<script>
export default {
    name: 'LazyLoad',

    props: {
        event: {
            type: String,
            default: 'scroll'
        },

        threshold: {
            type: Number,
            default: 500
        },

        src: {
            type: String,
        },

        placeholder: {
            type: String,
            default: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        },

        attempt: {
            type: Number,
            default: 1
        }
    },

    data() {
        return {
            status: 0,
            viewNode: null,
            url: '',
            top: 0,
            bottom: 0,
            width: '0',
            height: '0',
            loadTime: 0
        };
    },

    mounted() {
        // 找最近的scroll父节点
        var _parentNode = this.$el.parentNode;
        while ('scroll' != getComputedStyle(_parentNode, null).overflow) {
            _parentNode = _parentNode.parentNode;
        }
        this.viewNode = _parentNode;

        this.url = this.placeholder;

        this.loadImg();
        this.viewNode.addEventListener(this.event, this.loadImg /*, {once: true}*/ );
    },

    methods: {
        loadImg() {
            var obj = this.$el.getBoundingClientRect();
            this.top = obj.top;
            this.bottom = obj.bottom;

            if (this.top - this.threshold < window.screen.height) {
                // if(img.compulet);

                let img = new Image();
                img.src = this.src;

                // 加载成功
                img.onload = e => {
                    this.status = 1;
                    this.url = this.src;
                    this.loadTime = e.timeStamp;
                    // img = null;
                }

                // 错误处理
                img.onerror = e => {
                    this.status = -1;
                    syslog(e);
                }

                // this.viewNode.removeEventListener(this.event, this.loadImg);
            }
        }
    },

    computed: {
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
.component-lazyload {
    display: block;
    overflow: hidden;
    >img {
        width: 100%;
        display: block;
    }
    >img[lazy="loading"] {}
}
</style>
