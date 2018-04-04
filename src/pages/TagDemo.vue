<template>
    <a-scroll-view class="demo-page">
        <a-group title="默认镂空">
            <a-tag type="dark" class="gutter-sm">dark</a-tag>
            <a-tag type="darker" class="gutter-sm">darker</a-tag>
            <a-tag type="darkest" class="gutter-sm">darkest</a-tag>
            <a-tag type="light" class="gutter-sm">light</a-tag>
            <a-tag type="lighter" class="gutter-sm">lighter</a-tag>
            <a-tag type="lightest" class="gutter-sm">lightest</a-tag>
            <a-tag type="warning" class="gutter-sm">warning</a-tag>
            <a-tag type="danger" class="gutter-sm">danger</a-tag>
            <a-tag type="info" class="gutter-sm">info</a-tag>
            <a-tag type="success" class="gutter-sm">success</a-tag>
        </a-group>   

        <a-group title="实心">
            <a-tag type="dark" :is-ghost="false" class="gutter-sm">dark</a-tag>
            <a-tag type="darker" :is-ghost="false" class="gutter-sm">darker</a-tag>
            <a-tag type="darkest" :is-ghost="false" class="gutter-sm">darkest</a-tag>
            <a-tag type="light" :is-ghost="false" class="gutter-sm">light</a-tag>
            <a-tag type="lighter" :is-ghost="false" class="gutter-sm">lighter</a-tag>
            <a-tag type="lightest" :is-ghost="false" class="gutter-sm">lightest</a-tag>
            <a-tag type="warning" :is-ghost="false" class="gutter-sm">warning</a-tag>
            <a-tag type="danger" :is-ghost="false" class="gutter-sm">danger</a-tag>
            <a-tag type="info" :is-ghost="false" class="gutter-sm">info</a-tag>
            <a-tag type="success" :is-ghost="false" class="gutter-sm">success</a-tag>
        </a-group>
    </a-scroll-view>
</template>
<script>
import { AScrollView, AGroup, ATag } from '@/packages'

export default {
    name: 'TagDemo',

    components: {
        AScrollView,
        AGroup,
        ATag
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
