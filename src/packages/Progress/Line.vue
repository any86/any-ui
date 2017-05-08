<template>
    <div class="component-progress-line">
        <div class="body" :style="{width: progress + '%', transition: 'width ' + this.time + 'ms linear'}"></div>
    </div>
</template>
<script>
export default {
    name: 'ProgressLine',

    props: {
        value: {
            type: [Number, String]
        },

        time: {
            type: [Number, String]
        }
    },

    data() {
        return {
            progress: 0
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.progress = this.value;
        })

    }
}
</script>
<style scoped lang="scss">
.component-progress-line {
    height: 1px;
    position: relative;
    overflow: hidden;
    .body {
        width: 0;
        height: 2px;
        background: #ccc;
    }
}
</style>
