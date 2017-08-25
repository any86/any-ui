<template>
    <section class="row-engrave">
        <svg ref="svg" width="100%" viewBox="0 0 300 300" externalResourcesRequired="true">

            <defs>
                <filter id="spotlight">
                    <feFlood result="floodFill" x="0" y="0" width="100%" height="100%" flood-color="#f00" flood-opacity="1" />
                    <feBlend in="SourceGraphic" in2="floodFill" mode="multiply" />
                </filter>
            </defs>

            <path ref="circle" id="circle" d="M71.848,172.678c40.339,3.897,98.644,9.831,175.932-2.033" stroke="rgba(0,0,0,0)" fill="none" style="stroke-width: 2px;"></path>
            <image overflow="visible" width="80%" x="10%" :xlink:href="url" style="filter:url(#spotlight);">
            </image>
            <text :x="centerX" text-anchor="middle" font-size="36px" font-family="BeautifulES" externalResourcesRequired="true" class="svg-text">
                <textPath xlink:href="#circle">{{text}}</textPath>
            </text>
        </svg>

        <VInput v-model="text" class="input"></VInput>
        <div class="flex gutter">
            <VInput v-model="text" class="flex-item input gutter-right"></VInput>
            <VInput v-model="text" class="flex-item input"></VInput>
        </div>
    </section>
</template>
<script>
import VInput from '@/packages/Input/Input'
export default {
    name: 'Engrave',

    data() {
        return { centerX: 0, centerY: 0, text: '', canvas: null, ctx: null, isLoadingImg: false, url: './static/SL013-IN.png' };
    },

    methods: {

    },

    components: {
        VInput
    }
}
</script>
<style scoped lang="scss">
@import '../../../scss/theme.scss';
.row-engrave {
    img {
        display: block;
    }

    .input {
        border: 1px solid $lightest;
    }
    .svg-text {
        font-family: BeautifulES;
    }
}
</style>
