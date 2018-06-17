<template>
    <a-scroll-view class="fill-sm">

        <a-group title="多种情景色">
            <a-button theme="primary" class="gutter-top-sm">
                primary</a-button>
            <a-button theme="success" class="gutter-top-sm">success</a-button>
            <a-button theme="info" class="gutter-top-sm">info</a-button>
            <a-button theme="warning" class="gutter-top-sm">warning</a-button>
            <a-button theme="danger" class="gutter-top-sm">danger</a-button>
            <a-button theme="darkest" class="gutter-top-sm">darkest</a-button>
            <a-button theme="darker" class="gutter-top-sm">darker</a-button>
            <a-button theme="dark" class="gutter-top-sm">dark</a-button>
            <a-button theme="light" class="gutter-top-sm">light</a-button>
            <a-button theme="lighter" class="gutter-top-sm">lighter</a-button>
            <a-button theme="lightest" class="gutter-top-sm">lightest</a-button>
        </a-group>

        <a-group title="inline">
            <a-button theme="primary" inline class="gutter-top-sm">primary</a-button>
            <a-button theme="success" inline class="gutter-top-sm">success</a-button>
            <a-button theme="info" inline class="gutter-top-sm">info</a-button>
            <a-button theme="warning" inline class="gutter-top-sm">warning</a-button>
            <a-button theme="danger" inline class="gutter-top-sm">danger</a-button>
        </a-group>


        <a-group title="禁用">
            <a-button disabled>禁用</a-button>
        </a-group>

        <a-group title="加载中">
            <a-button loading inline ghost theme="warning" class="gutter-top-sm">warning</a-button>
            <a-button loading theme="success" class="gutter-top-sm">success</a-button>
        </a-group>

        <a-group title="幽灵按钮">
            <a-button outline theme="info" class="gutter-top-sm">info</a-button>
            <a-button outline theme="warning" class="gutter-top-sm">warning</a-button>
        </a-group>

        <a-group title="圆形按钮">
            <a-button inline circle icon="tick" theme="primary" class="gutter-top-sm"></a-button>
            <a-button inline circle theme="success" class="gutter-top-sm">success</a-button>
            <a-button circle="true" theme="info" class="gutter-top-sm">info</a-button>
        </a-group>

        <a-group title="图标">
            <a-button inline circle icon="tick" theme="primary" class="gutter-top-sm"></a-button>
            <a-button inline circle icon="plus" theme="success" class="gutter-top-sm">success</a-button>
            <a-button circle="true" icon="close" theme="info" class="gutter-top-sm">info</a-button>
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
