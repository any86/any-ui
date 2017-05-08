<template>
    <div class="home">
        <transition name="fade-left" mode="out-in">
            <router-view></router-view>
        </transition>
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
    </div>
</template>
<script>
import {
    TabBar,
    TabBarItem
} from '@/packages/TabBar';
export default {
    name: 'Home',
    data() {
        return {
            msg: 'Welcome to Home'
        }
    },
    components: {
        TabBar,
        TabBarItem
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.home{height: 100%;padding-bottom: 40px;width: 100%;position: relative;}
.button {
    color: $dark;
    position: relative;
    padding: $gutter / 2;
    display: block;
    background: #fff;
    text-align: center;
    font-size: 24px;
    &.active {
        background: #ccc;
    }
    &:active {
        background: #ccc;
    }
}
</style>
