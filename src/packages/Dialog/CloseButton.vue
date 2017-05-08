<template>
    <div class="btn-close">
        <div class="warp">
            <div class="line line-x"></div>
            <div class="line line-y"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CloseButton'
}
</script>
<style scoped lang="scss">
$color: #aaa;
.btn-close {
    position: relative;
    z-index: 1986;
    $lineH: 16px;
    $lineW: 2px;
    display: block;
    height: $lineH;
    width: $lineH;
    >.warp {
        transition: all .3s ease-out;
        height: $lineH;
        width: $lineH;
        position: relative;
        transform: rotate(45deg);
        >.line {
            height: $lineH;
            width: $lineW;
            border-radius: 2px;
            background: $color;
            position: absolute;
            top: 0;
            left: 7px;
        }
        >.line-x {}
        >.line-y {
            transform: rotate(90deg);
        }
        &:hover {
            cursor: pointer;
            transform: rotate(-135deg) scale(1.1);
        }
    }
}
</style>
