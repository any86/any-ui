<template>
    <div class="atom-steps__item">
        <span :class="{'item__circle--active': isActive}" class="item__circle">{{index + 1}}</span>
        <span v-if="!isLast" class="item__line"></span>
        <div class="item__content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AtomStepsItem',

    data() {
        return { index: 0, isLast: true };
    },

    mounted() {
        this.index = this.$parent.count++;
        this.$nextTick(() => {
            this.isLast = this.index == this.$parent.count - 1;
        });
    },

    computed: {
        isActive(){
            return this.index == this.$parent.value;
        }
    }
};
</script>