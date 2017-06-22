<template>
    <transition name="fadeUp" @after-leave="afterLeave">
        <div v-show="value" class="component-confirm" :style="{width}">
            <div class="header">
                <h1 class="title" v-html="title"></h1>
            </div>
            <div class="body" v-html="text"></div>
            <div class="footer">
                <a class="button" @click="cancel">取消</a>
                <a class="button" @click="ok">确定</a>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Confirm',

    props: {
        value: {
            type: Boolean
        },

        width: {
            default: '90%'
        },

        text: {
            type: [String, Number]
        },

        title: {
            type: String,
            default: '提示'
        },

        holdTime: {
            type: Number,
            default: 3000
        },

        lock: {
            type: Boolean
        }
    },

    methods: {
        ok() {
            this.$emit('ok');
            this.$emit('input', false);
        },

        afterLeave() {
            this.$emit('after-leave');
        },

        cancel() {
            this.$emit('cancel');
            this.$emit('input', false);
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
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-confirm {
    border-radius: 4px;
    background: $background;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, .2);
    >.header {
        padding: 2*$gutter;
        >.title {
            margin: 0;
            font-size: $bigger;
        }
    }
    >.body {
        padding: 4*$gutter;
        font-size: $big;
    }
    >.footer {
        display: flex;
        overflow: hidden;
        border-top: 1px solid $lightest;
        .button {
            flex: 1;
            line-height: 40px;
            text-align: center;
            font-size: $big;
        }
        .button:first-child {
            border-right: 1px solid $lightest;
        }
        .button:last-child {
            color: $base;
        }
    }
}
</style>
