<template>
    <a-scroll-view class="fill-sm">
        <a-button-group>
            <a-button :is-ghost="true" type="warning">warning</a-button>
            <a-button :is-ghost="true" type="primary">primary</a-button>
            <a-button :is-ghost="true" type="success">success</a-button>
        </a-button-group>

        <a-button-group class="gutter-top">
            <a-button :is-ghost="true" type="info">info</a-button>
            <a-button :is-loading="true" :is-ghost="false" type="danger">danger</a-button>
        </a-button-group>
    </a-scroll-view>
</template>
<script>
import { AScrollView, AButton, AButtonGroup } from '@/packages'

export default {
    name: 'ButtonGroupDemo',

    data() {
        return {};
    },

    mounted() {},

    components: {
        AScrollView,
        AButton,
        AButtonGroup
    }
};
</script>
<style scope lang="scss">
@import '../scss/variables.scss';
</style>
