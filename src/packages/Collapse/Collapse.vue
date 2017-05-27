<template>
    <div class="component-accordion">
        <header @click="toggle">
            <span class="title">
                <slot name="header"></slot>
            </span>
            <Icon class="icon" value="angle-right"></Icon>
        </header>
        <main v-show="value">
            <slot name="body"></slot>
        </main>
    </div>
</template>
<script>
import Icon from '@/packages/Icon/Icon'
export default {
    name: 'Accordion',

    props: {
        value: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
        };
    },

    methods: {
        toggle(){
            this.$emit('input' ,!this.value);
        }
    },

    components: {
        Icon
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-accordion{
    position: relative;

    >header{
        font-size: .3rem;display: flex;padding: 2*$gutter;border-bottom:1px solid $lighter;
        >.title{font-size: inherit; line-height: .3rem;flex:1}
    }

    >main{padding: 2*$gutter 4*$gutter;border-bottom: 1px solid $lighter;font-size: .3rem;line-height: 1.5;transition: all 1s;height: 100%;}
}
</style>
