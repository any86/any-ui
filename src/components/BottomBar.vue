<template>
        <TabBar>
            <TabBarItem>
                <router-link tag="span" to="/home/index" class="button">
                    <Icon value="home"></Icon>
                    <p>home</p>
                </router-link>
            </TabBarItem>
            <TabBarItem>
                <router-link tag="span" to="/home/presale" class="button">
                    <Icon value="clock-o"></Icon>
                    <p>presale</p>
                </router-link>
            </TabBarItem>
            <TabBarItem>
                <router-link tag="span" to="/home/category" class="button">
                    <Icon value="compass"></Icon>
                    <p>find</p>
                </router-link>
            </TabBarItem>
            <TabBarItem>
                <router-link tag="span" to="/home/shop-cart" class="button">
                    <Icon value="shopping-bag"></Icon>
                    <p>cart</p>
                </router-link>
            </TabBarItem>
            <TabBarItem>
                <router-link tag="span" to="/home/my" class="button">
                    <Icon value="user-circle-o"></Icon>
                    <p>my</p>
                </router-link>
            </TabBarItem>
        </TabBar>
</template>

<script>

export default {
  name: 'BottomBar'
}
</script>

<style scoped>

</style>
