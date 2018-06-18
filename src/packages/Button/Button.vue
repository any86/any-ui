<template>
    <button v-ripple="hasRipple"  v-on="$listeners" :class="[`atom-btn--${theme}`]" class="atom-btn">
        <a-icon v-if="icon" class="atom-btn__icon" :name="icon" size="16"/>
        <slot></slot>
    </button>
</template>
<script>
import AIcon from '@/packages/Icon'
import { ripple } from '@/directives/ripple/index.js';
export default {
    name: 'AtomButton',

    components: {AIcon},

    directives: { ripple },
    
    props: {
        theme: {
            type: String,
            default: 'primary',
        },

        hasRipple: {
            type: Boolean,
            default: true,
        },

        icon: {
            type: String
        }
    },
};
</script>