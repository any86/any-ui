<template>
	<header>
	    <Icon value="bars" @click.native="showSideBar"></Icon>
	    <Icon value="search" style="margin-left:15px;"></Icon>
	    <img class="logo" src="../assets/logo.png">
	    <Icon value="user" style="margin-right:15px;"></Icon>
	    <Icon value="shopping-bag"></Icon>
	</header>
</template>
<script>
export default {
    name: 'Header',

}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
header{position: fixed;top:0;left:0;z-index: $headerZIndex;}
</style>
