<template>
	<div>
		<bbsTemplate 
			:emoji="getEmoji"
			:config="getTableConfig"
			:s3Img="getS3Img"
			:lists="getQuestionLists"
		/>
	</div>
</template>
<script>
import bbsTemplate from "@/components/ModuleC/bbs/bbsTemplate.vue"
// import QuestionPopup from "./QuestionPopup.vue"
import {mapGetters, mapMutations} from "vuex"
export default {
	components : {
		// QuestionPopup,
		bbsTemplate,
	},
	data(){
		return {
		}
	},
	computed : {
		...mapGetters('questionList',[
			'getQuestionLists',
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
