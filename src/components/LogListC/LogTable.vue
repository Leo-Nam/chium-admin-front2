<template>
	<div>
		<bbsTemplate 
			:emoji="getEmoji"
			:config="getTableConfig"
			:s3Img="getS3Img"
			:lists="getLogList"
		/>
	</div>
</template>
<script>
import bbsTemplate from "@/components/ModuleC/bbs/bbsTemplate.vue"
// import LogPopup from "./LogPopup.vue"
import {mapGetters, mapMutations} from "vuex"
export default {
	components : {
		// LogPopup,
		bbsTemplate,
	},
	data(){
		return {
			dialog : false,
			content : null,
		}
	},
	computed : {
		...mapGetters('log',[
			'getLogList',
			'getEmoji', 
			'getTableConfig',
			'getS3Img',
		])
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
	}
}
</script>
<style lang="">

</style>
