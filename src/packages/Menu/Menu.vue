<template>
    <div class="component-menu">
        <ul>
            <li></li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Menu',

    props: {
        value: {
            type: [Number, String]
        },

        dataSource: {
            type: Array
        }
    },

    data() {
        return {
            show: true
        };
    },

    mounted() {


    }
}
</script>
<style scoped lang="scss">
.component-menu {

}
</style>
