<script>
export default {
    name: 'AtomButtonGroup',

    render(h) {
        return h(
            'div',
            {
                class: 'atom-btn-group'
            },
            this.$slots.default
        );
    }
};
</script>