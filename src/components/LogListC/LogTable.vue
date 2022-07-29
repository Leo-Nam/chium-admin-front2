<template>
	<div>
		<bbsTemplate 
			:key="renderKey"
			:emoji="getEmoji"
			:config="getTableConfig"
			:s3Img="getS3Img"
			:lists="getLogList"
		/>
	</div>
</template>
<script>
import EventBus from '../../EventBus';
import bbsTemplate from "@/components/ModuleC/bbs/bbsTemplate.vue"
// import LogPopup from "./LogPopup.vue"
import {mapGetters, mapMutations, mapActions} from "vuex"
export default {
	components : {
		// LogPopup,
		bbsTemplate,
	},
	data(){
		return {
			dialog : false,
			content : null,
			sseTimeStamp: null,
			eventBusCount: 0,
			renderKey: 0,
			reloadCount: 0
		}
	},
	computed : {
		...mapGetters('log',[
			'getLogList',
			'getEmoji', 
			'getTableConfig',
			'getS3Img',
			'getLogTimeStamp',
		]),
		...mapGetters('sseStore',['getSeletedUser'])
	},
	created(){
		EventBus.$on('push-sse', (payload)=>{
			console.log('payload>>>>>>', payload)
			this.updateLoglist()
			if(payload !== null && Number(this.getLogTimeStamp) !== Number(payload)){
				this.sseTimeStamp = payload;
				this.eventBusCount++;
				this.renderKey += 1
				this.setLogTimeStamp(payload)
			}
		});
		this.setCurrentRoute(this.$route.name)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
		...mapMutations('log',['setLogTimeStamp']),
		...mapActions('log',['sp_admin_get_new_logs']),
		updateLoglist(){
			console.log('updateLoglist')
			this.renderKey += 1
			this.sp_admin_get_new_logs({orderId : null})
		}
	}
}
</script>
<style lang="">

</style>
