<template>
    <main>
        <a-cell>
            <a-switch v-model="isSelect1">打开状态</a-switch>
        </a-cell>
        <a-cell>
            <a-switch v-model="isSelect2">关闭状态</a-switch>
        </a-cell>
        <a-cell>
            <a-switch v-model="isSelect3" :disabled="true">禁用状态的打开</a-switch>
        </a-cell>
        <a-cell>
            <a-switch v-model="isSelect4" :disabled="true">禁用情况的关闭</a-switch>
        </a-cell>
    </main>
</template>
<script>
import { ACell, ASwitch } from '@/packages'

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
        ACell,
        ASwitch
    }
}
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
</style>
