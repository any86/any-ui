<template>
    <div class="component-accordion-item">
        <header @click="toggle">
            <Icon :class="['angle', value && 'down']" value="angle-right"></Icon>
            <span class="title">
                <slot name="header"></slot>
            </span>
        </header>
        <template v-if="isAnimate">
            <transition :css="false" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
                <div v-show="value" :class="['body', value && 'border']">
                    <div class="content">
                        <slot name="body"></slot>
                    </div>
                </div>
            </transition>
        </template>
        <template v-else>
            <div v-show="value" :class="['body', value && 'border']">
                <div class="content">
                    <slot name="body"></slot>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import Icon from '@/packages/Icon/Icon'
export default {
    name: 'AccordionItem',

    props: {
        value: {
            type: Boolean,
            default: false
        },

        speed: {
            type: Number,
            default: 300
        },

        isAnimate: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            padding: 0,
        };
    },

    methods: {
        beforeEnter(el) {
            el.style.height = 0;
        },

        enter(el, done) {
            el.style.height = el.scrollHeight + 'px';
        },


        beforeLeave(el) {
            el.style.height = 0;
            el.style.height = el.scrollHeight + 'px';
        },

        leave(el, done) {
            el.style.height = 0;
        },

        toggle() {
            this.$emit('input', !this.value);
        }
    },

    components: {
        Icon
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-accordion-item {
    position: relative;
    >header {
        font-size: .26rem;
        display: flex;
        padding: 3*$gutter;
        border-bottom: 1px solid $lighter;
        >.title {
            margin-left: .15rem;
            font-size: inherit;
            line-height: .3rem;
            flex: 1
        }

        >.angle {
            font-size: inherit;
            transition: all .3s ease-in-out;
            &.down {
                transform: rotate(90deg);
            }
        }
    }
    >.body {
        will-change: transform;
        overflow: hidden;
        font-size: $normal;
        line-height: 1.5;
        height: 100%;
        transition-property: height;
        transition-timing-function: ease-in-out;
        transition-duration: 300ms;
        &.border {
            border-bottom: 1px solid $lighter;
        }
        >.content {
            will-change: transform;
        }
    }
}
</style>
