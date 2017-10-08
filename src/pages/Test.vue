<template>
    <p @click="xxx">{{text}}</p>
</template>
<script>

export default {
    name: 'Test',

    data() {
        return {
            text: 'hello world'
        };
    },

    methods: {
        xxx: function(){
            this.text = 'hello china'
        }
    }
}
</script>
<style scoped lang="scss">

</style>
