<template>
	<div>
		<v-switch
			:input-value="value"
			inset
			:style="{
				'height': `${tableConfig.switch.height}`,
				'margin-top': `${tableConfig.switch.marginTop}`
			}"
			:disabled="disabled"
		></v-switch>
	</div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
	data(){
		return{
			tableConfig:{}
		}
	},
	props: {
		value: {
			type: Boolean,
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
	},
	computed : {
		...mapGetters('common',[
			'getTableConfig'
		]),

	},
	created() {
		this.tableConfig = this.getTableConfig
		console.log(this.value === 1 ? true : false, this.disabled)
	},
}
</script>
<style lang="">
</style>