<template>
    <transition name="fade">
        <div class="component-loading">
            <VMask :value="value" class="mask">
                <div class="dialog">
                    <VSpinner class="spinner"></VSpinner>
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
    z-index: 2;
    .mask {
        display: flex;
        justify-content: center;
        .dialog {
            border-radius: $borderRadius;
            height: 2rem;
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
