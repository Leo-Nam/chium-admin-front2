<template>
	<div>
		<bbsTemplate 
			:emoji="getPersonEmitterEmoji"
			:config="getPersonEmitterTableConfig"
			:s3Img="getS3Img"
			:lists="getPersonEmitterList"
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
		...mapGetters('emitterCollector',[
			'getPersonEmitterList', 
			'getPersonEmitterEmoji', 
			'getPersonEmitterTableConfig',
			'getS3Img',
		]),
	},
	created(){
		console.log('this.getPersonEmitterEmoji1111111', this.getPersonEmitterEmoji)
	},
	methods : {
		getTime(time){
			if (time){
				return time.slice(0,19)
			}
			return time
		},
		goToContent(Id){
			this.$router.push({ path: `./${Id}`})
		},
		changeStateToEmoji(state){
			return  state ? '✅' : '❌'
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
