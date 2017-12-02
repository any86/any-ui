<template>
    <v-scroll-view class="fill-sm">
        <v-button-gorup>
            <v-button :is-ghost="true" type="warning">warning</v-button>
            <v-button :is-ghost="true" type="primary">primary</v-button>
            <v-button :is-ghost="true" type="success">success</v-button>
        </v-button-gorup>

        <v-button-gorup class="gutter-top">
            <v-button :is-ghost="true" type="info">info</v-button>
            <v-button :is-loading="true" :is-ghost="true" type="danger">danger</v-button>
        </v-button-gorup>
    </v-scroll-view>
</template>
<script>
import VScrollView from '@/packages/ScrollView/ScrollView';
import VButton from '@/packages/Button/Button';
import VButtonGorup from '@/packages/Button/ButtonGroup';

export default {
    name: 'ButtonGroupDemo',

    data() {
        return {

        };
    },

    mounted() {},

    components: {
        VButton,
        VButtonGorup,VScrollView
    }
};
</script>
<style scope lang="scss">
@import '../scss/theme.scss';
</style>
