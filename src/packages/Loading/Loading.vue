<template>
    <transition name="fade">
        <div class="component-loading">
            <VMask :value="value" class="mask" :background="'rgba(255,255,255,.8)'">
                <div class="dialog">
                    <VSpinner class="spinner">
                        loading
                    </VSpinner>
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
            display: inline-flex;
            justify-content: center;
            .spinner {
                align-self: center;
            }
        }
    }
}
</style>
