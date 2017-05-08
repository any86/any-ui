<template>
    <ol class="com-breadcrumb">
        <li v-for="item in value" @click="changeRoute(item.route)"><i :class="['fa', 'fa-'+item.icon]"></i> {{item.text}}</li>
    </ol>
</template>
<script>
export default {
    name: 'breadcrumb',

    props: {
        value: {
            type: Array
        }
    },

    methods: {
        changeRoute(route) {
            this.$router.push(route);
        }
    }
}
</script>
<style lang="scss" scoped>
.com-breadcrumb {
    border: 1px solid #ccc;
    padding: 10px 15px;
    border-radius: 4px;
    box-shadow: 1px 2px 3px #eee;
    >li {
        display: inline-block;
        &:hover {
            cursor: pointer;
        }
    }
    >li+li:before {
        color: #ddd;
        padding: 0 5px;
        content: "/\00a0";
    }
}
</style>
