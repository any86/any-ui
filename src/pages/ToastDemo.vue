<template>
    <a-scroll-view class="demo-page">
        <a-cell @click="closeAfterTimeout">3秒后自动关闭</a-cell>
    </a-scroll-view>
</template>
<script>
import { AScrollView, ACell } from '@/packages'

export default {
    name: 'FingerDemo',

    data() {
        return {
            activeIndex: 0
        };
    },

    methods: {
        closeAfterTimeout(){
            // const vnode = this.$createElement(VButton);
            this.$toast('3秒后关闭', {delay: 1000});
        }
        
    },

    components: {
        AScrollView,
        ACell
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
