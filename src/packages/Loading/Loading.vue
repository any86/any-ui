<template>
    <v-mask :isShow="isShow" class="atom-loading" :style="{background, zIndex}">
        <transition name="zoom">
            <div v-show="isShow" class="atom-loading__body">
                <v-android></v-android>
            </div>
        </transition>
    </v-mask>
</template>
<script>
import VMask from '@/packages/Mask';
import VAndroid from '@/packages/Spinner/Android';

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