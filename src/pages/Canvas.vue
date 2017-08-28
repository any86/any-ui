<template>
    <ScrollView v-model="scrollY" class="page-canvas">
        <VToolTip>
            <VInput ref="input" v-model="a" class="border"></VInput>
        </VToolTip>
    </ScrollView>
</template>
<script>
import VToolTip from '@/packages/Tooltip/Tooltip';
import VInput from '@/packages/Input/Input';
export default {
    name: 'Canvas',

    data() {
        return {
            scrollY: 0,
            a: '123'
        }
    },

    mounted() {

    },

    methods: {

    },
    components: { VInput, VToolTip }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
</style>
