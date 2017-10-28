<template>
    <div class="atom-circle">
        <!-- <p>{{value}}%</p> -->
        <svg :viewBox="`0 0 ${2*c} ${2*c}`" xmlns="http://www.w3.org/2000/svg">
            <g :r="radius" :cy="c" :cx="c" :stroke-width="borderWidth">
                <circle class="backdrop" stroke="#ddd" fill="none" />
                <circle class="progress" stroke="none" fill="none" :stroke-dasharray="strokeDasharray" :style="{'transition-duration': `${duration}ms`}" />
            </g>
            <!-- <text x="40" y="40" font-size="16">{{value}}%</text> -->
        </svg>
    </div>
</template>
<script>
// 假定viewBox为100 * 100
export default {
    name: 'Circle',

    props: {
        value: {
            type: Number,
            default: 80
        },
        duration: {
            type: Number,
            default: 0
        },

        radius: {
            type: Number,
            default: 40
        },

        borderWidth: {
            type: Number,
            default: 3
        }
    },

    data() {
        return {};
    },

    computed: {
        c() {
            return this.radius + this.borderWidth;
        },

        strokeDasharray() {
            return `${2 * Math.PI * this.radius * this.value / 100} ${2 *
                Math.PI *
                this.radius}`;
        }
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-circle {
    position: relative;
    overflow: hidden;
    p {
        font-size: $biggest;
        margin: auto;
        text-align: center;
        position: absolute;
        z-index: 2;
        width: 100%;
        transform: translateY(-50%);
        top: 50%;
        color: $primary;
    }
    svg {
        g {
            transform: rotate(-90deg);
            .backdrop {
                stroke: $lightest;
            }
            .progress {
                stroke: $base;
                transition-property: stroke-dasharray;
            }
        }

        text {
            fill: $primary;
        }
    }
}
</style>
