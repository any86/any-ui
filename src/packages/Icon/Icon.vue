<template>
    <i :class="['fa', 'fa-' + value]"></i>
</template>
<script>
export default {
    name: 'Icon',

    data(){
        return {value: ''};
    },

    mounted(){
        var value = this.$el.getAttribute('value');
        this.value = value.replace(' ', 'fa-');
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.fa{color:$dark;}
</style>
