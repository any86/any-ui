<template>
    <i :class="['fa', 'fa-' + value]"></i>
</template>
<script>
export default {
    name: 'Icon',

    data() {
        return {
            value: ''
        };
    },

    mounted() {
        var value = this.$el.getAttribute('value');
        // 判断是否没传值
        if (null !== value) {
            if (-1 !== value.indexOf(' ')) {
                this.value = value.replace(' ', ' fa-');
            } else {
                this.value = value;
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
</style>
