<template>
    <img :status="status" :src="url" class="component-lazyload" :lazy="statusString">
</template>
<script>
// import throttled from 'lodash/throttled'
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
            default: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMqaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEYxNzBCQjc0RkQ2MTFFN0JCMEJGNzhDNjFBRDUwMTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEYxNzBCQjg0RkQ2MTFFN0JCMEJGNzhDNjFBRDUwMTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RjE3MEJCNTRGRDYxMUU3QkIwQkY3OEM2MUFENTAxMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RjE3MEJCNjRGRDYxMUU3QkIwQkY3OEM2MUFENTAxMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uACZBZG9iZQBkwAAAAAEDABUEAwYKDQAABL0AAATeAAAFDgAABS//2wCEAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHB8fHx8fHx8fHx8BBwcHDQwNGBAQGBoVERUaHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fH//CABEIAAEAAQMBEQACEQEDEQH/xABuAAEAAAAAAAAAAAAAAAAAAAAHAQEAAAAAAAAAAAAAAAAAAAAAEAEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAAEgEAAAAAAAAAAAAAAAAAAAAAEwEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAAAFQP//aAAgBAQABBQJ//9oACAECAAEFAn//2gAIAQMAAQUCf//aAAgBAgIGPwJ//9oACAEDAgY/An//2gAIAQEBBj8Cf//aAAgBAQMBPyF//9oACAECAwE/IX//2gAIAQMDAT8hf//aAAwDAQACEQMRAAAQv//aAAgBAQMBPxB//9oACAECAwE/EH//2gAIAQMDAT8Qf//Z'
        },

        attempt: {
            type: Number,
            default: 1
        },

        preLoad: {
            type: Number,
            default: 1.3
        },

        watch: {
            required: true
        }
    },

    data() {
        return {
            status: -2,
            rect: {},
            url: '',
            loadTime: 0,
            timer: null
        };
    },

    mounted() {
        // syslog(this.$el.offsetParent) //  === null
        // // 找最近的overflowY == scroll 或者overflowX == scroll的父节点
        // var _parentNode = this.$el.parentNode;
        // var style = getComputedStyle(_parentNode, null);
        // // 不能等于document, document.nodeType == null 
        // while (9 != _parentNode.nodeType && 'scroll' != style.overflowY && 'scroll' != style.overflowX) {
        //     _parentNode = _parentNode.parentNode;
        //     style = getComputedStyle(_parentNode, null);
        // }
        // this.viewNode = _parentNode;

        this.url = this.placeholder;
        this.isInView() && this.loadImg();
    },

    methods: {
        isInView() {
            this.rect = this.$el.getBoundingClientRect();
            return this.rect.top <= window.innerHeight * this.preLoad;
        },

        loadImg() {
            this.status = 0;
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

        }
    },

    watch: {
        watch() {
            if (-2 == this.status && this.isInView()) {
                this.loadImg();
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
}
</style>
