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
		showMeLog(logIdx){
			const newArr = this.getLogList[logIdx].JOB_NAME.split('/n')
			this.content = newArr
			this.dialog = true
		},
		closeDialog(){
			this.dialog = false
		},
		returnUrl1(Id){
			if (Id !== null){
				return `/admin/main/emissions/${Id}`
			} else {
				return
			}
		},
		returnUrl2(Id){
			if (Id !== null){
				return `/admin/main/note-list/${Id}`
			} else {
				return
			}
		},
		returnUrl3(Id){
			if (Id !== null){
				return `/admin/main/biddings/${Id}`
			} else {
				return
			}
		},
		returnUrl4(Id){
			if (Id !== null){
				return `/admin/main/transaction/${Id}`
			} else {
				return
			}
		},
		returnUrl5(Id){
			if (Id !== null){
				return `/admin/main/report/${Id}`
			} else {
				return
			}
		},
		returnUrl6(Id, userType){
			if (Id !== null){
				if (userType === 'member'){
					return `/admin/main/emitter-collector/${Id}`
				} else {
					return `/admin/main/not-member/${Id}`
				}
			} else {
				return
			}
		},
		returnUrl7(Id){
			if (Id !== null){
				return `/admin/main/person-emitter/${Id}`
			} else {
				return
			}
		},
	}
}
</script>
<style lang="">

</style>
