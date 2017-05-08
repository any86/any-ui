<template>
    <ul class="com-option-group">
        <li class="title">{{opts.title}}</li>
        <ul class="options">
            <slot></slot>
        </ul>
        
    </ul>
</template>
<script>
export default {
    name: 'OptionGroup',

    props: {
        opts: {
            type: Object
        }
    },

    methods: {

    }
}
</script>
<style scoped lang=scss>
$color: #69c;
$padding:15px;
$disable_color: #ccc;
.com-option-group{
    >.title{padding: 15px;color: #ccc;}

    >ul.options {}
}

</style>
