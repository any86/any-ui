<template>
    <ScrollView v-model="scrollY">
        <section v-for="n in 10">
            <div class="img"></div>
            <h3>components-A-{{n}}</h3>
            <small>tabs-A-{{n}}</small>
        </section>
    </ScrollView>
</template>
<script>
export default {
    name: 'New',

    data() {
        return {
            scrollY: 0
        }
    },

    mounted() {


    },

    components: {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
section {
    padding: 3*$gutter 3*$gutter 0 3*$gutter;
    >.img {
        height: 3.37rem;
        background: $lighter;
    }
    >h3 {}
    >small {
        color: $light;
        font-size: $big;
    }
}
</style>
