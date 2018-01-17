<script>
export default {
    name: 'AtButtonGroup',

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
<style scoped lang="scss">
@import '../../scss/variables.scss';
.atom-btn-group {
    display: flex;
    >>>.atom-btn {
        flex: 1;
        border-radius: 0;

        &:not(:last-child) {
            border-right: none;
        }
    }
}
</style>
