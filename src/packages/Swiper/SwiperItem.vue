<template>
    <div class="swiper-slide">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'SwiperItem',

    data(){
    	return {ready: false};
    },

    mounted(){
    	this.$nextTick(()=>{
    		this.ready = true;
    	});
    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
.swiper-slide{position: relative;}
</style>
