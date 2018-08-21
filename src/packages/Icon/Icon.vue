<template>
    <component 
        v-bind="$attrs"
        v-on="$listeners"
        :size="size" 
        :is="`A${name.substring(0,1).toUpperCase()+name.substring(1)}`" 
        :style="{'vertical-align': vAlign}"
        class="atom-icon"/>
</template>
<script>
import APlus from './Plus';
import AArrow from './ArrowRight';
import AArrowLeft from './ArrowLeft';
import AArrowRight from './ArrowRight';
import AArrowUp from './ArrowUp';
import AArrowDown from './ArrowDown';
import AMinus from './Minus';
import AMenu from './Menu';
import AClose from './Close';
import ATick from './Tick';
import AStar from './Star';
import AStarO from './StarO';
import AStarHalf from './StarHalf';
import AWarning from './Warning';
import AStar3d from './Star3d';
import AStarO3d from './StarO3d';
import AStarHalf3d from './StarHalf3d';

export default {
    name: 'AtomIcon',

    props: {
        size: {
            default: 48,
        },

        name: {
            type: String,
            required: true,
        },

        vAlign: {
            type: String,
            default: 'bottom'
        }
    },

    components: {AArrow, APlus, AArrowRight,AArrowLeft, AArrowUp, AArrowDown,AMinus, AMenu, AClose, ATick, AStar, AStarHalf, AStarO, AWarning,AStar3d,AStarO3d,AStarHalf3d },
};
</script>