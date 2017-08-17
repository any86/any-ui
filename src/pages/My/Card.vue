<template>
    <section class="row-card">
        <Icon class="button-config" value="gear"></Icon>
        <img class="avator" src="../../assets/avator.jpeg">
        <p class="name">Atom.Strom</p>
        <ul>
            <li>
                <p>20</p>
                <p>WishList</p>
            </li>
            <li>
                <p>200</p>
                <p>Points</p>
            </li>
            <li>
                <p>300</p>
                <p>Coupon</p>
            </li>
        </ul>
    </section>
</template>
<script>
import VInput from '@/packages/Input/Input'

export default {
    name: 'My',

    mounted() {

    },

    data() {
        return {}
    },

    methods: {

    },

    components: {
        VInput
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.row-card {
    background: $background;
    padding:$gutter;
    >.button-config{font-size: $biggest;position: absolute;top:.4rem;right: .4rem;}
    >.avator {
        border-radius: 100%;
        height: 2rem;
        width: 2rem;
        overflow: hidden;
        margin: $gutter * 2.4 auto 0;
    }
    >.name {
        text-align: center;
        font-size: $bigger;
        margin: $gutter auto;
    }

    >ul{display: flex;
        >li{flex:1;
            >p{text-align: center;
                &:nth-child(1){font-size: $bigger;line-height: .6rem;}
                &:nth-child(2){font-size: $normal;}
            }
        }
    }
}
</style>
