<template>
    <button v-ripple="hasRipple" :type="nativeType" v-on="$listeners" :class="className" class="atom-btn">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'AtomButton',

    props: {
        type: {
            type: String,
            default: 'primary'
        },

        nativeType: {
            type: String,
            default: 'button' // button / submit / reset
        },

        isBlock: {
            type: Boolean,
            default: false
        },

        isDisabled: {
            type: Boolean,
            default: false
        },

        hasRipple: {
            default: true
        },

        isGhost: {
            type: Boolean,
            default: false
        },

        isCircle: {
            type: Boolean,
            default: false
        },

        isRound: {
            type: Boolean,
            default: true
        },

        isLoading: {
            type: Boolean,
            default: false
        },

        size: {
            type: String,
            default: '' //sm
        }
    },

    computed: {
        className() {
            return {
                'atom-btn--disabled': this.isDisabled,
                ['atom-btn-' + this.type]: !this.isGhost && !this.isDisabled, // 标准按钮
                ['atom-btn-ghost-' + this.type]: this.isGhost && !this.isDisabled, // 幽灵按钮
                'atom-btn--block': this.isBlock,
                'atom-btn--round': this.isCircle,
                'atom-btn--loading': this.isLoading,
                'atom-btn--radius': !this.isBlock || this.isRound,
                'atom-btn--sm': 'sm' == this.size
            };
        }
    }
};
</script>