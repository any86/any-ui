<script>
export default {
    name: 'Divider',

    functional: true,

    render(createElement) {
        return createElement('div', {class: 'atom-divider'});
    }

};
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.atom-divider {
    margin: 0;
    height: 1px;
    border: none;
    background: $lightest;
    width: 100%;
    overflow: hidden;
}
</style>
