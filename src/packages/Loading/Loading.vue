<template>
    <v-mask :isShow="isShow" class="atom-mask" :style="{background, zIndex}">
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
    name: 'AtomLoading',

    props: {
        isShow: {
            type: Boolean,
            default: false
        },

        background: {
            type: String,
            default: 'rgba(0,0,0,0)'
        },

        zIndex: {
            type: Number,
            default: 1986
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
