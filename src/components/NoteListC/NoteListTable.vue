<template>
	<div>
		<bbsTemplate 
			:emoji="getEmoji"
			:config="getTableConfig"
			:s3Img="getS3Img"
			:lists="getNoteLists"
		/>
	</div>
</template>
<script>
import bbsTemplate from "@/components/ModuleC/bbs/bbsTemplate.vue"
import {mapGetters, mapMutations} from "vuex"
export default {
	components : {
		// LogPopup,
		bbsTemplate,
	},
	data(){
		return {
		}
	},
	computed : {
		...mapGetters('noteList',[
			'getNoteLists',
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
