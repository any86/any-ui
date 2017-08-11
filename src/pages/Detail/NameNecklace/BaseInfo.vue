<template>
    <section class="row row-info-base">
        <h3>Shell Locket Photo Charm</h3>
        <div class="line"></div>
        <div class="price">
            <span class="old">$65.00</span>
            <span class="new">$40.00</span>
        </div>
        <p>you save $54.00</p>
    </section>
</template>
<script>
export default {
    name: 'BaseInfo'
}
</script>
<style scoped lang="scss">
@import '../../../scss/theme.scss';
.row-info-base {
    .price {
        padding: $gutter / 2 0;
        .old {
            color: $darkest;
            text-decoration: line-through;
        }
        .new {
            color: $danger;
            margin-left: $gutter;
        }
    }
}
</style>
