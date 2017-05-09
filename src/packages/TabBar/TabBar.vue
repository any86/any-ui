<template>
    <FlexBox>
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
                <Icon value="user-circle-o"></Icon>
                <p>my</p>
            </router-link>
        </FlexItem>
    </FlexBox>
</template>
<script>
import FlexBox from '@/packages/FlexBox/FlexBox';

export default {
    name: 'TabBar',

    mounted() {

    },

    data() {
        return {
            msg: 'TabBar'
        }
    },

    components: {
        FlexBox
    }

}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-tab-bar {
    position: fixed;
    z-index: $tabBarZIndex;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: $shadowUp;
}
</style>
