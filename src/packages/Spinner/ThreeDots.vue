<template>
    <div class="atom-three-dots">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
</template>
<script>
export default {
    name: 'AtomSpinnerThreeDots'
};
</script>

<style scoped lang=scss>
@import '../../scss/variables.scss';
@mixin loading() {
    @at-root& {
        overflow: hidden;
        text-align: center;
        display: inline-block;
        > div {
            width: 20px;
            height: 20px;
            background: $primary;
            border-radius: 100%;
            display: inline-block;
            animation: bouncedelay 1.4s infinite ease-in-out;
            /* Prevent first frame from flickering when animation starts */
            animation-fill-mode: both;
        }
        .bounce1 {
            animation-delay: -0.32s;
        }
        .bounce2 {
            animation-delay: -0.16s;
        }
    }
    @keyframes bouncedelay {
        0%,
        80%,
        100% {
            transform: scale(0);
        }
        40% {
            transform: scale(1);
        }
    }
}

.atom-three-dots {
    @include loading;
}
</style>
