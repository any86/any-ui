<template>
    <section class="row row-select-size">
        <div class="divider"></div>
        <!-- <VSteps>
                <VStep>
                    Select Your Size:
                    <a class="text-info">Size Guide ></a>
                    <ul class="options">
                        <li v-for="n in 7" :class="{active: n == 1}">{{n}}(U.S.)</li>
                    </ul>
                </VStep>
                <VStep>
                    <button class="button button-block button-danger">ADD TO CART</button>
                </VStep>
            </VSteps> -->
    
        Select Your Size:
        <a class="text-info">Size Guide ></a>
        <ul class="options">
            <li v-for="(item, i) in dataSource" :key="item.text" :class="{active: activeIndex == i}" @click="select(i)">{{item.text}}</li>
        </ul>
    
    </section>
</template>
<script>
import VSteps from '@/packages/Steps/Steps.vue'
import VStep from '@/packages/Steps/Step.vue'
export default {
    name: 'SelectSize',

    props: {
        dataSource: {
            type: Array,
            default(){
                return [{text: '5(U.S.)'},{text: '6(U.S.)'},{text: '7(U.S.)'},{text: '8(U.S.)'},{text: '9(U.S.)'}];
            }
        }
    },

    data(){
        return {activeIndex: 0};
    },

    methods: {
        select(index){
            this.activeIndex = index;
        }
    },

    components: { VSteps, VStep }
}
</script>
<style scoped lang="scss">
@import '../../../scss/theme.scss';
.row-select-size {
    margin-top: $gutter;
    .text-info {
        text-decoration: underline;
    }
    .options {
        display: flex;
        width: 100%;
        flex-flow: row wrap;
        li {
            transition: all .2s;
            padding: $gutter/2;
            border: 1px solid $lightest;
            flex: 0 1 20%;
            margin-right: 5%;
            margin-top: $gutter;
            text-align: center;
            &.active {
                border: 1px solid $danger;
                color: $danger;
            }
        }
    }
}
</style>
