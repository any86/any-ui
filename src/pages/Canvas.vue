<template>
    <div class="full-screen">
        <Popper>
            <button ref="button" class="button button-warning ">确定</button>
            <div slot="content">
                <VSwitch v-model="isShow">这是popper</VSwitch>
            </div>
        </Popper>
    </div>
</template>
<script>
import Popper from '@/packages/Popper/Popper'
import VSwitch from '@/packages/Switch/Switch'

export default {
    name: 'Canvas',

    data() {
        return {
            isShow: true
        }
    },

    mounted() {
    },

    components: {
        Popper, VSwitch
    }
}
</script>
<style lang="scss">
@import '../scss/theme.scss';
.button{position: absolute;bottom:30%;left: 50%; width: 3rem;height:1rem;}
</style>
