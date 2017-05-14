<template>
    <ScrollView class="page-cart">
        <ListView class="cart-list">
            <ListItem :canRemove="true">
                <div class="flex">
                    <div class="cover">
                        <img src="https://avatars0.githubusercontent.com/u/8264787?v=3&s=460">
                    </div>
                    <div class="info flex-item">
                        <router-link :to="{path: '/home/my'}" tag="h5" class="title">soufeelsoufeeleelsoufeel</router-link>
                        <Badge type="success">free</Badge>
                    </div>
                </div>
            </ListItem>
            <ListItem :canRemove="true">
                <div class="flex">
                    <div class="cover">
                        <img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/F/J/FJ1107.png">
                    </div>
                    <div class="info flex-item">
                        <router-link :to="{path: '/home/my'}" tag="h5" class="title">9df78eab33525dfb8d29df78eab33525d08d6e5fb8d2</router-link>
                        <Badge type="success">free</Badge>
                    </div>
                </div>
            </ListItem>
            <ListItem :canRemove="true">
                <div class="flex">
                    <div class="cover">
                        <img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/D/Y/DY1053.png">
                    </div>
                    <div class="info flex-item">
                        <router-link :to="{path: '/home/my'}" tag="h5" class="title">9df78eab33525d08d6e5fbd08d6e5fb8d2</router-link>
                        <Badge type="success">free</Badge>
                    </div>
                </div>
            </ListItem>
        </ListView>
        <ListView class="list">
            <ListItem :hasArrow="true">
                <div class="info">
                    <router-link :to="{path: '/home/my'}" tag="h4" class="title">9df78eab33525d08d6e5fb8d29df78eab25d08d6e5fb8d2</router-link>
                    <p class="desc">soufeelsoufeelsousoufeelsoufeelsoufeel</p>
                </div>
            </ListItem>
            <ListItem :hasArrow="true">
                <div class="info">
                    <h4 class="title">9df78eab33525d08d6e5fb8d2</h4>
                    <p class="desc">soufeelsoufeelsoufeelsoufeelsoufeelsoufeel</p>
                </div>
            </ListItem>
            <ListItem :hasArrow="true">
                <div class="info">
                    <h4 class="title">9df78eab33525d08d6e5fb8d2</h4>
                    <p class="desc">soufeelsoufeelsoufeelsoufeelsoufeelsoufeel</p>
                </div>
            </ListItem>
        </ListView>
    </ScrollView>
</template>
<script>
import ListView from '@/packages/List/ListView'
import ListItem from '@/packages/List/ListItem'
import Badge from '@/packages/Badge/Badge'


export default {
    name: 'ShopCart',
    data() {
        return {
            msg: 'ShopCart'
        }
    },

    components: {
        ListView,
        ListItem,
        Badge
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.cart-list {
    .cover {
        height: 2.2rem;
        width: 2.2rem;
        img {
            display: block;
            width: 100%;
        }
    }
    .info {
        padding: 2*$gutter;
        .title {
            height: 1rem;
            width: 100%;
            overflow: hidden;
            flex: 1;
            word-break: break-all;
        }
    }
}

.list {
    .title {
        height: .5rem;
        word-break: break-all;
        overflow: hidden;
    }
    .desc {
        color: $base;
    }
    .info {
        padding: 2*$gutter;
    }
}
</style>
