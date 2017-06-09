<template>
    <div class="home">
        <SideBar v-model="isShowSideBar">
            <ul class="sidebar-menu">
                <li>What's New</li>
                <li>Personalized Name Necklace</li>
                <li>New Arrivals</li>
                <li>All Personalized</li>
                <li>Personalized</li>
            </ul>
        </SideBar>
        <StickyLayout>
            <!-- 头部 -->
            <div slot="header" class="header">
                <Icon value="bars" @click.native="showSideBar"></Icon>
                <Icon value="search" style="margin-left:15px;"></Icon>
                <img class="logo" src="../assets/logo.png">
                <Icon value="user" style="margin-right:15px;"></Icon>
                <Icon value="shopping-bag"></Icon>
            </div>

            <!-- 主体 -->
            <transition name="fade-left" mode="out-in">
                <router-view></router-view>
            </transition>


            <!-- 底部 -->
            <div slot="footer" class="footer">
                <router-link tag="span" to="/home/index" class="button">
                    <Icon class="icon" value="home"></Icon>
                    <p>home</p>
                </router-link>
                <router-link tag="span" to="/home/presale" class="button">
                    <Icon class="icon" value="clock-o"></Icon>
                    <p>presale</p>
                </router-link>
                <router-link tag="span" to="/home/find" class="button">
                    <Icon class="icon" value="compass"></Icon>
                    <p>find</p>
                </router-link>
                <router-link tag="span" to="/home/shop-cart" class="button">
                    <Icon class="icon" value="shopping-bag"></Icon>
                    <p>cart</p>
                </router-link>
                <router-link tag="span" to="/home/my" class="button">
                    <Badge class="badge" type="danger">5</Badge>
                    <Icon class="icon" value="user-circle-o"></Icon>
                    <p>my</p>
                </router-link>
            </div>
        </StickyLayout>
    </div>
</template>
<script>
import StickyLayout from '@/packages/layout/Sticky';
import SideBar from '@/packages/SideBar/SideBar';

export default {
    name: 'Home',

    data() {
        return {
            isShowSideBar: false
        }
    },

    methods: {
        showSideBar() {

            this.isShowSideBar = !this.isShowSideBar;
        }
    },

    components: {
        StickyLayout,
        SideBar
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.home {
    height: 100%;
    width: 100%;
    position: relative;
    .sidebar-menu {
        li {
            padding: 3*$gutter;
            display: block;
            border-bottom: 1px solid $lightest;
            font-size: $normal;
        }
    }
    .header {
        display: flex;
        padding: 10px 15px;
        background: #fff;
        i {
            font-size: $big;
            line-height: 30px;
        }
        img.logo {
            text-align: center;
            display: table;
            margin: auto;
            height: 30px;
        }
    }
    
    .main{}

    .footer {
        display: flex;
        // box-shadow: $shadowUp;
        border-top: 1px solid $lightest;
        .badge {
            position: absolute;
            top: 5px;
            right: 5px;
        }
        .button {
            flex: 1;
            position: relative;
            color: $darker;
            padding: $gutter / 2;
            display: block;
            background: #fff;
            text-align: center;
            font-size: $large;
            transition: all .3s;
            &.active {
                background: $light;
            }
            &:active {
                background: $light;
            }
            >.icon {
                height: 30px;
                display: block;
            }
            p {
                font-size: $normal;
            }
        }
        .router-link-active {
            background: $light;
        }
    }
}
</style>
