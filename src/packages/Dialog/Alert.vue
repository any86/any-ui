<template>
    <transition name="fadeUp" @after-leave="afterLeave">
        <div v-show="value" class="component-alert" :style="{width: width}">
            <div class="header">
                <h1 class="title">{{title}}</h1>
            </div>
            <div class="body" v-html="text" :style="{maxHeight: windowHeight * .38 + 'px'}"></div>
            <div class="footer">
                <a @click="ok" class="button-ok">{{btnOkText}}</a>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Alert',

    props: {
        value: {
            type: Boolean
        },

        width: {
            default: '90%'
        },

        text: {

        },

        title: {
            type: String,
            default: '提示'
        },

        holdTime: {
            type: Number,
            default: -1
        },

        lock: {
            type: Boolean
        }
    },

    data() {
        return {
            windowHeight: 0,
            timeOutTimer: null,
            intervalTimer: null,
            btnOkText: '确定',
            _holdTime: 0
        };
    },

    mounted() {
        this.windowHeight = window.outerHeight;
        window.onresize = () => {
            this.windowHeight = window.outerHeight;
        }
    },

    methods: {
        ok() {
            this.$emit('ok');
            this.$emit('input', false);
        },

        afterLeave() {
            this.$emit('after-leave');
        }
    },

    computed: {
        isShow: {
            get() {
                return this.value;
            },

            set(isShow) {
                this.$emit('input', isShow);
            }
        }
    },

    watch: {
        value(value) {
            if (value && -1 != this.holdTime) {
                clearTimeout(this.timeOutTimer);
                this.timeOutTimer = setTimeout(() => {
                    this.$emit('input', false);
                }, this.holdTime);

                // 刷新时钟
                clearTimeout(this.intervalTimer);
                this._holdTime = Math.floor(this.holdTime / 1000);
                this.btnOkText = '确定 ' + this._holdTime + 's'
                this.intervalTimer = setInterval(() => {
                    if (0 < this._holdTime) {
                        this._holdTime--;
                        this.btnOkText = '确定 ' + this._holdTime + 's'
                    }
                }, 1000);

            }
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-alert {
    border-radius: $borderRadius;
    background: $background;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, .2);
    >.header {
        padding: 15px;
        >.title {
            margin: 0;
            font-size: $big;
        }
        >.btn-close {
            position: absolute;
            top: 20px;
            right: 10px;
        }
    }
    >.body {
        padding: $gutter;
        overflow: auto;
    }
    >.footer {
        padding: $gutter;
        overflow: hidden;
        border-top: 1px solid $lightest;
        .button-ok {
            width: 100%;
            text-align: center;
            display: block;
            color: $base;
            font-size: $normal;
        }
    }
}
</style>
