<template>
    <v-scroll-view class="flex">
        <v-button :is-ghost="true" type="primary" @click="$confirm('喜欢atom吗?')" class="gutter flex-item--center">
            打开
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
