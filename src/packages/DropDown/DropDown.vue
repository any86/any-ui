<template>
    <div class="component-drop-down">
        <ul>
            <li></li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'DropDown',

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
.component-drop-down {

}
</style>
