<script>
export default {
    name: 'AtTag',

    props: {
        type: {
            type: String,
            default: 'primary'
        },

        isGhost: {
            type: Boolean,
            default: true
        }
    },

    render(createElement) {
        return createElement('span', { class: ['atom-tag', `atom-tag${this.isGhost ? '-ghost' : ''}--${this.type}`] }, this.$slots.default);
    }
};
</script>
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-tag {
    display: inline-table;
    padding: $gutter/8 $gutter/2;
    font-size: $small;
    border-radius: $borderRadius;
}

@each $key, $value in $theme_colors {
    .atom-tag-ghost--#{$key} {
        border: 1px solid $value;
        color: $value;
    }
}

@each $key, $value in $theme_colors {
    .atom-tag--#{$key} {
        border: 1px solid $value;
        background: $value;
        color: $sub;
    }
}
</style>
