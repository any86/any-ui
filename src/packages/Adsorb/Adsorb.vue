<template>
    <div class="component-adsorb" :style="{height}" v-on="$listeners">
        <div ref="main" :class="{'component-adsorb-fixed': scrollY > top}">
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
            height: 0,
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.top = this.$el.getBoundingClientRect().top;
            this.height = this.$refs.main.offsetHeight;
            this.$emit('mounted', {top: this.top});
        });
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
