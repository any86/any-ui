<template>
    <div class="component-tabs">
        <div ref="header" class="header">
            <div ref="film" class="film" :style="{width: `${width}px`}">
               <slot></slot>
            </div>
            <div class="active-line" :style="{width: itemWidth[active] + 'px', transform: 'translate3d(' + translateX + 'px,0,0)'}">
                <div class="core"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Tabs',

    props: {
        value: {
            type: Number,
            default: 0
        }
    },

    mounted() {

    },

    data() {
        return {
            itemWidth: [],
            width: -1,
            count: 0,
        }
    },

    computed: {
        active: {
            get(){
                return this.value;
            },

            set(value){
                this.$emit('input', value);
            }
        },
        translateX() {
            var translateX = 0;
            for (var i = 0; i < this.active; i++) {
                translateX += this.itemWidth[i];
            }
            return translateX;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height: 30px;
.component-tabs {
    .header {
        position: relative;
        width: 100%;
        border-bottom: 1px solid $lightest;
        .film {
            overflow: hidden;
            &::after {
                content: ' ';
                clear: both;
            }
        }
        .active-line {
            position: absolute;
            z-index: 2;
            bottom: -1px;
            left: 0;
            height: 2px;
            // background: $base;
            transition: all .3s cubic-bezier(0.35, 0, 0.25, 1);
            .core {
                margin: 0 3*$gutter;
                height: 2px;
                background: $base;
            }
        }
    }
}
</style>
