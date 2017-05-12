<template>
    <div class="page-cart">
        <ListView>
            <ListItem>
                <div class="flex">
                    <div class="img">
                        <img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/F/J/FJ1107.png">
                    </div>
                    <div class="info flex-item">
                        <h4>9df78eab33525d08d6e5fb8d2</h4>
                        <Badge type="success">free</Badge>
                    </div>
                </div>
            </ListItem>
            <ListItem>
                <div class="flex">
                    <div class="img">
                        <img src="http://static.soufeel.com/media/catalog/product/cache/0/small_image/280x280/9df78eab33525d08d6e5fb8d27136e95/D/Y/DY1053.png">
                    </div>
                    <div class="info flex-item">
                        <h4>githubusercontent</h4>
                        <Badge type="success">free</Badge>
                    </div>
                </div>
            </ListItem>
        </ListView>

    </div>
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
.flex {
    padding: 2*$gutter;
    .img {
        width: 1rem;
        height: 1rem;
        overflow: hidden;
        img {
            display: block;
            width: 100%;
        }
    }
    .info {
        height: 1rem;
        h1 {
            margin-top: .15rem;
        }
    }
}
</style>
