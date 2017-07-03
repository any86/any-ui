<template>
    <footer slot="footer">
        <router-link tag="span" to="/index" class="button">
            <Icon class="icon" value="home"></Icon>
            <p>home</p>
        </router-link>
        <router-link tag="span" to="/category" class="button">
            <Icon class="icon" value="clock-o"></Icon>
            <p>category</p>
        </router-link>
        <router-link tag="span" to="/explore" class="button">
            <Icon class="icon" value="compass"></Icon>
            <p>explore</p>
        </router-link>
        <router-link tag="span" to="/bag" class="button">
            <Badge class="badge" type="danger">5</Badge>
            <Icon class="icon" value="shopping-bag"></Icon>
            <p>cart</p>
        </router-link>
        <router-link tag="span" to="/my" class="button">
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
        padding: $gutter;
        display: block;
        background: $background;
        text-align: center;
        &.active {
            color: $base;
        }
        &:active {
            color: $base;
        }
        .icon {
            font-size: $large;
            height: 30px;
            display: block;
        }
        p {
            font-size: $normal;
        }
    }
    .router-link-active {
        color: $base;
    }
}
</style>
