<template>
    <div class="component-circle">
        <p>{{value}}%</p>
        <svg :viewBox="`0 0 100 100`" xmlns="http://www.w3.org/2000/svg">
            <circle class="backdrop" :r="40" :cy="50" :cx="50" stroke-width="3" stroke="#ddd" fill="none" />
            <circle class="progress" :r="40" :cy="50" :cx="50" stroke-width="3" stroke="none" fill="none" :stroke-dasharray="strokeDasharray" :style="{'transition-duration': `${speed}ms`}" />
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
        speed: {
            type: Number,
            default: 0
        }
    },

    computed: {
        strokeDasharray() {
            return `${2 * Math.PI * 40 * this.value / 100} ${2 * Math.PI * 40}`;
        }
    }

}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-circle {
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
        color: $base;
    }
    svg {
        transform: rotate(-90deg);
        >.backdrop {
            stroke: $darker;
        }
        >.progress {
            stroke: $base;
            transition-property: stroke-dasharray;
        }
        >text {
            fill: #f10;
        }
    }
}
</style>
