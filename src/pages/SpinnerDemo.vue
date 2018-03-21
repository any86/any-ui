<template>
    <main class="demo-page">
        <a-cell>
            ripple <a-spinner-ripple :type="type" slot="extra"/>
        </a-cell>

        <a-cell>
            android
            <a-spinner-android :type="type"  slot="extra"/>
        </a-cell>

        <a-cell>
            three-dots
            <a-spinner-three-dots :type="type" slot="extra"/>
        </a-cell>

        <h4 class="fill">主题色</h4>
        <section class="flex-row">
            <a-radio class="fill flex-fill" v-model="type" type="primary" value="primary"></a-radio>
            <a-radio class="fill flex-fill" v-model="type" type="success" value="success"></a-radio>
            <a-radio class="fill flex-fill" v-model="type" type="info" value="info"></a-radio>
            <a-radio class="fill flex-fill" v-model="type" type="warning" value="warning"></a-radio>
        </section>
    </main>
</template>
<script>
export default {
    name: 'SpinnerDemo',

    data(){
        return {type: 'primary'};
    },
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
