<template>
    <div :class="['component-radio-group', disabled && 'disabled']">

    </div>
</template>
<script>

export default {
    name: 'RadioGroup',

    data() {
        return {}
    },

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        selfValue: {

        },

        value: {

        }
    },
    methods: {
        change() {
            if (!this.disabled) {
                this.$emit('input', this.selfValue);
            }
        }
    },

    computed: {
        isChecked() {
            return this.value == this.selfValue;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: .5rem;
.component-radio-group {
    
}
</style>
