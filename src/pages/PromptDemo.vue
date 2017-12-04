<template>
    <v-scroll-view>
        <v-button :is-ghost="true" @click="handle" class="gutter">
            hello atom
        </v-button>
    </v-scroll-view>
</template>
<script>
import VCell from '@/packages/Cell/Cell';
import VButton from '@/packages/Button/Button';
import VScrollView from '@/packages/ScrollView/ScrollView';
export default {
    name: 'PromptDemo',

    data() {
        return {

        };
    },

    methods: {
        handle(){
            this.$prompt('hello atom ?', {
                onOk(text){
                    alert(text)
                }
            });
        }
    },

    components: {
        VButton,
        VCell,
        VScrollView
    }
};
</script>
<style scoped lang="scss">

</style>
