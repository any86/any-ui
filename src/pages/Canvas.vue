<template>
    <ScrollView v-model="scrollY">
        <h4>{{rotate.rotation}}</h4>
        <div ref="box" class="box">
            <img ref="avator" class="avator" src="../assets/avator.jpeg" :style="{transform: `rotate(${rotate}deg)`}">
        </div>
    </ScrollView>
</template>
<script>
import Hammer from 'hammerjs'
export default {
    name: 'Canvas',

    data() {
        return {
            scrollY: 0,
            rotate: '',
        }
    },

    mounted() {
        try {
            var hammertime = new Hammer(this.$refs.box, {});
            hammertime.get('rotate').set({ enable: true });
            hammertime.on('rotate', (ev) => {
                this.rotate = ev
            });
        } catch (e) {
            alert(e)
        }
    },

    methods: {

    },
    components: {}
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
h4 {
    word-break: break-all;
}

.box {
    width: 100%;
    padding: $gutter*3;
    background: $sub;
    border-bottom: 1px solid $lightest;
}

.avator {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    margin: auto;
}
</style>
