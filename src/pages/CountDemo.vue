<template>
    <main>
        <v-cell :has-ripple="isOn">
            <v-count v-model="value"/>
        </v-cell>
        <!-- <div v-ripple="{duration: isOn ? 3000 : 300}" class="item">packages</div>
        <div v-ripple="{duration: isOn ? 200 : 3000}" class="item">packages2</div> -->

        <!-- <v-cell> -->
            <v-switch v-model="isOn">开启水波纹</v-switch>
        <!-- </v-cell> -->
    </main>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VCount from '@/packages/Count/Count';
import VSwitch from '@/packages/Switch/Switch';

export default {
    name: 'CountDemo',

    data() {
        return {
            value: 9,
            isOn: false
        };
    },

    mounted() {},

    components: {
        VCount,VSwitch,
        VCell
    }
};
</script>
<style scope lang="scss">
@import '../scss/theme.scss';
.item{padding:$gutter;
border:1px solid $lightest;
}
</style>
