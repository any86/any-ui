<template>
    <main>
        <v-cell>
            <v-radio v-model="select1" :value="1">正常情况1</v-radio>
        </v-cell>
        <v-cell>
          <v-radio v-model="select1" :value="2">正常情况2</v-radio>
        </v-cell>


        <v-cell>
            <v-radio v-model="select2" :value="1" :disabled="true">禁用状态的打开</v-radio>
        </v-cell>
        <v-cell>
            <v-radio v-model="select2" :value="2" :disabled="true">禁用情况的关闭</v-radio>
        </v-cell>
    </main>
</template>
<script>
import VRadio from '@/packages/Radio/Radio';
import VCell from '@/packages/Cell/Cell';
export default {
    name: 'RadioDemo',

    data() {
        return {
            select1: 1,
            select2: 1,

        };
    },

    components: {
        VCell, VRadio
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
</style>
