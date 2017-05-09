<template>
    <FlexBox slot="header">
        <Icon value="bars" @click="showSideBar"></Icon>
        <FlexItem>
            <img class="logo" src="../assets/logo.png">
        </FlexItem>
        <Icon value="search"></Icon>
    </FlexBox>
</template>
<script>
export default {
    name: 'HeaderBar'
}
</script>
<style lang="scss" scoped>
</style>
