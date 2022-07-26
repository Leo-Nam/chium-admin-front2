<template>
	<div>
		<bbsTemplate 
			:emoji="getEmitterCollectorEmoji"
			:config="getEmitterCollectorTableConfig"
			:s3Img="getS3Img"
			:lists="getEmitterCollectorList"
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
	data(){
		return{
		}
	},
	computed : {
		...mapGetters('emitterCollector',[
			'getEmitterCollectorList',
			'getEmitterCollectorTableConfig',
			'getEmitterCollectorEmoji',
			'getS3Img',
		])
	},
	methods : {
		goToContent(siteId){
			this.$router.push({ path: `emitter-collector/${siteId}`})
		},
	}



}
</script>
<style lang="">

</style>
