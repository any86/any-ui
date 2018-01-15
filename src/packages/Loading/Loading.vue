<template>
    <v-mask :isShow="isShow" class="atom-mask" style="background: rgba(0,0,0,0);">
        <transition name="zoom">
            <div v-show="isShow" class="atom-mask__body">
                <v-android></v-android>
            </div>
        </transition>
    </v-mask>
</template>
<script>
import VMask from '../../packages/Mask/Mask';
import VAndroid from '../../packages/Spinner/Android';

export default {
    name: 'Loading',

    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },

    components: {
        VMask,
        VAndroid
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-mask {
    position: fixed;
    z-index: $loadingZIndex;
    display: flex;
    justify-content: center;
    
    &__body {
        border-radius: $radius;
        align-self: center;
        background: rgba(#000, .8);
        padding: $gutter;
        border: 1px solid $lightest;
        box-shadow: $shadowDown;
        > .body__text {
            text-align: center;
            color: $darkest;
            font-size: $normal;
            margin-top: $gutter;
        }
    }
}
</style>
