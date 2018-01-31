<template>
    <div :readonly="isReadOnly" class="atom-rate">
        <v-icon v-for="n in count" :key="'atom-star-'+n" :value="value < n ? 'star-o' : 'star'" :size="size"  @click="changeRate(n)" class="svg-icon"/>
    </div>
</template>
<script>
import VIcon from '../../packages/Icon';
export default {
    name: 'AtomRate',

    props: {
        count: {
            type: [Number, String],
            default: 5
        },

        size: {
            default: 40
        },

        isReadOnly: {
            type: Boolean,
            default: false
        },

        value: {
            type: [Number, String],
            required: true,
            default: 1
        }
    },

    methods: {
        changeRate(n) {
            this.$emit('input', n);
        }
    },

    components: { VIcon }
};
</script>
<style lang="scss">
@import '../../scss/variables.scss';
.atom-rate {
    display: flex;
    > .svg-icon {
        flex: 1;
    }

    &:not([readonly]) {
        > .svg-icon {
            transition: transform $duration, background $duration;
            &:active {
                transform: scale(0.618);
            }
        }
    }
}
</style>
