<template>
    <footer slot="footer">
        <router-link tag="span" to="/index" class="button">
            <Icon class="icon" value="home"></Icon>
            <p>home</p>
        </router-link>
        <router-link tag="span" to="/presale" class="button">
            <Icon class="icon" value="clock-o"></Icon>
            <p>presale</p>
        </router-link>
        <router-link tag="span" to="/find" class="button">
            <Icon class="icon" value="compass"></Icon>
            <p>find</p>
        </router-link>
        <router-link tag="span" to="/shop-cart" class="button">
            <Icon class="icon" value="shopping-bag"></Icon>
            <p>cart</p>
        </router-link>
        <router-link tag="span" to="/my" class="button">
            <Badge class="badge" type="danger">5</Badge>
            <Icon class="icon" value="user-circle-o"></Icon>
            <p>my</p>
        </router-link>
    </footer>
</template>
<script>
export default {
    name: 'Footer',
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
footer {
    display: flex;
    min-height: 60px;
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
        &.active {
            background: $light;
        }
        &:active {
            background: $light;
        }
        .icon {
            font-size: $large;
            height: 30px;
            display: block;
        }
        p {
            font-size: $normal;
            line-height: 30px;
            height: 30px;
        }
    }
    .router-link-active {
        background: $light;
    }
}
</style>
