<template>
    <a-star :size="size" :status="0.5"/>
</template>

<script>
import AStar from './Star';
export default {
    name: 'AtomIconStarHalf',

    components: {AStar},

    props: {
        size: {
            default: 48
        }
    }
};
</script>