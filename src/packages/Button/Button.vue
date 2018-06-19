<template>
    <button v-ripple="hasRipple" :type="nativeType"  v-on="$listeners" :class="[`atom-btn--${type}`]" class="atom-btn">
        <a-icon v-if="icon" class="atom-btn__icon" :name="icon" size="16"/>
        <slot></slot>
    </button>
</template>
<script>
import AIcon from '@/packages/Icon';
import { ripple } from '@/directives/ripple/index.js';
export default {
    name: 'AtomButton',

    components: { AIcon },

    directives: { ripple },

    props: {
        type: {
            type: String,
            default: 'primary',
        },

        nativeType: {
            type: String,
            default: 'button', // submit reset ...
        },

        hasRipple: {
            type: Boolean,
            default: true,
        },

        icon: {
            type: String,
        },
    },
};
</script>