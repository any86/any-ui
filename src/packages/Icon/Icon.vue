<template>
    <component v-bind="$attrs" v-on="$listeners" :is="`A${value.substring(0,1).toUpperCase()+value.substring(1)}`"/>
</template>
<script>
import AAdd from './Add';
import AArrow from './Arrow';
import AMinus from './Minus';
import AMenu from './Menu';
import AClose from './Close';
import ATick from './Tick';
import AStar from './Star';
import AStarO from './StarO';
export default {
    name: 'AtomIcon',

    props: {
        size: {
            default: 48
        },

        value: {
            type: String,
            required: true
        }
    },

    components: { AAdd, AArrow, AMinus, AMenu, AClose, ATick, AStar, AStarO }
};
</script>

<style scoped lang="scss">
@import '../../scss/variables.scss';
</style>
