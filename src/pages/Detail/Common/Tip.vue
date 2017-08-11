<template>
    <div class="row row-tip">
        <span>We now support </span>
        <img src="https://static.soufeel.com/skin/frontend/smartwave/default/custom/static/brand/activity/product/view/pp-logo.png">
        <p>Buy now and pay over time.
            <a class="text-info">Learn More</a>
        </p>
        <div class="divider"></div>
        <p class="text-danger">This item requires 3-5 days to handcraft.</p>
    </div>
</template>
<script>
export default {
    name: 'Tip'
}
</script>
<style scoped lang="scss">
@import '../../../scss/theme.scss';
.row-tip {
    span {
        color: $darkest;
        font-size: $small;
        display: inline-block;
        vertical-align: top;
        height: .5rem;
        line-height: .5rem;
    }
    img {
        display: inline-block;
        vertical-align: top;
        height: .5rem;
    }

    p {
        font-size: $small;
        color: $darkest;
        a {
            font-size: $small;
            color: $info;
            color: $darkest;
        }
    }
}
</style>
