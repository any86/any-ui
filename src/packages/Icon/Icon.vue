<template>
    <component v-bind="$attrs" v-on="$listeners" :size="size" :is="`A${value.substring(0,1).toUpperCase()+value.substring(1)}`" :style="{transform: `rotate(${angel}deg)`}" class="atom-icon"/>
</template>
<script>
import APlus from './Plus';
import AArrow from './Arrow';
import AMinus from './Minus';
import AMenu from './Menu';
import AClose from './Close';
import ATick from './Tick';
import AStar from './Star';
import AStarO from './StarO';
import AWarning from './Warning';

export default {
    name: 'AtomIcon',

    props: {
        size: {
            default: 48
        },

        angel: {
            default: 0
        },

        value: {
            type: String,
            required: true
        }
    },

    components: { APlus, AArrow, AMinus, AMenu, AClose, ATick, AStar, AStarO, AWarning }
};
</script>

<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-icon {
    transition: transform $duration;
    will-change: transform;
}
</style>
