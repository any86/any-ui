<template>
  <div class="component-stepper">
    <!-- 禁用 -->
    <template v-if="disabled">
      <Icon class="button disabled" value="minus"></Icon>
      <span class="content disabled">{{value}}</span>
      <Icon class="button disabled" value="plus"></Icon>
    </template>
    <!-- 非禁用 -->
    <template v-else>
      <Icon :class="['button', 'button-minus', min == value && 'disabled']" value="minus" @click="minus">
      </Icon>
      <span class="content" @click="click">{{value}}</span>
      <Icon :class="['button', 'button-plus', max == value && 'disabled']" value="plus" @click="plus">
      </Icon>
    </template>
  </div>
</template>
<script>
import Icon from '@/packages/Icon/Icon'
export default {
  name: 'Stepper',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    min: {
      type: Number,
      default: 1
    },

    max: {
      type: Number,
      default: 99
    },

    step: {
      type: Number
    },

    value: {
      type: [Number, String],
      required: true
    }
  },

  methods: {
    click() {
      this.$emit('click');
    },

    minus() {
      const number = parseInt(this.value);
      if (this.min < number) {
        this.$emit('input', number - 1);
      } else {
        this.$emit('reachMin');
      }

    },

    plus() {
      const number = parseInt(this.value);
      if (this.max > number) {
        this.$emit('input', number + 1);
      } else {
        this.$emit('reachMax');
      }
    },
  },

  components: {
    Icon
  }
}

</script>
<style scoped lang=scss>
@import '../../scss/theme.scss';
$height: .5rem;
.component-stepper {
  position: relative;
  display: inline-block;
  border: 1px solid $lighter;
  height: $height;
  overflow: hidden;
  >.button {
    height: $height;
    line-height: $height;
    width: $height;
    color: $darker;
    font-size: $bigger;
    text-align: center;
    &.disabled {
      border-color: $disabled;
      color: $disabled;
    }
    &:not(.disabled):active {
      color: $base;
    }
    &.button-minus {
      border-right: 1px solid $lighter;
    }
    &.button-plus {
      border-left: 1px solid $lighter;
    }
  }
  >.content {
    display: inline-block;
    padding: 0 $gutter;
    min-width: $height * 1.4;
    color: $darkest;
    font-size: $bigger;
    text-align: center;
    position: relative;
    &.disabled {
      color: $disabled;
    }
  }
}
</style>
