<template>
  <section class="filter" :class="{fixed: isFixed}" :style="{top: isFixed ? `${fixedDistance}px` : 0}">
    <ul class="menu">
      <li v-for="(item, i) in dataSource" @click="switchPanel(i)" :class="{active: i == activeIndex[0]}">
        {{1 < item.length ? item[activeIndex[1]].title : item[0].title}} <Icon v-if="1 < item.length" :class="{rotate: i == expandIndex}" value="chevron-up" class="icon">
          </Icon>
      </li>
    </ul>
    <!-- 菜单选项 -->
    <ul v-if=" -1 < expandIndex && 1 < dataSource[expandIndex].length" v-show="isShow" class="dropdown">
      <li v-for="(item, i) in dataSource[expandIndex]" @click="change(expandIndex, i)" :class="{active: i == activeIndex[1]}">
        {{item.title}}
      </li>
    </ul>
  </section>
</template>
<script>
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
    },
  },

  data() {
    return {
      dataSource: [
        [{ title: 'Default', value: 0 },
          { title: 'Recomond', value: 1 },
          { title: 'Hight To Low', value: 2 },
          { title: 'Low To Hight', value: 3 }
        ],
        [{ title: 'Best Selling', value: 4 }],
        [{ title: 'Newest', value: 5 }]
      ],
      isFixed: false,
      offsetTop: 0, // 距离父容器顶部距离
      fixedDistance: 0,
      activeIndex: [0, 0],
      expandIndex: -1,
    };
  },

  mounted() {
    this.offsetTop = this.$el.offsetTop + this.$el.parentNode.offsetTop;
    this.fixedDistance = this.$el.getBoundingClientRect().top - this.offsetTop;
    this.fixedDistance = parseInt(this.fixedDistance);
  },

  methods: {
    switchPanel(index) {
      this.expandIndex = index;
      if (1 < this.dataSource[index].length) {
        this.$emit('expand-menu', { index, isMulti: true });
      } else {
        this.activeIndex = [index, 0];
        this.$emit('change', { index, optionsIndex: 0 })
        this.$emit('expand-menu', { index, isMulti: false });
      }
    },

    change(tabsIndex, optionsIndex) {
      this.expandIndex = -1;
      this.activeIndex = [tabsIndex, optionsIndex];
      this.$emit('change', { tabsIndex, optionsIndex })
    }
  },

  watch: {
    scrollY(value) {
      if (value > this.offsetTop) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
        const { top } = this.$el.getBoundingClientRect();
      }
    }
  },
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
    // transition:all .2s;
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
      border-width: 1px 0 1px 0;
      &:last-child {
        border-right-width: 0;
      }

      >.icon {
        transition: all .6s;
        &.rotate {
          transform: rotate(180deg);
        }
      }

      &.active {
        color: $base;
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
      font-size: $big;
      &.active {
        color: $base;
      }
    }
  }
}

</style>
