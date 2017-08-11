<template>
    <div class="component-step">
        <span class="circle">{{index}}</span>
        <span v-if="!isLast" class="line"></span>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Steps',

    props: {

    },

    data(){
        return {index: 0, isLast: true};
    },

    mounted() {
        this.index = ++this.$parent.count;
        this.$nextTick(()=>{
            this.isLast = this.index == this.$parent.count;
        });
    },

    methods: {

    },

    destroyed() {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$width: .5rem;
.component-step {
    display: flex;
    position: relative;
    margin-bottom: $width;
    .circle {
        display: block;
        height: $width;
        width: $width;
        border: 1px solid $base;
        border-radius: 100%;
        color: $base;
        line-height: $width;
        text-align: center;
    }
    .line {
        position: absolute;
        top: $width;
        left: $width/2;
        width: 0;
        border-right: 1px dashed $base;
        height: 100%;
    }
    .content {
        padding: 0 $gutter;
        flex: 1;
    }
}
</style>
