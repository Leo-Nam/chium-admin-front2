<template>
	<div>
		<bbsTemplate 
			:emoji="getEmoji"
			:config="getTableConfig"
			:s3Img="getS3Img"
			:lists="getBiddingsList"
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
		...mapGetters('biddings',[
			'getBiddingsList',
			'getEmoji', 
			'getTableConfig',
			'getS3Img',
		])
	},
	methods : {
		goToContent(siteId){
			this.$router.push({ path: `./${siteId}`})
		},
	}
}
</script>
<style lang="">

</style>
