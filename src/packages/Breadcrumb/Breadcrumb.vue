<template>
    <div class="atom-breadcrumb">
        <span v-for="(item, index) in dataSource" :key="item" @click="clickItem(index)">{{item}}</span>
    </div>
</template>
<script>
export default {
    name: 'AtomBreadcrumb',

    props: {
        dataSource: {
            type: Array
        }
    },

    methods: {
        clickItem(index){
            this.$emit('click-item', index);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/variables.scss';
.atom-breadcrumb {
    margin: $gutter;
    span {
        font-size: $small;
        display: inline-block;
        color: $darker;
        &.active {
            color: $base;
        }
    }
    span:not(:last-of-type) {
        &:after {
            
            content: '>';
            margin: auto 5px;
        }
    }
}
</style>
