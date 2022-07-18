<template>
	<div>
		<bbsTemplate 
			:emoji="getEmoji"
			:config="getTableConfig"
			:s3Img="getS3Img"
			:lists="getReportList"
			:to="goToContent"
		/>
	</div>
</template>
<script>
import bbsTemplate from "@/components/ModuleC/bbs/bbsTemplate.vue"
import {mapGetters} from "vuex"
export default {
	components : {
		bbsTemplate,
	},
	computed : {
		...mapGetters('report',[
			'getReportList',
			'getEmoji', 
			'getTableConfig',
			'getS3Img',
		])
	},
	methods : {
		goToContent(Id){
			this.$router.push({ path: `./${Id}`})
		},
	}
}
</script>
<style lang="">

</style>
