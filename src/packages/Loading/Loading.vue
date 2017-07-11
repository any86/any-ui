<template>
    <transition name="fade">
        <div class="component-loading">
            <VMask :value="value" class="mask" :background="'rgba(0,0,0,0)'">
                <div class="dialog">
                    <img src="../../assets/heart.svg" class="heart">
                    <p>LOADING</p>
                </div>
            </VMask>
        </div>
    </transition>
</template>
<script>
import VSpinner from '@/packages/Spinner/Spinner'
import VMask from '@/packages/Dialog/Mask'

export default {
    name: 'Loading',

    props: {
        value: {
            required: true
        }
    },

    mounted() {

    },

    data() {
        return {

        };
    },

    methods: {

    },

    components: {
        VSpinner,
        VMask
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-loading {
    position: fixed;
    z-index: $loadingZIndex;
    .mask {
        display: flex;
        justify-content: center;
        .dialog {
            border-radius: $borderRadius;
            min-height: 2.4rem;
            align-self: center;
            background: rgba(#000, .5);
            padding: 3*$gutter 6*$gutter;
            >img{display: block;width: 100%;}
            >p {
                text-align: center;color: $sub;font-size: $big;margin-top: $gutter*3;
            }
        }
    }
}

.heart {
    animation: heart 1200ms ease-in-out infinite;
}

@keyframes heart {
    0% {
        opacity: .6;
        // transform:translateY(5px) scale(1);
    }


    50% {
        opacity: 1;
        // transform:translateY(0) scale(1);
    }

    100% {
        opacity: .6;
        // transform:translateY(5px) scale(1);
    }
}


</style>
