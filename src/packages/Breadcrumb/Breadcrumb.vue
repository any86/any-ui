<template>
    <div class="atom-breadcrumb">
        <span v-for="(title, index) in dataSource" :key="title" @click="clickItem({index, title})">{{title}}</span>
    </div>
</template>
<script>
export default {
    name: 'AtomBreadcrumb',

    props: {
        dataSource: {
            type: Array,
        },
    },

    methods: {
        clickItem(data) {
            this.$emit('click-item', data);
        },
    },
};
</script>