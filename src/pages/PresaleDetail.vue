<template>
    <div class="page-presale-detail full-screen">

        <ScrollView v-model="scrollY" class="content">
            123
        </ScrollView>
        <LayoutFooter></LayoutFooter>
    </div>
</template>
<script>
import LayoutFooter from './PresaleDetail/Header'
export default {
    name: 'PresaleDetail',

    data() {
        return {
            scrollY: 0
        };
    },

    mounted() {

    },

    methods: {

    },

    components: {
        LayoutFooter

    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-presale-detail {display: flex;

    .content{flex:1;}
}
</style>
