<template>
    <li @click="click"><slot></slot></li>
</template>
<script>
export default {
    name: 'MenuItem',

    props: {
    	value: {
    	}
    },

    methods: {
    	click(){
    		this.$parent.$parent.showDialog = false;
    	}
    }
}
</script>

<style lang="scss" scoped>
@import '../scss/theme.scss';
li{
    padding:5px 15px;
    &:hover{cursor: pointer;background: $light;color: $primary;}
}
</style>
