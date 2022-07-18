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
	created(){
		console.log('this.getEmitterCollectorEmoji', this.getEmitterCollectorEmoji)
	},
	methods : {
		getTime(time){
			return time.slice(0,19)
		},
		goToContent(siteId){
			this.$router.push({ path: `emitter-collector/${siteId}`})
		},
		checkEmOrCol(code){
			if (Number(code) == 9){
				return '배출자'
			}
			return '수거자1'
		},
		changeValue(type, binding, v){
			if (type ==='datetime'){
				return this.getTime(v)
			} else {
				if (binding === 'TRMT_BIZ_CODE'){
					return this.checkEmOrCol(v)
				} else {
					return v
				}
			}
		}
	}



}
</script>
<style lang="">

</style>
