<template>
    <i class="atom-spinner-ripple"></i>
</template>
<script>
export default {
    name: 'AtSpinnerRipple',

    props: {}
};
</script>

<style scoped lang=scss>
@import '../../scss/variables.scss';
$size: .6rem;
.atom-spinner-ripple {
    display: inline-block;
    width: $size;
    height: $size;
    background: $base;
    border-radius: 100%;
    animation: ripple 1s 0s ease-in-out infinite;
}

@keyframes ripple {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>
