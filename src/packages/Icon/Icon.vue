<template>
    <i v-on="$listeners" :class="['fa', 'fa-' + value]">
    </i>
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
        var value = this.$attrs.value;
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
// .fa{font-weight: 100;-webkit-text-stroke: 1px gray;color: white; font-size: 2em;}
</style>
