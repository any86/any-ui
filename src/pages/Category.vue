<template>
    <div class="page-category">
      <Menu></Menu>
    </div>
</template>
<script>
import Menu from '@/packages/Menu/Menu'
export default {
    name: 'Category',
    data() {
        return {
            msg: '分类'
        }
    },
    components: {
        Menu
    }
}
</script>
<style scoped lang="scss">
</style>
