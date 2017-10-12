<template>
    <v-scroller v-model="position" :lock-y="true" :lock-x="false" class="atom-drawer" :body-style="bodyStyle" :is-allow-rest="false" @scroll-move="scrollMove">
        <span class="atom-drawer__side" ref="side">
            {{position.scrollLeft}}
            <slot name="side"></slot>
        </span>
        <main class="atom-drawer__main">
            <slot></slot>
            <!-- <v-mask :fixed="false" :isShow="isShowMask" @touchstart="close"></v-mask> -->
        </main>
    </v-scroller>
</template>
<script>
import VMask from '@/packages/Dialog/Mask';
import VScroller from '@/packages/Scroller/Scroller'
export default {
    name: 'Drawer',

    props: {
        sensitivity: {
            type: Number,
            default: 30
        },

        value: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            position: { scrollLeft: 100, scrollTop: 0 },
            bodyStyle: {
                position: 'relative',
                display: 'flex',
                height: '100%'
            },
        };
    },

    mounted() {
        this.sideWidth = this.$refs.side.offsetWidth;
    },

    methods: {
        scrollMove({scrollLeft }){
            dir(scrollLeft)
        }
    },

    watch: {

    },

    computed: {

    },

    components: {
        VMask, VScroller
    }
}
</script>

<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-drawer {
    position: relative;
    overflow: hidden;
    height: 100%;
    &__side {
        position: absolute;
        z-index: $drawerZIndex;
        left: 0;
        top: 0;
        background: $background;
        display: block;
        overflow: hidden;
        max-width: 80%;
        height: 100%;
        transform: translateX(-100%) scale(1);
    }

    &__main {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        flex: 1 0 100%;
        min-width: 0;
        height: 100%;
        width: 100%;
        -webkit-overflow-scrolling: touch;
        overflow: hidden;
    }
}
</style>
