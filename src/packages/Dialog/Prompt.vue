<template>
    <div class="com-prompt">
        <h1>{{text}}</h1>
    </div>
</template>
<script>
export default {
    name: 'prompt',

    props: {
        text: {},

        value: {}
    },

    data() {
        return {
            show: true
        }
    },

    methods: {

    }
}
</script>
<style scoped lang=scss>
</style>
