<template>
    <div class="component-tabs">
        <div class="header">
            <span :class="['button', i == active && 'active']" v-for="(title, i) in titles" @click="changeItem(i)">{{title}}</span>
        </div>

        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Tabs',

    props: {
        value: {}
    },

    mounted() {
        this.$children[this.active].isShow = true;
    },

    data() {
        return {titles: [], active: 0}
    },

    methods: {
        changeItem(index){
            this.active = index;
            this.$children.forEach((item, i)=>{
                item.isShow = false;
                if(index == i) {
                    item.isShow = true;
                } else {
                    item.isShow = false;
                }
            });
        }
    },

    components: {}
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.component-tabs{
    .header{
        box-shadow:$shadowDown;width: 100%;
        .button{padding:$gutter 2*$gutter; display: inline-block;text-align: center;color:$darkest;font-size: $normal;
            &.active{border-bottom:2px solid $base;}
        }
    }
    .body{

    }
}
</style>
