<template>
        <button class="button button-block button-danger" @click="ok">preview</button>
</template>
<script>

export default {
    name: 'Canvas',

    data() {
        return {

        }
    },

    async mounted() {
      
    },

    methods: {
        ok() {
            this.$prompt('张三');
        }
    },
    components: {}
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
</style>
