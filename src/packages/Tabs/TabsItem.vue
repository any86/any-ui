<template>
    <div v-show="isShow" class="component-tabs-item">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'TabsItem',

    mounted() {
        this.StringProps.title = this.$el.getAttribute('title');
        this.$parent.titles.push(this.StringProps.title);
        this.$parent.count++;
    },

    data() {
        return {
            StringProps: {
                title: '',
            },
            isShow: false
        };
    }
}
</script>
<style scoped lang="scss">
</style>
