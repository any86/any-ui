<template>
	<div class="com-textarea">
		<textarea 
			v-if="opts.disabled"
			disabled 
	    	:placeholder="opts.placeholder" 
	    	:value="value" 
	    	class="form-control" 
	    	:style="{height: opts.height, resize: opts.resize ? 'auto' : 'none' }">
	    </textarea>


	    <textarea 
	    	v-else
	    	:placeholder="opts.placeholder" 
	    	:value="value" 
	    	@blur="input"
	    	@focus="selectAll"
	    	class="form-control" 
	    	:style="{height: opts.height, resize: opts.resize ? 'auto' : 'none' }">
	    </textarea>		
	</div>
</template>

<script>
export default {
	name: 'Textarea',

	props: {
		opts: {
			type: Object
		},
		value: {
			type: String,
			
			default(){ return '' }

		}
	},

	methods: {
		input(e){
			this.$emit('input', e.target.value);
		},

		selectAll(e){
			e.target.select();
		}

	}
}
</script>

<style scoped lang=scss>
.com-textarea{
	overflow: hidden;
}
</style>
