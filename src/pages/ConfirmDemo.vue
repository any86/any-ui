<template>
    <v-scroll-view class="flex">
        <v-button :is-ghost="true" type="primary" @click="$confirm('hello atom ?')" class="gutter flex-item--center">
            Confirm
        </v-button>
    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VButton from '@/packages/Button/Button';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'ConfrimDemo',

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
