<template>
    <main>
        <v-group>
            <v-cell>
                <svg width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path :d="`M0 0 L50 50 L${num} 0 Z`" fill="#fc0" />
                </svg>
                <v-input v-model="num"></v-input>
            </v-cell>
        </v-group>
    </main>
</template>
<script>
import VInput from '@/packages/Input/Input';
import VCell from '@/packages/Cell/Cell';
import VGroup from '@/packages/Group/Group';
export default {
    name: 'SvgDemo',

    data() {
        return {
            num: 100,
        };
    },

    methods: {
        click(e) {
        }
    },

    components: {
        VCell, VInput, VGroup
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';

path {
    transition: all 1000ms;
}
</style>
