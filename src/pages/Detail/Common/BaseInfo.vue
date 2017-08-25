<template>
    <section class="row row-info-base">
        <h4>Shell Locket2a Photo CharmShell Locket2a Photo Charm</h4>
        <span>sku: 100</span>
        <div class="divider gutter"></div>
        <div class="price">
            <span>Retail Price : </span>
            <span class="old"> $265.00</span>
            <span>Your Price : </span>
            <span class="new">$140.00</span>
        </div>
        <div class="clearfix">
            <p class="pull-left">you save $54.00</p>
            <VCountdown class="pull-right" :value="300000"></VCountdown>
        </div>
        <span v-for="n in 3" :key="n" class="tag-success">news{{n}}</span>

    </section>
</template>
<script>
import VCountdown from '@/packages/Countdown/Countdown'
export default {
    name: 'BaseInfo',

    components: { VCountdown }
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
            margin-right: $gutter;
        }
        .new {
            color: $danger;
        }
    }
}
</style>
