<template>
    <ScrollView v-model="scrollY" class="page-canvas">
        <!-- <VPopup :value="true"> -->

            <VCell v-for="n in 10" :key="n" border="true">{{n}}</VCell> 

             <!-- <VCell border="true">{{value}}</VCell>  -->

             <VCell border="true">
                <VInput v-model="active" placeholder="请搜索"></VInput>
            </VCell>

             <VCell v-for="n in 10" :key="n" border="true">XXX-{{n}}</VCell> 
            <!-- <VPicker v-model="value" :dataSource="dataSource"></VPicker> -->
        <!-- </VPopup> -->
    </ScrollView>
</template>
<script>
import VPicker from '@/packages/Picker/Picker';
import VDialog from '@/packages/Dialog/Dialog';
import VPopup from '@/packages/Dialog/Popup';
import VCell from '@/packages/Cell/Cell';
import VInput from '@/packages/Input/Input';
export default {
    name: 'Canvas',

    data() {
        return {
            scrollY: 0,
            active: '苹果🍎',
            value: [1, 2],
            dataSource: [
                [{ label: '中国', value: 1 }, { label: '美国', value: 2 }, { label: '日本🇯🇵', value: 3 }],
                [{ label: '菠萝🍍', value: 1 }, { label: '橘子🍊', value: 2 }, { label: '苹果🍎', value: 3 }]
            ]
        }
    },

    mounted() {

    },

    methods: {

    },
    components: { VInput, VPicker, VDialog, VCell, VPopup }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';


</style>
