<template>
    <main>
        <v-cell>
            <v-switch v-model="isSelect1">正常情况</v-switch>
        </v-cell>
        <v-cell>
            <v-switch v-model="isSelect2" :disabled="true">禁用情况</v-switch>
        </v-cell>
    </main>
</template>
<script>
import VSwitch from '@/packages/Switch/Switch';
import VCell from '@/packages/Cell/Cell';
export default {
    name: 'SwitchDemo',

    data() {
        return {
            isSelect1: true,
            isSelect2: true

        };
    },

    components: {
        VCell, VSwitch
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
</style>
