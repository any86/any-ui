<template>
  <transition v-if="animate" name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div v-show="value" @click.self="close" @touchstart.self="close" class="component-mask" :style="{position, background, zIndex}">
      <slot></slot>
    </div>
  </transition>
  <div v-else v-show="value" @click.self="close" @touchstart.self="close" class="component-mask" :style="{position, background, zIndex}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Mask',

  props: {
    value: {
      type: Boolean
    },

    background: {
      type: String,
      default: 'rgba(0,0,0, 0.5)'
    },

    lock: {
      type: Boolean,
      default: false
    },

    animate: {
      type: Boolean,
      default: true
    },

    zIndex: {
      type: Number
    },

    isFixed: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    afterLeave() {
      this.$emit('after-leave');
    },

    afterEnter() {
      this.$emit('after-enter');
    },

    close() {
      if (!this.lock) {
        this.$emit('input', false);
      }
    }
  },

  computed: {
    position() {
      return this.isFixed ? 'fixed' : 'absolute';
    }
  }
};

</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-mask {
  z-index: $maskZIndex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
