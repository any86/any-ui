<template>
    <FlexBox class="atom-tab-bar"><slot></slot></FlexBox>
</template>

<script>
import FlexBox from '@/packages/Static/FlexBox/FlexBox';

export default {
  name: 'TabBar',

  mounted(){

  },

  data () {
    return {
      msg: 'TabBar'
    }
  },

  components: {FlexBox}

}
</script>

<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-tab-bar{
    position: fixed;z-index: $tabBarZIndex; bottom: 0;left:0;width: 100%;box-shadow: $shadowUp;
}
</style>
