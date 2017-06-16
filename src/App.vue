<template>
    <div class="home">
        <VSideBar v-model="isShowSideBar">
            <ul class="menu">
                <li>What's New</li>
                <li>Personalized Name Necklace</li>
                <li>New Arrivals</li>
                <li>All Personalized</li>
                <li>Personalized</li>
            </ul>
        </VSideBar>
        <transition name="fadeLeft" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import * as types from "@/store/mutation-types";
import VSideBar from '@/packages/SideBar/SideBar'

export default {
    name: 'App',

    data() {
        return {};
    },

    computed: {
        isShowSideBar: {
            get() {
                return this.$store.state.isShowSideBar;
            },

            set(value) {
                this.$store.commit(value ? types.SHOW_SIDE_BAR : types.HIDE_SIDE_BAR);
            }
        }
    },

    components: {
        VSideBar
    }

}
</script>
<style lang="scss" scoped>
@import './scss/theme.scss';
.menu {
    li {
        padding: 3*$gutter;
        display: block;
        border-bottom: 1px solid $lightest;
        font-size: $big;
    }
}
</style>
