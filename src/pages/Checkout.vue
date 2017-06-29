<template>
    <ScrollView v-model="scrollY" class="page-checkout">
        <LayoutHeader></LayoutHeader>
        <main>
            <div class="user-info">
                <div class="info">
                    <div class="contact">
                        <span class="name">Seven</span>
                        <span class="mobile">13813877821</span>
                    </div>
                    <div class="address">
                        <p>118 xjkljqw adssdlfjk #405</p>
                        <p>LA USA UK AK CK</p>
                    </div>
                </div>
            </div>
        </main>
        <footer></footer>
    </ScrollView>
</template>
<script>
import LayoutHeader from './Checkout/Header'
export default {
    name: 'Checkout',

    data() {
        return {
            scrollY: 0,
        };
    },

    mounted() {

    },

    methods: {

    },

    components: {
        LayoutHeader
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-checkout {
    main {
        >.user-info {
            >.info {
                >.contact {
                    >.name {
                        font-size: $biggest;
                    }
                    >.mobile {
                        font-size: $biggest;
                    }
                }
            }
        }
    }
}
</style>
