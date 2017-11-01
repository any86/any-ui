<template>
    <v-mask :isShow="isShow" class="atom-mask" background="rgba(0,0,0,.5})">
        <transition name="zoom" @after-enter="afterEnter">
            <div v-show="isShow" class="atom-mask__body">
                <v-android></v-android>
                <p class="body__text">LOADING</p>
            </div>
        </transition>
    </v-mask>
</template>
<script>
import VMask from '@/packages/Dialog/Mask';
import VAndroid from '@/packages/Spinner/Android';

export default {
    name: 'Loading',

    data() {
        text: 'loading';
    },

    render(){

    },

    mounted() {
        dir(this.$createElement('v-android'));
    },

    data() {
        return { isShow: false, afterEnterCallback: null };
    },

    methods: {
        afterEnter() {
            this.afterEnterCallback();
        }
    },

    components: {
        VMask,
        VAndroid
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-mask {
    position: fixed;
    z-index: $loadingZIndex;
    display: flex;
    justify-content: center;
    &__body {
        border-radius: $borderRadius;
        align-self: center;
        background: rgba(#fff, 1);
        box-shadow: $shadowDown;
        padding: $gutter 2*$gutter;
        border: 1px solid $lightest;
        > .body__text {
            text-align: center;
            color: $darkest;
            font-size: $normal;
            margin-top: $gutter;
        }
    }
}
</style>
