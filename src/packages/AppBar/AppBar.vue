<template>
    <header class="atom-app-bar">
        <span class="bar__left">
            <a-icon 
                v-ripple="true" 
                :size="24" 
                value="arrow" 
                style="transform: rotate(180deg)"
                @click="clickArrow" />
            <slot name="left"></slot>
        </span>
        <span class="bar__center">
            <slot></slot>
        </span>
        <span class="bar__right">
            <slot name="right"></slot>
        </span>
    </header>
</template>
<script>
import AIcon from '../Icon';
export default {
    name: 'AtomAppBar',

    props: {
        isRouterBack: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        clickArrow() {
            if (this.isRouterBack) {
                this.$router.back();
            } else {
                this.$emit('click-arrow');
            }
        }
    },

    components: { AIcon }
};
</script>