<template>
    <div :readonly="isReadOnly" class="atom-rate">
        <v-icon v-for="n in count" :key="`atom-star-${n}`" :name="getComponentName(n)"  :size="size" @click.native="changeRate(n)" class="svg-icon"/>
    </div>

</template>
<script>
import VIcon from '../../packages/Icon';
export default {
    name: 'AtomRate',

    props: {
        count: {
            type: [Number, String],
            default: 5,
        },

        size: {
            default: 24,
        },

        isReadOnly: {
            type: Boolean,
            default: false,
        },

        value: {
            type: [Number, String],
            required: true,
            default: 0,
        },

        theme: {
            type: String,
            default: '', //可选值: 3d
        },
    },

    methods: {
        getComponentName(n) {
            if (0 <= this.value - n) {
                return ['star', this.theme].join('');
            } else if (-0.5 <= this.value - n) {
                return ['star-half', this.theme].join('');
            } else {
                return ['star-o', this.theme].join('');
            }
        },

        changeRate(n) {
            this.$emit('input', n);
        },
    },

    components: { VIcon},
};
</script>