<template>
    <div class="atom-progress-circle">
        <svg :viewBox="`0 0 ${2*c} ${2*c}`" xmlns="http://www.w3.org/2000/svg">
            <g :stroke-width="borderWidth" fill="none" :transform="`rotate(-90, ${c} ${c})`">
                <circle :r="radius" :cy="c" :cx="c" class="backdrop" stroke="#ddd" />
                <circle :stroke-linecap="0 === value ? 'butt' : 'round'" :r="radius" :cy="c" :cx="c" class="progress" stroke="none" :stroke-dasharray="strokeDasharray" :style="{'transition-duration': `${duration}ms`}" />
            </g>
            <text v-if="hasNumber && undefined ===$slots.default" x="50%" y="50%" :font-size="radius/2" text-anchor="middle" dominant-baseline="middle">{{value}}%</text>
        </svg>
        <div v-if="undefined !== $slots.default" class="atom-progress-circle__slot">
            <slot></slot>
        </div>
    </div>
</template>

<script>
// 假定viewBox为100 * 100
export default {
    name: 'AtomCircle',
    props: {
        value: {
            type: [Number, String],
            default: 0
        },

        duration: {
            type: Number,
            default: 300
        },

        hasNumber: {
            type: Boolean,
            default: true
        },

        trailColor: {
            type: String
        },

        strokeColor: {
            type: String,
            default: '#000'
        }
    },
    data() {
        return { size: 100, borderWidth: 3 };
    },

    computed: {
        c() {
            return this.radius + this.borderWidth;
        },

        radius() {
            return (this.size - this.borderWidth) / 2;
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
@import '../../scss/variables.scss';
.atom-progress-circle {
    position: relative;
    svg {
        g {
            .backdrop {
                stroke: $lightest;
            }
            .progress {
                stroke: $primary;
                transition-property: stroke-dasharray;
            }
        }
        text {
            fill: $primary;
        }
    }
    &__slot {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        > * {
            text-align: center;
        }
    }
}
</style>
