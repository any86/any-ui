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