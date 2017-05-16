<template>
    <div class="page-category">
      <VMenu></VMenu>
    </div>
</template>
<script>
import VMenu from '@/packages/Menu/Menu'
export default {
    name: 'Category',
    data() {
        return {
            msg: '分类'
        }
    },
    components: {
        VMenu
    }
}
</script>
<style scoped lang="scss">
</style>
