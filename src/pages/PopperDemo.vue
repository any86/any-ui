<template>
        <main>
            <v-cell>
                <v-popper :is-show.sync="isShow1" >
                    <p style="padding:15px;">请输入用户名</p>
                    <label slot="reference">用户名: <input @focus="isShow1=true" type="text"/></label>
                </v-popper>
            </v-cell>
            <v-cell>
                <v-popper :is-show.sync="isShow2">
                    <p style="padding:15px;">用户名密码不对!</p>
                    <v-button slot="reference" type="warning" class="gutter-sm" @click="isShow2=true">弹出</v-button>
                </v-popper>
            </v-cell>
        </main>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VGroup from '@/packages/Group/Group';
import VButton from '@/packages/Button/Button';
import VPopper from '@/packages/Popper/Popper';
export default {
    name: 'PopperDemo',

    data() {
        return {
            isShow1: false,
            isShow2: false,
        };
    },

    mounted() {},

    methods: {

    },

    components: {
        VCell,
        VGroup,
        VPopper,
        VButton
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.popperNode {
    padding: 30px;
    box-shadow: $shadowDown;
}
</style>
