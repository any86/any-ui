<template>
  <section class="filter" :class="{fixed: isFixed}" :style="{top: isFixed ? `${fixedDistance}px` : 0}">
    <ul class="menu">
      <li @click="change(0)">Price</li>
      <li @click="change(1)">Default</li>
      <li @click="change(2)">Newest</li>
    </ul>
    <ul v-show="isShow" class="dropdown">
      <li v-for="item in dataSource[activeIndex]">{{item}}</li>
    </ul>
  </section>
</template>
<script>
import VPopup from '@/packages/Dialog/Popup'
export default {
  name: 'FilterLayout',

  props: {
    scrollY: {
      type: Number,
      default: 0
    },

    isShow: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dataSource: [
        ['Hight To Low', 'Low To Hight'],
        ['Default', 'Best Selling', 'Recomond'],
        ['Newest']
      ],
      activeIndex: -1,
      isFixed: false,
      offsetTop: 0, // 距离父容器顶部距离
      fixedDistance: 0
    };
  },

  mounted() {
    this.offsetTop = this.$el.offsetTop + this.$el.parentNode.offsetTop;
    this.fixedDistance = this.$el.getBoundingClientRect().top - this.offsetTop;
    this.fixedDistance = parseInt(this.fixedDistance);
  },

  methods: {
    change(index) {
      this.activeIndex = index;
      this.$emit('change', index);
    }
  },

  watch: {
    scrollY(value) {
      // this.isFixed = value >= this.offsetTop;
      if (value >= this.offsetTop) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
        const { top } = this.$el.getBoundingClientRect();
      }
    }
  },

  components: { VPopup }

}

</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$height:1rem;
.filter {
  position: absolute;
  top: 0;
  background: $background;
  width: 100%;
  &.fixed {
    position: fixed;
    z-index: 10;
    top: 1.2rem;
  }
  ul.menu {
    height: $height;
    display: flex;
    li {
      flex: 1;
      height: $height;
      width: 100%;
      line-height: $height;
      display: block;
      font-size: $big;
      text-align: center;
      border-color: $lightest;
      border-style: solid;
      border-width: 1px 1px 1px 0;
      &:last-child {
        border-right-width: 0;
      }
    }
  }

  ul.dropdown {
    background: $background;
    position: relative;
    z-index: 10;
    li {
      padding: 3*$gutter;
      border-bottom: 1px solid $lightest;
    }
  }
}

</style>
