<template>
    <transition name="prompt" @after-leave="afterLeave">
        <div v-show="show" class="component-prompt" :style="{width: width}">
            <div class="header">
                <h1 class="title" v-html="title"></h1>
            </div>
            <div class="body">
                <div v-if="'' != text" v-html="text"></div>
                <input ref="input" :value="value" @input="input($event.target.value)" @focus="focus" class="input" placeholder="请输入">
            </div>
            <div class="footer">
                <a class="button" @click="cancel">取消</a>
                <a class="button" @click="ok">确定</a>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Prompt',

    props: {
        show: {
            type: Boolean
        },

        value: {
            
        },

        width: {
            default: '90%'
        },

        text: {
            type: [String, Number]
        },

        title: {
            type: String,
            default: '请输入'
        },

        holdTime: {
            type: Number,
            default: 3000
        },

        lock: {
            type: Boolean
        }
    },

    data(){
        return {};
    },

    methods: {
        focus(){
            this.$refs.input.select();
        },

        input(value){
            this.$emit('input', value);
        },

        ok() {
            this.$emit('ok');
            this.$emit('input', this.$refs.input.value);
            this.$emit('update:show', false);
        },

        afterLeave() {
            this.$emit('after-leave');
        },

        cancel() {
            this.$emit('cancel');
            this.$emit('update:show', false);
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-prompt {
    border-radius: 4px;
    background: #fff;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, .2);
    >.header {
        padding: 3*$gutter;
        >.title {
            margin: 0;
            font-size: 16px;
        }
    }
    >.body {
        padding:2*$gutter;
        div{padding: $gutter;}
        .input{padding: 1.2*$gutter;border:1px solid $lightest;width: 100%;box-sizing: border-box;transition:border .3s;
            &:focus{border:1px solid $base;}
        }
    }
    >.footer {
        overflow: hidden;
        display: flex;
        border-top:1px solid $lightest;
        .button{flex:1;line-height: 40px;text-align: center;}
        .button:first-child{border-right: 1px solid $lightest;}
        .button:last-child{color: $base;}
    }
}

// 动画
.prompt-enter-active {
    animation: prompt-in .5s;
}

.prompt-leave-active {
    animation: prompt-out .5s;
}

@keyframes prompt-in {
    0% {
        opacity: 0;
        transform: translateY(15px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes prompt-out {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(15px);
    }
}
</style>
