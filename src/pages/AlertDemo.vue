<template>
    <a-scroll-view class="flex">
        <a-button type="primary" :is-radius="true" :is-ghost="true" @click="$alert('hello atom !')" class="gutter flex-item--center">
            Alert
        </a-button>
    </a-scroll-view>
</template>
<script>
export default {
    name: 'AlertDemo'
};
</script>
<style scoped lang="scss">

</style>
