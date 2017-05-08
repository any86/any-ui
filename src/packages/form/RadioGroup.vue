<template>
    <div class="com-radio-group">
        <div class="group">
            <v-radio v-for="radio in opts.children" :key="radio.value" @input="select" :value="value" :opts="radio" :disabled="radio.disabled">
            </v-radio>
        </div>
    </div>
</template>
<script>
import VRadio from './Radio'

export default {
    name: 'RadioGroup',

    props: {
        opts: {
            type: Object
        },
        value: {

        }
    },

    components: {
        VRadio
    },

    methods: {
        select: function(value) {
            this.$emit('input', value);
        }
    }
}
</script>
<style scoped lang=scss>
.com-radio-group {
    .group {
        margin-top: 19px;
    }
}
</style>
