<template>
    <span class="atom-badge">
        <slot></slot>
        <span :class="classNames" class="atom-badge">
            {{value}}
        </span>
    </span>

</template>
<script>
export default {
    name: 'Badge',

    props: {
        value: {
            type: [Number, String]
        }
    },

    computed: {
        classNames(){
            // 如果是内容
            // 否则是点
            if(undefined !== this.value) {
                let className = ['atom-badge__content'];
                if(this.$slots.default) {
                    className.push('atom-badge__content--fixed')
                }
                return className;
            } else {
                let className = ['atom-badge__dot'];
                if(this.$slots.default) {
                    className.push('atom-badge__dot--fixed')
                }
                return className;
            }
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$dotSize: 8px;
.atom-badge {
    position: relative;
    display: inline-block;
    font-size: 100%;
    vertical-align: super;
    &__dot {
        display: inline-block;
        vertical-align: top;
        z-index: 2;
        width: $dotSize;
        height: $dotSize;
        border-radius: 100%;
        background: $danger;
        &--fixed {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(100%, 0);
        }
    }

    &__content {
        height: $big; // 如果不指定高度, 那么父容器的flex属性会影响到badge定位
        line-height: $big;
        vertical-align: middle;
        text-align: center;
        white-space: nowrap;
        padding: 0 $gutter/3;
        border-radius: $big;
        background: $danger;
        color: $sub;
        font-size: $small;
        &--fixed {
            position: absolute;
            top: 0;
            transform: translate(100%, 0);
            right: 10px;
        }
    }
}
</style>
