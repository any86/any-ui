<template>
    <div class="page-my full-screen">
        <ScrollView v-model="scrollY" class="content">
            <LayoutCard></LayoutCard>
            <VCell border class="section">
                My Order
                <VBadge class="badge" type="danger">10</VBadge>
            </VCell>
            <section class="section">
                <VCell border>SHIPPING ADDRESS</VCell>
                <VCell border>PNEDING PAYMENT</VCell>
                <VCell border>SHIPPED</VCell>
                <VCell border>FEEDBACK&FAQ</VCell>
            </section>
        </ScrollView>
    </div>
</template>
<script>
import VInput from '@/packages/Input/Input'
import VCell from '@/packages/Cell/Cell'
import VBadge from '@/packages/Badge/Badge'

import LayoutCard from './My/Card'

export default {
    name: 'My',

    data() {
        return {
            index: 1,
            scrollY: 0
        }
    },

    methods: {
        change(page) {
            this.index = page;
        }
    },

    components: {
        VInput,
        LayoutCard,
        VCell,
        VBadge
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-my {
    background: #efefef;
    display: flex;
    flex-direction: column;
    .content {
        flex: 1;
        .section {
            margin-top: $gutter;
            .badge {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
            }
        }
    }
}
</style>
