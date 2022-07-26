<template>
	<div>
		<bbsTemplate 
			:emoji="getEmoji"
			:config="getTableConfig"
			:s3Img="getS3Img"
			:lists="getEmissionsList"
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
		...mapGetters('emissions',[
			'getEmissionsList',
			'getEmoji', 
			'getTableConfig',
			'getS3Img',
		]),
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
