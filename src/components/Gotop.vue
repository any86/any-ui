<template>
  <div class="component-gotop">
    <Icon value="chevron-up"></Icon>
  </div>
</template>
<script>
export default {
  name: 'GoTop',
}

</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
.component-gotop {
  position: fixed;
  bottom: 1.2rem;
  right: .3rem;
  z-index: 999;
  background: rgba($darkest, .8);
  text-align: center;
  width: .8rem;
  height: .8rem;
  line-height: .8rem;
  border-radius: .8rem;
  font-size: $biggest;
  color: $sub;
  &:active{background: rgba($darkest, .5);}
}

</style>
