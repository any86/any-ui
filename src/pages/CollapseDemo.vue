<template>
    <a-scroll-view>
        <a-cell>
            <a-switch v-model="isAccordion">是否开启accordion模式</a-switch>
        </a-cell>
        
        <a-group title="基本使用">
            <a-collapse :is-accordion="isAccordion">
                <a-collapse-item v-for="n in 3" :key="n" :title="`第${n}行`">
                    已经打开第{{n}}行
                </a-collapse-item>
            </a-collapse>
        </a-group>

        <a-group title="高级使用">
            <a-collapse :is-accordion="isAccordion">
                <a-collapse-item :is-open="true">
                    <template slot="header">
                        props: is-accordion
                    </template>
                    设置is-accordion="ture"后, 同时只能打开一个选项卡
                </a-collapse-item>
                <a-collapse-item title="props: title" :is-open="false">
                    collapse-item标签上设置可设置title/is-open属性
                </a-collapse-item>
                <a-collapse-item title="slot: header" :is-open="false">
                    对了, collapse-item还支持name="header"的slot
                </a-collapse-item>
            </a-collapse>
        </a-group>


    </a-scroll-view>
</template>
<script>
export default {
    name: 'CollapseDemo',

    data() {
        return {
            isAccordion: true
        };
    },
};
</script>
<style scope lang="scss">
@import '../scss/variables.scss';

</style>