<template>
    <div class="component-adsorb" :class="{'component-adsorb-fixed': scrollY > top}">
        <!-- {{scrollY}}|{{top}} -->
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Adsorb',

    props: {
        scrollY: {

        }
    },

    data() {
        return {
            top: 0,
            isFixed: false,
        };
    },

    mounted() {
        this.top = this.$el.getBoundingClientRect().top;
    },

    methods: {
        findScrollParent(el) {
            var parentNode = el.parentNode;
            var overflowY = getComputedStyle(parentNode, null).overflowY;
            while ('scroll' != overflowY && parentNode) {
                parentNode = parentNode.parentNode;
                overflowY = getComputedStyle(parentNode, null).overflowY;
            }
            return parentNode;
        },

        animate(from, to, time, cb) {
            var tween = new TWEEN.Tween({ value: from });
            tween.to({ value: to }, time);
            tween.start();
            animate();
            function animate() {
                requestAnimationFrame(animate);
                TWEEN.update();
            }
            tween.onUpdate(function () {
                cb(this.value);
            });
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-adsorb {
    position: relative;

    &-fixed{
        position: fixed;top:0;left:0;z-index: 100;width: 100%;
    }
}
</style>
