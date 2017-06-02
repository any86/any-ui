<template>
    <div class="component-lazyload">

    </div>
</template>
<script>

export default {
    name: 'LazyLoad',

    props: {

    },

    mounted() {
        this.src = this.$el.getAttribute('src');
        syslog(this.src)
    },

    data() {
        return {
            src: '',
        };
    },

    methods: {
        input() {
        }
    },

    watch: {}

}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height : $gutter*8;
.component-lazyload {
   
}
</style>
