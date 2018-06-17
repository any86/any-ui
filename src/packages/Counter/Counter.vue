<template>
    <span :class="{'atom-count--disabled': isDisabled}" class="atom-count">
        <a-icon name="minus" size="24" class="atom-count__btn atom-count__btn-minus" :class="{'atom-count__btn--disabled': min == value}" @click="minus"/>
        
        <span class="atom-count__content" v-on="$listeners">{{value}}</span>

        <a-icon name="plus" size="24" class="atom-count__btn atom-count__btn-plus" :class="{'atom-count__btn--disabled': max == value}" @click="plus"/>
    </span>
</template>
<script>
import AIcon from '../Icon'
export default {
    name: 'AtomCount',

    props: {
        hasRipple: {
            type: Boolean,
            default: true
        },

        isDisabled: {
            type: Boolean,
            default: false
        },

        min: {
            type: Number,
            default: 1
        },

        max: {
            type: Number,
            default: 10
        },

        step: {
            type: Number,
            default: 1
        },

        value: {
            type: [Number, String],
            required: true
        }
    },

    methods: {
        minus() {
            const number = parseInt(this.value);
            if (this.min < number) {
                this.$emit('input', Math.max(this.min, number - this.step));
            } else {
                this.$emit('reachMin');
            }
        },

        plus() {
            const number = parseInt(this.value);
            if (this.max > number) {
                this.$emit('input', Math.min(this.max, number + this.step));
            } else {
                this.$emit('reachMax');
            }
        }
    },

    components: {AIcon}
};
</script>