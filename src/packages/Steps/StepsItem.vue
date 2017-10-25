<template>
    <div class="atom-steps__item">
        <span :class="{'item__circle--active': isActive}" class="item__circle">{{index + 1}}</span>
        <span v-if="!isLast" class="item__line"></span>
        <div class="item__content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'StepsItem',

    data() {
        return { index: 0, isLast: true };
    },

    mounted() {
        this.index = this.$parent.count++;
        this.$nextTick(() => {
            this.isLast = this.index == this.$parent.count - 1;
        });
    },

    computed: {
        isActive(){
            return this.index == this.$parent.value;
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$width: 0.5rem;
.atom-steps__item {
    display: flex;
    position: relative;
    margin-bottom: $width;
    // padding-bottom: $width; // 可调整高度
    .item__circle {
        display: block;
        height: $width;
        width: $width;
        border: 1px solid $base;
        border-radius: 100%;
        color: $base;
        line-height: $width;
        text-align: center;
        &--active{
            background: $base;
            color:$sub;
        }
    }
    .item__line {
        position: absolute;
        top: $width*1;
        left: $width/2;
        width: 0;
        border-right: 1px dashed $base;
        height: 100%;
    }
    .item__content {
        padding: 0 $gutter;
        flex: 1;
        min-width: 0;
    }
}
</style>
