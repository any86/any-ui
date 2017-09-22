<template>
    <ScrollView v-model="scrollY" class="page-demo">
        <VGoTop v-show="0 < scrollY" @click.native="gotop"></VGoTop>
    </ScrollView>
</template>
<script>
import VMask from '@/packages/Dialog/Mask'
import VGoTop from '@/components/GoTop'
import VPopup from '@/packages/Dialog/Popup'
import Spinner from '@/packages/Spinner/Spinner.vue'
import VLazyLoad from '@/packages/LazyLoad/LazyLoad'
export default {
    name: 'List',

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {

    },

    watch: {

    },

    components: {

    }
}

</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-demo {}
</style>
