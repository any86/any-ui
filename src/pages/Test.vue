<template>
    <a-scroll-view>
        <a-popup :is-show.sync="isShow">
            <a-cell v-for="n in 70" :key="n+1000">第{{n+1000}}条</a-cell>
        </a-popup>
        <a-cell class="gutter-top">
            <a-button :is-block="true" type="success" @click="isShow=true">打开</a-button>
        </a-cell>
        <a-cell v-for="n in 70" :key="n">{{n}}</a-cell>
    </a-scroll-view>
</template>
<script>
export default {
    name: 'TabsDemo',

    data() {
        return {
            isShow: false
        };
    },

    methods: {},

};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
</style>
