<template>
    <div class="full-screen">
        
        <div id="box" class="box" >
            <div id="content" class="content">
                内容            
            </div>
        </div>


        <Popper>
            <button ref="button"  class="button button-warning">确定</button>
            <div slot="content">
                <VSwitch v-model="isShow">这是popper</VSwitch>
                <VCell>11111</VCell>
            </div>
        </Popper>
        <VCell>{{value}}</VCell>
        <VPicker :isShow.sync="isShow" v-model="value" :dataSource="dataSource"></VPicker>
    </div>
</template>
<script>
import * as Dom from '@/packages/Tools/dom.js'
import Popper from '@/packages/Popper/Popper'
import VSwitch from '@/packages/Switch/Switch'
import VCell from '@/packages/Cell/Cell'
import VPicker from '@/packages/PopupPicker/PopupPicker';

export default {
    name: 'Canvas',

    data() {
        return {
            isShow: false,
            value: [1],
            dataSource: [[
                { label: '中国', value: 1 },
                { label: '美国', value: 11 }
            ]]
        }
    },

    mounted() {
        
    },

    methods: {
        click(e) {
            var h = Dom.getHeight(e.target);
            // dir(h)
        }
    },

    components: {
        Popper, VSwitch, VCell, VPicker
    }
}
</script>
<style lang="scss">
@import '../scss/theme.scss';
.box{
    box-sizing: content-box;
    width: 200px;
    height: 200px;
    background: $base;
    padding:15px;
    border:1px solid $dark;
    overflow: auto;
}

.content{
    box-sizing: content-box;
    width: 400px;
    height: 400px;
    background: $success;
    padding:15px;
    border:1px solid $lightest;    
}


.button {
    position: absolute;
    bottom: 10%;
    left: 50%;
    width: 3rem;
    height: 1rem;
}
</style>
