<template>
    <ScrollView :scrollY="scrollY">
        <div ref="popper" class="popper">123</div>
        <button ref="button" class="button button-block button-danger fixed-bottom" @click="ok">preview</button>
    </ScrollView>
</template>
<script>
import Popper from 'popper.js'
export default {
    name: 'Canvas',

    data() {
        return {
            scrollY: 0,
            isShowBox: true
        }
    },

    mounted() {
        
        dir(Popper)
        var popper = new Popper(this.refs.button, this.refs.popper, {
            placement: 'top'
        });

        console.log(123333333)
    },

    methods: {
        ok() {
            this.isShowBox = !this.isShowBox;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.box-1 {
    height: 2rem;
    width: 2rem;
    background: $base;
    color: sub;
    line-height: 2rem;
    text-align: center;
    margin: auto;
}

.box-2 {
    height: 2rem;
    width: 2rem;
    background: $success;
    color: sub;
    line-height: 2rem;
    text-align: center;
    margin: auto;
}
</style>
