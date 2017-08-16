<template>
    <div class="component-warning">
        <i class="icon-warning"></i>
        <p>
            <slot></slot>
        </p>
    </div>
</template>
<script>
export default {
    name: 'Warning'
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: .3rem;
.component-warning {
    display: flex;
    height:$height;
    margin:$gutter / 2 0;
    .icon-warning {
        background: url('./warning.svg');
        background-size: 100%;
        width: $height;
        height: $height;
        display: inline-block;
    }
    
    >p{flex:1;line-height: $height;margin-left: $gutter / 3;}
    
}
</style>
