<template>
    <div class="component-touch-view" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'TouchView',

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
            touch: {
                status: 0,
                x: {
                    translateOld: 0,
                    translateNew: 0,
                    distance: 0
                },
                y: {
                    translateOld: 0,
                    translateNew: 0,
                    distance: 0
                }
            }
        }
    },

    methods: {
        /**
        * 触摸屏幕
        */
        touchstart(e) {
            this.touch.status = 0;
            this.touch.startX = e.touches[0].clientX;
            this.touch.startY = e.touches[0].clientY;
        },

        touchmove(e) {

        },

        touchend(e) {

        },
    },

    watch: {

    },

    computed: {

    },

    components: {
    }
}
</script>

<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-drawer {
    position: relative;
    height: 100%;
}
</style>
