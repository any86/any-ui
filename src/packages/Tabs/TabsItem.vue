<template>
    <div v-show="isShow" class="component-tabs-item">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'TabsItem',

    mounted() {
        this.title = this.$el.getAttribute('title');
        this.$parent.titles.push(this.title);
        this.$parent.count++;
    },

    data() {
        return {
            title: '',
            isShow: false
        };
    },

    components: {}
}
</script>
<style scoped lang="scss">
</style>
