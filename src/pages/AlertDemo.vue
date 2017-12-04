<template>
    <v-scroll-view>
        <v-button :is-ghost="true" @click="$alert('hello atom !')" class="gutter">
            hello atom
        </v-button>
    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VButton from '@/packages/Button/Button';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'AlertDemo',

    data() {
        return {

        };
    },

    components: {
        VButton,
        VCell,
        VScrollView
    }
};
</script>
<style scoped lang="scss">

</style>
