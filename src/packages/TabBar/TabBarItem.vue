<template>
    <FlexItem class="component-tab-bar-item"><slot></slot></FlexItem>
</template>

<script>
import FlexItem from '@/packages/Static/FlexBox/FlexItem';
export default {
  name: 'TabBarItem',

  mounted(){

  },

  data () {
    return {
      msg: 'TabBarItem'
    }
  },

  components: {FlexItem}
}
</script>

<style scoped lang="scss">

</style>
