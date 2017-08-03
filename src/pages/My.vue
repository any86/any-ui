<template>
    <div class="page-my full-screen">
        <ScrollView v-model="scrollY" class="content">
            <LayoutCard></LayoutCard>
            <VCell class="section">
                My Order
                <VBadge class="badge" type="danger">10</VBadge>
            </VCell>
            <section class="section">
                <VCell class="item">SHIPPING ADDRESS</VCell>
                <VCell class="item">PNEDING PAYMENT</VCell>
                <VCell class="item">SHIPPED</VCell>
                <VCell class="item">FEEDBACK&FAQ</VCell>
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

    mounted() {

    },

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
            margin-top: $gutter * 3;
            .badge {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
            }
            >.item {
                border-bottom: 1px solid $lightest;
            }
        }
    }
}
</style>
