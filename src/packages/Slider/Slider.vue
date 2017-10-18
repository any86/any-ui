<template>
    <v-scroller v-model="pos" :is-lock-x="false" :is-lock-y="true" class="atom-slider" :body-class="{flex: true}" @scroll-start="scrollStart" @scroll-move="scrollMove" @scroll-leave="scrollLeave">
        <slot></slot>
    </v-scroller>
</template>
<script>
import { getHeight, getWidth } from '@/utils/dom'
import VScroller from '@/packages/Scroller/Scroller';
export default {
    name: 'Slider',

    props: {
        value: {
            type: [Number, String],
            default: 0
        },

        speed: {
            type: Number,
            default: 300
        }
    },

    data() {
        return {
            activeIndex: 0,
            pos: { scrollLeft: 0, scrollTop: 0 },
            viewWidth: 0
        };
    },

    mounted() {
        this.updateSize();
        window.addEventListener('resize', this.updateSize);
    },

    methods: {
        updateSize() {
            this.viewWidth = getWidth(this.$el);
        },

        scrollStart() {},

        scrollMove(e) {

        },

        scrollLeave({scrollLeft}) {
            this.activeIndex = Math.ceil(scrollLeft / this.viewWidth);
            if(scrollLeft % this.viewWidth > this.viewWidth / 2) {
                this.pos.scrollLeft = this.viewWidth * this.activeIndex;
            } else {
                this.pos.scrollLeft = this.viewWidth * (this.activeIndex - 1);
            }
        },

        slideTo(index, speed) {

        },
    },

    components: {
        VScroller
    }
}
</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
$height: .5rem;
</style>
