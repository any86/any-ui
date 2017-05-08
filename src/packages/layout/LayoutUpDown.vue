<template>
    <FlexBox class="up-down-layout">
        <!-- 上半部 -->
        <FlexItem class="up-part">
            <slot name="up"></slot>
        </FlexItem>
        <!-- 下半部 -->
        <div class="down-part">
            <slot name="down"></slot>
        </div>
    </FlexBox>
</template>
<script>
import FlexBox from '../Flexbox/FlexBox'
import FlexItem from '../Flexbox/FlexItem'

export default {
    name: 'LayoutUpDown',

    components: {FlexBox, FlexItem}
}
</script>
<style scoped lang=scss>

</style>
