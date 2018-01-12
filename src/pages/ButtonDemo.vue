<template>
    <v-scroll-view class="fill-sm">

        <v-group title="标准">
            <v-button type="primary" class="gutter-sm">primary</v-button>
            <v-button type="success" class="gutter-sm">success</v-button>
            <v-button type="info" class="gutter-sm">info</v-button>
            <v-button type="warning" class="gutter-sm">warning</v-button>
            <v-button type="danger" class="gutter-sm">danger</v-button>
            <v-button type="darkest" class="gutter-sm">darkest</v-button>
            <v-button type="darker" class="gutter-sm">darker</v-button>
            <v-button type="dark" class="gutter-sm">dark</v-button>
            <v-button type="light" class="gutter-sm">light</v-button>
            <v-button type="lighter" class="gutter-sm">lighter</v-button>
            <v-button type="lightest" class="gutter-sm">lightest</v-button>
        </v-group>

        <v-group title="禁用">
            <v-button :is-ghost="true" :is-disabled="true" type="warning" class="gutter-sm">warning</v-button>
            <v-button :is-round="true" :is-disabled="true" type="success" class="gutter-sm">success</v-button>
            <v-button :is-disabled="true" type="info" class="gutter-sm">info</v-button>
        </v-group>

        <v-group title="加载中">
            <v-button :is-loading="true" :is-ghost="true" type="warning" class="gutter-sm">warning</v-button>
            <v-button :is-loading="true" :is-round="true" type="success" class="gutter-sm">success</v-button>
            <v-button :is-loading="true" type="info" class="gutter-sm">info</v-button>
        </v-group>

        <v-group title="幽灵按钮">
            <v-button :is-ghost="true" class="gutter-sm">default</v-button>
            <v-button :is-ghost="true" type="primary" class="gutter-sm">primary</v-button>
            <v-button :is-ghost="true" type="success" class="gutter-sm">success</v-button>
            <v-button :is-ghost="true" type="info" class="gutter-sm">info</v-button>
            <v-button :is-ghost="true" type="warning" class="gutter-sm">warning</v-button>
            <v-button :is-ghost="true" type="danger" class="gutter-sm">danger</v-button>
            <v-button :is-ghost="true" type="dark" class="gutter-sm">darkest</v-button>
            <v-button :is-ghost="true" type="dark" class="gutter-sm">darker</v-button>
            <v-button :is-ghost="true" type="dark" class="gutter-sm">dark</v-button>
            <v-button :is-ghost="true" type="light" class="gutter-sm">light</v-button>
            <v-button :is-ghost="true" type="light" class="gutter-sm">lighter</v-button>
            <v-button :is-ghost="true" type="light" class="gutter-sm">lightest</v-button>
        </v-group>

        <v-group title="圆角">
            <v-button :is-round="true" type="primary" class="gutter-sm">primary</v-button>
            <v-button :is-round="true" type="success" class="gutter-sm">success</v-button>
            <v-button :is-round="true" type="info" class="gutter-sm">info</v-button>
            <v-button :is-round="true" type="warning" class="gutter-sm">warning</v-button>
            <v-button :is-round="true" type="danger" class="gutter-sm">danger</v-button>
            <v-button :is-round="true" type="dark" class="gutter-sm">darkest</v-button>
            <v-button :is-round="true" type="dark" class="gutter-sm">darker</v-button>
            <v-button :is-round="true" type="dark" class="gutter-sm">dark</v-button>
            <v-button :is-round="true" type="light" class="gutter-sm">light</v-button>
            <v-button :is-round="true" type="light" class="gutter-sm">lighter</v-button>
            <v-button :is-round="true" type="light" class="gutter-sm">lightest</v-button>
        </v-group>

        <v-group title="块">
            <v-button :is-block="true" class="gutter-top">default</v-button>
            <v-button :is-block="true" type="primary" class="gutter-top">primary</v-button>
            <v-button :is-block="true" type="success" class="gutter-top">success</v-button>
            <v-button :is-block="true" :is-ghost="true" type="info" class="gutter-top">info</v-button>
            <v-button :is-block="true" :is-ghost="true" type="warning" class="gutter-top">warning</v-button>
            <v-button :is-block="true" type="danger" class="gutter-top">danger</v-button>
            <v-button :is-block="true" type="dark" class="gutter-top">darkest</v-button>
            <v-button :is-block="true" type="dark" class="gutter-top">darker</v-button>
            <v-button :is-block="true" type="dark" class="gutter-top">dark</v-button>
            <v-button :is-block="true" type="light" class="gutter-top">light</v-button>
            <v-button :is-block="true" type="light" class="gutter-top">lighter</v-button>
            <v-button :is-block="true" type="light" class="gutter-top">lightest</v-button>
        </v-group>

    </v-scroll-view>
</template>
<script>
import VScrollView from '@/packages/ScrollView/ScrollView';
import VCell from '@/packages/Cell/Cell';
import VGroup from '@/packages/Group/Group';
import VButton from '@/packages/Button/Button';
import VButtonGorup from '@/packages/Button/ButtonGroup';
import VSwitch from '@/packages/Switch/Switch';

export default {
    name: 'ButtonDemo',

    data() {
        return {
            value1: 10,
            value2: 1,
            value3: 1
        };
    },

    mounted() {},

    components: {
        VScrollView,
        VButton,
        VButtonGorup,
        VSwitch,
        VCell,
        VGroup
    }
};
</script>
<style scope lang="scss">
@import '../scss/variables.scss';
.item {
    padding: $gutter;
    border: 1px solid $lightest;
}
</style>
