<template>
    <img :status="status" :src="url" class="atom-lazyload" :lazy="status">
</template>
<script>
// import throttled from 'lodash/throttled'
import { getWidth, getHeight } from '@/utils/dom';

export default {
    name: 'LazyLoad',

    props: {
        src: {
            type: String
        },

        placeholderBackgroundColor: {
            type: String,
            default: '#fff'
        },

        placeholder: {
            type: String,
            default() {
                return `data:image/svg+xml;utf8,<svg width="1" height="1" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="${this
                    .placeholderBackgroundColor}"/></svg>`;
            }
        },

        attempt: {
            type: Number,
            default: 1
        },

        errorImage: {
            type: String
        },

        preLoadRate: {
            type: Number,
            default: 1.3
        },

        baseWatch: {
            // required: true
        },

        watch: {
            required: true
        }
    },

    data() {
        return {
            status: 'ready',
            rect: {},
            url: '',
            loadTime: 0
        };
    },

    mounted() {
        this.url = this.placeholder;
        if (this.checkInView()) {
            this.loadImg();
        }
    },

    methods: {
        checkInView() {
            const {
                top,
                right,
                bottom,
                left
            } = this.$el.getBoundingClientRect();
            const winWidth = getWidth(window);
            const winHeight = getHeight(window);
            return (
                top < winHeight * this.preLoadRate &&
                bottom > 0 &&
                left < winWidth * this.preLoadRate &&
                right > 0
            );
        },

        loadImg() {
            this.status = 'loading';
            // if(img.compulet);
            let img = new Image();
            img.src = this.src;

            // 加载成功
            img.onload = e => {
                this.status = 'done';
                this.url = this.src;
                this.loadTime = e.timeStamp;
                img = null;
            };

            // 错误处理
            img.onerror = e => {
                this.status = 'fail';
            };
        }
    },

    watch: {
        watch(value) {
            if ('ready' == this.status && this.checkInView()) {
                this.loadImg();
            }
        }
    },

    computed: {}
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-lazyload {
    width: 100%;
    display: block;
    &[lazy='loading'] {
        display: block;
    }
    &[lazy='done'] {
        animation: fadeIn 1s;
    }
}
</style>
