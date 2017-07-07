<template>
    <section class="banner">
        <div class="button-group">
            <button @click="change(0)">Log In</button>
            <button @click="change(1)">Sign Up</button>
        </div>
        <span class="arrow" :class="{left: 0 == value, right: 1 == value}"></span>
    </section>
</template>
<script>
export default {
    name: 'Banner',

    props: {
        value: {
            type: Number
        }
    },

    methods: {
        change(index) {
            this.$emit('input', index);
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.banner {
    height: 3rem;
    width: 100%;
    background: $lighter;
    position: relative;
    >.button-group {
        position: absolute;
        bottom: .2rem;
        display: flex;
        width: 100%;
        height: 1rem;
        button {
            flex: 1;
            display: inline-block;
            color: $sub;
            font-size: $bigger;
        }
    }
    >.arrow {
        position: absolute;
        bottom: 0;
        width: 0;
        height: 0;
        border-left: .15rem solid transparent;
        border-right: .15rem solid transparent;
        border-bottom: .22rem solid $sub;
        transition: all .3s;
        &.right {
            left: 75%;
        }
        &.left {
            left: 25%;
        }
    }
}
</style>
