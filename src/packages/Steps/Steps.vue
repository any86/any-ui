<template>
    <div class="atom-steps">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'AtomSteps',

    props: {
        value: {
            type: Number,
            default: 0
        }
    },

    data(){
        return {count: 0};
    }
}
</script>