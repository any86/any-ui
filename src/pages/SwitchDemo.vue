<template>
    <main>
        <v-cell>
            <v-switch v-model="isSelect1">打开状态</v-switch>
        </v-cell>
        <v-cell>
            <v-switch v-model="isSelect2">关闭状态</v-switch>
        </v-cell>
        <v-cell>
            <v-switch v-model="isSelect3" :disabled="true">禁用状态的打开</v-switch>
        </v-cell>
        <v-cell>
            <v-switch v-model="isSelect4" :disabled="true">禁用情况的关闭</v-switch>
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
            isSelect2: false,
            isSelect3: true,
            isSelect4: false,
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
