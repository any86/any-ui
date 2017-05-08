<template>
  <h5 class="filter-title">{{data.title}}</h5>
  <div class="input-daterange input-group">
      <input  v-model="data.children.begin.value" type="text" class="form-control" :placeholder="data.children.begin.placeholder" />
      <span class="input-group-addon">至</span>
      <input  v-model="data.children.end.value" type="text" class="form-control":placeholder="data.children.end.placeholder" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      twoWay: true
    }
  }
}
</script>

<style scoped lang=scss>
input{font-size: 14px;}
</style>
