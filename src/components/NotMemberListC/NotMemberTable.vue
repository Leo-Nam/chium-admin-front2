<template>
	<div>
		<bbsTemplate 
			:emoji="getNotMemberEmoji"
			:config="getNotMemberTableConfig"
			:s3Img="getS3Img"
			:lists="getNotMemberList"
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
		return {
		}
	},
	computed : {
		...mapGetters('notMember',['getNotMemberList']),
		...mapGetters('emitterCollector',[
			'getNotMemberEmoji', 
			'getNotMemberTableConfig',
			'getS3Img'
		]),
	},
	methods : {

		goToContent(Id){
			this.$router.push({ path: `./${Id}`})
		},

		getTime(time){
			if (time){
				return time.slice(0,19)
			}
			return time
		},
		changeValue(type, v){
			if (type ==='datetime'){
				return this.getTime(v)
			} else {
				return v
			}
		}
	}
}
</script>
<style lang="">

</style>
