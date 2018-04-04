<template>
    <a-scroll-view class="full-screen">
        <a-group>
            <template slot="header">
                正常情况
            </template>

            <a-cell>
                <a-checkbox v-model="select1" :true-value="1" :false-value="2">选项1</a-checkbox>
            </a-cell>

            <a-cell>
                <a-checkbox v-model="select2" :true-value="1" :false-value="2">选项2</a-checkbox>
            </a-cell>

        </a-group>

        <a-group>
            <template slot="header">
                禁用状态
            </template>
            <a-cell>
                <a-checkbox v-model="select3" :true-value="1" :false-value="2" :disabled="true">选项1</a-checkbox>
            </a-cell>
            <a-cell>
                <a-checkbox v-model="select4" :true-value="1" :false-value="2" :disabled="true">选项2</a-checkbox>
            </a-cell>
        </a-group>
    </a-scroll-view>
</template>
<script>
import { ACell, AGroup, ACheckbox, AScrollView } from '@/packages'

export default {
    name: 'CheckboxDemo',

    data() {
        return {
            select1: 1,
            select2: 2,
            select3: 1,
            select4: 2,
        };
    },

    methods: {
        click(e) {
        }
    },

    components: {
        ACell,
        AGroup,
        ACheckbox,
        AScrollView
    }
}
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
</style>
