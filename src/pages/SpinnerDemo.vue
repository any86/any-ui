<template>
    <main class="demo-page">
        <v-cell>
            ripple <v-spinner-ripple slot="extra"/>
        </v-cell>

        <v-cell>
            android
            <v-spinner-android slot="extra"/>
        </v-cell>

        <v-cell>
            three-dots
            <v-spinner-three-dots slot="extra"/>
        </v-cell>
    </main>
</template>
<script>
import VSpinnerRipple from '@/packages/Spinner/Ripple';
import VSpinnerAndroid from '@/packages/Spinner/Android';
import VSpinnerThreeDots from '@/packages/Spinner/ThreeDots';
import VCell from '@/packages/Cell/Cell';
export default {
    name: 'SpinnerDemo',

    data() {
        return {};
    },

    methods: {},

    computed: {},

    components: {
        VSpinnerRipple,
        VSpinnerAndroid,
        VSpinnerThreeDots,
        VCell
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
