<template>
    <div class="atom-rate">
        <v-star v-for="n in count" :key="n" :type="value >= n ? 'full' : 'empty'" width="44" height="40"  @click="changeRate(n)"/>
    </div>
</template>
<script>
import VStar from '@/packages/Svg/Star';
export default {
    name: 'Rate',

    props: {
        count: {
            type: [Number, String],
            default: 5
        },

        value: {
            type: [Number, String],
            required: true,
            default: 1
        }

    },

    methods: {
        changeRate(n){
            this.$emit('input', n);
        }
    },

    components: { VStar }
};
</script>
<style lang="scss">
@import '../../scss/variables.scss';
.atom-rate {
    display: flex;
    >svg {
        flex: 1;
        transition: transform $duration, background $duration;
        &:active{
            transform: scale(.618);
        }
    }

}
</style>
