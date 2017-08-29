<template>
    <div class="component-tooltip" v-on="$listeners">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Tooltip',

    props: {
        value: {
            type: Array
        }
    },
    data() {
        return {
            popper: null
        }
    },

    mounted() {
        var node = document.createElement('span');
        node.id = 'tooltip'
        document.body.appendChild(node);
        dir(this)
        // var component = this.constructor;
        // var vm = new component().$mount('#' + node.id);
    },

    methods: {
    },

    watch: {

    }
};
</script>
<style scoped lang="scss">
// @import '../../scss/theme.scss';
// .component-tooltip {}
</style>
