<template>
    <div class="component-tabs">
        <div ref="header" class="header">
            <div ref="film" class="film" :style="{width: header.filmWidth+'px'}">
                <span :class="['button', i == active && 'active']" v-for="(title, i) in titles" @click="changeItem(i)">{{title}}</span>
            </div>
            <div class="active-line" :style="{width: buttonWidth[active] + 'px', transform: 'translate3d(' + translateX + 'px,0,0)'}">
                <div class="core"></div>
            </div>
        </div>
        <div class="body">
            <div class="item">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Tabs',

    props: {
        value: {}
    },

    mounted() {
        this.$children[this.active].isShow = true;
        // 等待v-for把所有按钮生成
        this.$nextTick(() => {
            // 计算每个按钮宽度
            // 计算film宽度
            var buttons = this.$refs.film.childNodes;
            [].forEach.call(buttons, button => {
                var style = getComputedStyle(button, null);
                // 向上取整
                var width = Math.ceil(style.width.replace('px', ''));
                var padding = ~~style.paddingLeft.replace('px', '');
                width += 2 * padding
                this.buttonWidth.push(width);
                this.header.filmWidth += width;
            })
        });
    },

    data() {
        return {
            header: {
                filmWidth: 0
            },
            body: {
                filmWidth: 0
            },
            count: 0,
            buttonWidth: [],
            titles: [],
            active: 0
        }
    },

    methods: {
        changeItem(index) {
            this.active = index;
            this.$children.forEach((item, i) => {
                item.isShow = false;
                if (index == i) {
                    item.isShow = true;
                } else {
                    item.isShow = false;
                }
            });
        }
    },

    computed: {
        translateX() {
            var translateX = 0;
            for (var i = 0; i < this.active; i++) {
                translateX += this.buttonWidth[i];
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
                clear: both;
            }
            .button {
                float: left;
                display: block;
                padding: 2*$gutter 4*$gutter;
                text-align: center;
                color: $darkest;
                font-size: $normal;
                &.active {
                    color: $base;
                }
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
    .body {
        display: flex;
        .item {
            flex: 0 0 100%;
        }
    }
}
</style>
