<script>
export default {
    name: 'AtomTag',

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