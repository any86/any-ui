<template>
    <a-scroll-view class="fill-sm">

        <a-group title="多种情景色">
            <a-button type="primary" class="gutter-top-sm">
                primary</a-button>
            <a-button type="success" class="gutter-top-sm">success</a-button>
            <a-button type="info" class="gutter-top-sm">info</a-button>
            <a-button type="warning" class="gutter-top-sm">warning</a-button>
            <a-button type="danger" class="gutter-top-sm">danger</a-button>
            <a-button type="darkest" class="gutter-top-sm">darkest</a-button>
            <a-button type="darker" class="gutter-top-sm">darker</a-button>
            <a-button type="dark" class="gutter-top-sm">dark</a-button>
            <a-button type="light" class="gutter-top-sm">light</a-button>
            <a-button type="lighter" class="gutter-top-sm">lighter</a-button>
            <a-button type="lightest" class="gutter-top-sm">lightest</a-button>
        </a-group>

        <a-group title="inline">
            <a-button type="primary" inline class="gutter-top-sm">primary</a-button>
            <a-button type="success" inline class="gutter-top-sm">success</a-button>
            <a-button type="info" inline class="gutter-top-sm">info</a-button>
            <a-button type="warning" inline class="gutter-top-sm">warning</a-button>
            <a-button type="danger" inline class="gutter-top-sm">danger</a-button>
        </a-group>


        <a-group title="禁用">
            <a-button disabled>禁用</a-button>
        </a-group>

        <a-group title="加载中">
            <a-button loading inline ghost type="warning" class="gutter-top-sm">warning</a-button>
            <a-button loading type="success" class="gutter-top-sm">success</a-button>
        </a-group>

        <a-group title="幽灵按钮">
            <a-button outline type="info" class="gutter-top-sm">info</a-button>
            <a-button outline type="warning" class="gutter-top-sm">warning</a-button>
        </a-group>

        <a-group title="圆形按钮">
            <a-button inline circle icon="tick" type="primary" class="gutter-top-sm"></a-button>
            <a-button inline circle type="success" class="gutter-top-sm">success</a-button>
            <a-button circle="true" type="info" class="gutter-top-sm">info</a-button>
        </a-group>

        <a-group title="图标">
            <a-button inline circle icon="tick" type="primary" class="gutter-top-sm"></a-button>
            <a-button inline circle icon="plus" type="success" class="gutter-top-sm">success</a-button>
            <a-button circle="true" icon="close" type="info" class="gutter-top-sm">info</a-button>
        </a-group>

    </a-scroll-view>
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
            value3: 1,
        };
    },
};
</script>
<style scope lang="scss">
@import '../scss/variables.scss';
.item {
    padding: $gutter;
    border: 1px solid $lightest;
}
</style>
