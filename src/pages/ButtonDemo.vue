<template>
    <a-scroll-view class="fill-sm">

        <a-group title="多种情景色">
            <a-button type="primary" class="gutter-sm">
                primary</a-button>
            <a-button type="success" class="gutter-sm">success</a-button>
            <a-button type="info" class="gutter-sm">info</a-button>
            <a-button type="warning" class="gutter-sm">warning</a-button>
            <a-button type="danger" class="gutter-sm">danger</a-button>
            <a-button type="darkest" class="gutter-sm">darkest</a-button>
            <a-button type="darker" class="gutter-sm">darker</a-button>
            <a-button type="dark" class="gutter-sm">dark</a-button>
            <a-button type="light" class="gutter-sm">light</a-button>
            <a-button type="lighter" class="gutter-sm">lighter</a-button>
            <a-button type="lightest" class="gutter-sm">lightest</a-button>
        </a-group>

        <a-group title="小尺寸">
            <a-button type="primary" size="sm" class="gutter-sm">primary</a-button>
            <a-button type="success" size="sm" class="gutter-sm">success</a-button>
            <a-button type="info" size="sm" class="gutter-sm">info</a-button>
            <a-button type="warning" size="sm" class="gutter-sm">warning</a-button>
            <a-button type="danger" size="sm" class="gutter-sm">danger</a-button>
        </a-group>


        <a-group title="禁用">
            <a-button :is-ghost="true" :is-disabled="true"  class="gutter-sm">禁用1</a-button>
            <a-button :is-circle="true" :is-disabled="true" class="gutter-sm">禁用2</a-button>
            <p class="fill-sm">
                <a-button :is-block="true" :is-disabled="true">禁用3</a-button>
            </p>
        </a-group>

        <a-group title="加载中">
            <a-button :is-loading="true" :is-ghost="true" type="warning" class="gutter-sm">warning</a-button>
            <a-button :is-loading="true" :is-round="true" type="success" class="gutter-sm">success</a-button>
        </a-group>

        <a-group title="幽灵按钮">
            <a-button :is-ghost="true" class="gutter-sm">default</a-button>
            <a-button :is-ghost="true" type="primary" class="gutter-sm">primary</a-button>
            <a-button :is-ghost="true" type="success" class="gutter-sm">success</a-button>
            <a-button :is-ghost="true" type="info" class="gutter-sm">info</a-button>
            <a-button :is-ghost="true" type="warning" class="gutter-sm">warning</a-button>
            <a-button :is-ghost="true" type="danger" class="gutter-sm">danger</a-button>
            <a-button :is-ghost="true" type="dark" class="gutter-sm">darkest</a-button>
            <a-button :is-ghost="true" type="dark" class="gutter-sm">darker</a-button>
            <a-button :is-ghost="true" type="dark" class="gutter-sm">dark</a-button>
            <a-button :is-ghost="true" type="light" class="gutter-sm">light</a-button>
            <a-button :is-ghost="true" type="light" class="gutter-sm">lighter</a-button>
            <a-button :is-ghost="true" type="light" class="gutter-sm">lightest</a-button>
        </a-group>

        <a-group title="圆形按钮">
            <a-button :is-circle="true" type="primary" class="gutter-sm">primary</a-button>
            <a-button :is-circle="true" type="success" class="gutter-sm">success</a-button>
            <a-button :is-circle="true" type="info" class="gutter-sm">info</a-button>
            <a-button :is-circle="true" type="warning" class="gutter-sm">warning</a-button>
            <a-button :is-circle="true" type="danger" class="gutter-sm">danger</a-button>
            <a-button :is-circle="true" type="dark" class="gutter-sm">darkest</a-button>
            <a-button :is-circle="true" type="dark" class="gutter-sm">darker</a-button>
            <a-button :is-circle="true" type="dark" class="gutter-sm">dark</a-button>
            <a-button :is-circle="true" type="light" class="gutter-sm">light</a-button>
            <a-button :is-circle="true" type="light" class="gutter-sm">lighter</a-button>
            <a-button :is-circle="true" type="light" class="gutter-sm">lightest</a-button>
        </a-group>

        <a-group title="块">
            <a-button :is-block="true" type="primary" class="gutter-top">primary</a-button>
            
            <a-button :is-block="true" :is-ghost="true" type="success" class="gutter-top">success</a-button>
        </a-group>

    </a-scroll-view>
</template>
<script>
import { AScrollView, ACell, AGroup, AButton, AButtonGorup, ASwitch  } from '@/packages'


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
        AScrollView,
        ACell,
        AGroup,
        AButton,
        AButtonGorup,
        ASwitch
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
