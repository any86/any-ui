<template>
    <main class="fill">
        <a-button :is-ghost="true" :is-block="true" type="primary" @click="confirm" class="gutter-top">
            打开Confrim
        </a-button>
    </main>
</template>
<script>
export default {
    name: 'ConfrimDemo',

    methods: {
        confirm(){
            this.$confirm('喜欢atom吗?', {
                onOk(){
                    this.$alert('您选择了ok');
                },

                onCancel(){
                    this.$alert('您选择了cancel');
                }
            })
        }
    }
};
</script>
<style scoped lang="scss">
</style>
