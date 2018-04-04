<template></template>

<script>
export default {
    name: 'LoadingDemo',

    mounted(){
        this.$loading();
        setTimeout(()=>{this.$loading.close()}, 2000);
    },
};
</script>
