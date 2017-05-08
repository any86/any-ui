<template>
    <li @click="select(opts)">
        <slot></slot>
    </li>
</template>
<script>
export default {
    name: 'Option',

    props: {
        opts: {
            type: Object
        }
    },

    methods: {
        select(opts) {
            console.log(this.$parent.$parent);
            this.$parent.$parent.$parent.$data.selected = opts;
        }
    }
}
</script>
<style scoped lang=scss>
$color: #69c;
$padding:15px 25px;
$disable_color: #ccc;
li {
    /*width: 100%;*/
    /*display: inline-block;*/
    font-size: 12px;
    list-style: none;
    padding: $padding;
    cursor: pointer;
    &:hover {
        background: #f7f7f7;
        border-radius: 4px;
    }
}

li.active {
    color: $color;
}

li.disable {
    color: $disable_color;
}

li:hover {
    opacity: 0.6;
}
</style>
