<template>
    <div class="component-warning" v-on="$listeners">
        <i></i>
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
@import '../../scss/variables.scss';
$height: .3rem;
.component-warning {
    display: flex;
    height: $height;
    i {
        background: url('./warning.svg');
        background-size: 100%;
        width: $height;
        height: $height;
        display: inline-block;
        color:inherit;
    }

    >p {
        flex: 1;
        line-height: $height;
        margin-left: $gutter / 3;
        color:inherit;
    }
}
</style>
