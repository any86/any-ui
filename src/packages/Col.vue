<template>
    <span :class="className" :style="{paddingLeft: gutter / 2 + 'px', paddingRight: gutter / 2 + 'px'}">
        <slot></slot>
    </span>
</template>
<script>
export default {
    name: 'Col',

    props: {
        xs: {
            default: 12
        },

        sm: {
            default: 12
        },

        md: {
            default: 12
        },

        lg: {
            default: 12
        },

        xl: {
            default: 12
        },

        offset: {
            default: 0
        },

        pull: {
            default: 0
        },

        push: {
            default: 0
        }
    },

    mounted() {
        this.gutter = this.$parent.$options.propsData.gutter;
    },

    data() {
        return {
            gutter: 0
        };
    },

    computed: {
        className() {
            var array = [
                'v-col-xs-' + this.xs,
                'v-col-sm-' + this.sm,
                'v-col-md-' + this.md,
                'v-col-lg-' + this.lg,
                'v-col-xl-' + this.xl
            ];
            // offset
            if (0 < this.offset) {
                array.push('v-col-offset-' + this.offset);
            }

            // pull
            if (0 < this.pull) {
                array.push('v-col-pull-' + this.pull);
            }

            // push
            if (0 < this.push) {
                array.push('v-col-push-' + this.push);
            }

            // span
            if (0 < this.span) {
                array.push('v-col-span-' + this.span);
            }

            return array.join(' ');
        }
    },

    methods: {

    }
}
</script>
<style lang="scss" scoped>
.flex-row{
    
}

$coulums: 12;
@mixin column($i) {
    // transition: all 1s;
    background: #eee;
    border: 1px solid #ddd;
    box-sizing: border-box;
    display: block;
    float: left;
    min-height: 1px;
    position: relative;
    width: 100%;
    // width: 100 / $coulums * $i + %;
    width: percentage($i / $coulums);
}

// 手机垂直状态
@media (max-width: 575px) {
    @for $i from 1 through $coulums {
        .v-col-xs-#{$i} {
            @include column($i);
        }
    }
}

// 手机横屏和pad垂直
@media (min-width: 576px) and (max-width: 767px) {
    @for $i from 1 through $coulums {
        .v-col-sm-#{$i} {
            @include column($i);
        }
    }
}

// pad垂直
@media (min-width: 768px) and (max-width: 991px) {
    @for $i from 1 through $coulums {
        .v-col-md-#{$i} {
            @include column($i);
        }
    }
}

// 小尺寸pc桌面系统
@media (min-width: 992px) and (max-width: 1199px) {
    @for $i from 1 through $coulums {
        .v-col-lg-#{$i} {
            @include column($i);
        }
    }
}

// 大尺寸pc桌面系统
@media (min-width: 1200px) {
    @for $i from 1 through $coulums {
        .v-col-xl-#{$i} {
            @include column($i);
        }
    }
}

// offset, 距离左侧偏移量
@for $i from 1 through $coulums {
    .v-col-offset-#{$i} {
        margin-left: 100 / $coulums * $i + %;
    }
}

// push
@for $i from 1 through $coulums {
    .v-col-push-#{$i} {
        left: 100 / $coulums * $i + %;
    }
}

// pull
@for $i from 1 through $coulums {
    .v-col-pull-#{$i} {
        right: 100 / $coulums * $i + %;
    }
}
</style>
