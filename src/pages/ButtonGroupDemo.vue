<template>
    <a-scroll-view class="fill-sm">
        <a-button-group>
            <a-button type="primary">primary</a-button>
            <a-button type="white">white</a-button>
            <a-button type="info">info</a-button>
        </a-button-group>
        
        
        <a-button-group class="gutter-top" column>
            <a-button type="white">white</a-button>
            <a-button type="white">white</a-button>
            <a-button type="white">white</a-button>
        </a-button-group>
    </a-scroll-view>
</template>
<script>
export default {
    name: 'ButtonGroupDemo',
};
</script>
<style scope lang="scss">
@import '../scss/variables.scss';
</style>
