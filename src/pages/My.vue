<template>
    <div class="page-my">
        <div class="box">
            <div class="circle">
                <img src="https://avatars0.githubusercontent.com/u/8264787?v=3&s=460">
            </div>
        </div>



		<VSwitch></VSwitch>
        <VButton type="ghost" icon="remove" :loading="false" :disabled="false" :inline="false">Ok</VButton>

		<Checkbox v-model="Checkbox"></Checkbox>
    </div>
</template>
<script>
import VButton from '@/packages/Button/Button'
import Checkbox from '@/packages/Checkbox/Checkbox'
import VSwitch from '@/packages/Switch/Switch'


export default {
    name: 'My',
    data() {
        return {
        	Checkbox: true
        }
    },
    components: {VButton, Checkbox, VSwitch}
}
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.page-my {
	.box{padding: .3rem;background: #fff;box-shadow: $shadowDown;
		.circle{width: 3rem;height: 3rem;border-radius: 100%;overflow: hidden;margin: auto;
			img{display: block;width: 100%;}
		}
	}
}

</style>
