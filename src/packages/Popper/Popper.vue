<template>
    <div class="component-popper">
        <slot></slot>
    </div>
</template>
<script>
import Popper from 'popper.js'
export default {
    name: 'Popper',

    data() {
        return {};
    },

    mounted() {
        this.$nextTick(() => {
            var el = this.$slots.default[0].elm;
            const node = document.createElement('div');
            node.id = `_root-app-popper`;
            node.className = 'component-popper';
            node.appendChild(el);
            document.body.appendChild(node);

        });
    },

    methods: {
        showPopper() {

        }
    }
}
</script>
<style  lang="scss">
@import '../../scss/theme.scss';
.component-popper {
    padding: 15px;
    border: 1px solid $base;
}
</style>
