<template>
    <div class="component-spinner">
        <div class="loading">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
        <p align="center"><slot></slot></p>
    </div>
</template>
<script>
export default {
    name: 'Spinner'
}
</script>

<style scoped lang=scss>
@import '../../scss/theme.scss';
@mixin loading() {
    .loading {
        overflow: hidden;
        margin: .5rem auto;
        width: 150px;
        text-align: center;
        > div {
            width: 20px;
            height: 20px;
            background: $light;
            border-radius: 100%;
            display: inline-block;
            -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
            animation: bouncedelay 1.4s infinite ease-in-out;
            /* Prevent first frame from flickering when animation starts */
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }
        .bounce1 {
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
        }
        .bounce2 {
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
        }
    }
    @-webkit-keyframes bouncedelay {
        0%,
        80%,
        100% {
            -webkit-transform: scale(0.0)
        }
        40% {
            -webkit-transform: scale(1.0)
        }
    }
    @keyframes bouncedelay {
        0%,
        80%,
        100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        }
        40% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
        }
    }
}

.component-spinner {
    @include loading;
    p {
        margin-top: $gutter;
        font-size: $biggest;
        color: $dark;
    }
}
</style>
