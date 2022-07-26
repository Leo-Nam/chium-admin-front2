<template>
	<div 
		:style="{
			'width': `${tableConfig.textFieldBig.width}`,
			'height': `${tableConfig.textFieldBig.height}`,
			'border': `${tableConfig.textFieldBig.border}`,
			'border-radius': `${tableConfig.textFieldBig.borderRadius}`,
			'vertical-align': `${tableConfig.textFieldBig.verticalAlign}`,
			'display': `${tableConfig.textFieldBig.display}`,
			'padding-left': `${tableConfig.textFieldBig.paddingLeft}`,
		}"
	>
		{{ text }}
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
		text: null,
	},
	computed : {
		...mapGetters('common',[
			'getTableConfig'
		]),

	},
	created() {
		this.tableConfig = this.getTableConfig
	},
}
</script>
<style lang="">
</style>