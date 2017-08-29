<template>
    <div class="component-adsorb" v-on="$listeners">
        <div ref="main" :class="{'component-adsorb-fixed': 10 > top}">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Adsorb',

    props: {
        scrollY: {

        }
    },

    data() {
        return {
            top: 0,
        };
    },

    mounted() {
        this.top = this.$el.getBoundingClientRect().top;
        this.$emit('mounted', {top: this.top});
    },

    watch: {
        scrollY(value) {
            this.top = this.$el.getBoundingClientRect().top;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-adsorb {
    position: relative;

    &-fixed {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
    }
}
</style>
