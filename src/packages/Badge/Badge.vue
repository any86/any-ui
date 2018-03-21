<template>
    <span :class="['atom-badge--' + type]" class="atom-badge">
        <slot></slot>
        <span :class="classNames">
            {{value}}
        </span>
    </span>

</template>
<script>
export default {
    name: 'AtomBadge',

    props: {
        value: {
            type: [Number, String]
        },

        type: {
            type: [String],
            default: 'danger'
        }
    },

    computed: {
        classNames() {
            // 如果是内容
            // 否则是点
            if (undefined !== this.value) {
                let className = ['atom-badge__content'];
                if (this.$slots.default) {
                    className.push('atom-badge__content--fixed');
                }
                return className;
            } else {
                let className = ['atom-badge__dot'];
                if (this.$slots.default) {
                    className.push('atom-badge__dot--fixed');
                }
                return className;
            }
        }
    }
};
</script>