<template>
    <div class="container">
        <SideBar v-model="isShowSideBar">菜单/1/菜单/2</SideBar>
        
        <StickyLayout>
            <!-- 头部 -->
            <FlexBox slot="header" class="header">
                <Icon value="bars" @click.native="showSideBar"></Icon>
                <FlexItem>
                    <img class="logo" src="../assets/logo.png">
                </FlexItem>
                <Icon value="search"></Icon>
            </FlexBox>

            <!-- 主体 -->
            <transition name="fade-left" mode="out-in">
                <router-view></router-view>
            </transition>

            <!-- 底部 -->
            <FlexBox slot="footer" class="footer">
                <FlexItem>
                    <router-link tag="span" to="/home/index" class="button">
                        <Icon value="home"></Icon>
                        <p>home</p>
                    </router-link>
                </FlexItem>
                <FlexItem>
                    <router-link tag="span" to="/home/presale" class="button">
                        <Icon value="clock-o"></Icon>
                        <p>presale</p>
                    </router-link>
                </FlexItem>
                <FlexItem>
                    <router-link tag="span" to="/home/category" class="button">
                        <Icon value="compass"></Icon>
                        <p>find</p>
                    </router-link>
                </FlexItem>
                <FlexItem>
                    <router-link tag="span" to="/home/shop-cart" class="button">
                        <Icon value="shopping-bag"></Icon>
                        <p>cart</p>
                    </router-link>
                </FlexItem>
                <FlexItem>
                    <router-link tag="span" to="/home/my" class="button">
                        <Badge class="badge" type="danger">5</Badge>
                        <Icon value="user-circle-o"></Icon>
                        <p>my</p>
                    </router-link>
                </FlexItem>
            </FlexBox>
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
        showSideBar(){

            this.isShowSideBar = !this.isShowSideBar;
        }
    },

    components: {
        StickyLayout, SideBar
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.container {
    height: 100%;
    width: 100%;
    position: relative;

    .header{box-shadow: $shadowDown;padding:10px 15px;background: #fff;
        i{font-size: 20px;}
        .logo{text-align: center;display: table;margin:auto;height: 20px;}
    }

    .footer {
        box-shadow: $shadowUp;
        .badge{position: absolute;top:5px;right:5px;}
        .button {
            position: relative;
            color: $dark;
            position: relative;
            padding: $gutter / 2;
            display: block;
            background: #fff;
            text-align: center;
            font-size: 24px;
            transition: all .3s;
            &.active {
                background: $light;
            }
            &:active {
                background: $light;
            }
        }
        .router-link-active{background: $light;}
    }
}
</style>
