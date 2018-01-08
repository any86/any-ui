<template>
    <v-scroll-view class="demo-page">
        <v-group title="默认镂空">
            <v-tag type="dark" class="gutter-sm">dark</v-tag>
            <v-tag type="darker" class="gutter-sm">darker</v-tag>
            <v-tag type="darkest" class="gutter-sm">darkest</v-tag>
            <v-tag type="light" class="gutter-sm">light</v-tag>
            <v-tag type="lighter" class="gutter-sm">lighter</v-tag>
            <v-tag type="lightest" class="gutter-sm">lightest</v-tag>
            <v-tag type="warning" class="gutter-sm">warning</v-tag>
            <v-tag type="danger" class="gutter-sm">danger</v-tag>
            <v-tag type="info" class="gutter-sm">info</v-tag>
            <v-tag type="success" class="gutter-sm">success</v-tag>
        </v-group>   

        <v-group title="实心">
            <v-tag type="dark" :is-ghost="false" class="gutter-sm">dark</v-tag>
            <v-tag type="darker" :is-ghost="false" class="gutter-sm">darker</v-tag>
            <v-tag type="darkest" :is-ghost="false" class="gutter-sm">darkest</v-tag>
            <v-tag type="light" :is-ghost="false" class="gutter-sm">light</v-tag>
            <v-tag type="lighter" :is-ghost="false" class="gutter-sm">lighter</v-tag>
            <v-tag type="lightest" :is-ghost="false" class="gutter-sm">lightest</v-tag>
            <v-tag type="warning" :is-ghost="false" class="gutter-sm">warning</v-tag>
            <v-tag type="danger" :is-ghost="false" class="gutter-sm">danger</v-tag>
            <v-tag type="info" :is-ghost="false" class="gutter-sm">info</v-tag>
            <v-tag type="success" :is-ghost="false" class="gutter-sm">success</v-tag>
        </v-group>   

    </v-scroll-view>
</template>
<script>
import VTag from '@/packages/Tag/Tag';
import VGroup from '@/packages/Group/Group';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'TagDemo',

    data() {
        return {
        };
    },



    methods: {
    },

    computed: {
       
    },

    components: {
        VTag,VGroup,
        VScrollView
    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
