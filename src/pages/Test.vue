<template>
    <main>
        <a-cell @click="go" v-for="(item) in list" :key="item.id">
            {{item.title}}
        </a-cell>
    </main>
</template>
<script>

import zh from '@/locale/lang/zh-CN.js';
import en from '@/locale/lang/en.js';
import ar from '@/locale/lang/ar.js';
import axios from 'axios';
import { ACell } from '@/packages'

export default {
    name: 'TestDemo',

    data() {
        return {
            list: []
        };
    },

    async mounted() {
        const {data} = await axios.get('https://cnodejs.org/api/v1/topics', {params: {}});
        this.list = data.data;
    },

    methods: {
       go(){
           this.$router.push({path: '/alert'});
       }
    },

    components: {
        ACell
    }
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
</style>
