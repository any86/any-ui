<template>
    <component 
        v-bind="$attrs"
        v-on="$listeners"
        :size="size" 
        :is="`A${name.substring(0,1).toUpperCase()+name.substring(1)}`" 
        class="atom-icon"/>
</template>
<script>
import APlus from './Plus';
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
    },

    components: { APlus, AArrowRight,AArrowLeft, AArrowUp, AArrowDown,AMinus, AMenu, AClose, ATick, AStar, AStarHalf, AStarO, AWarning },
};
</script>