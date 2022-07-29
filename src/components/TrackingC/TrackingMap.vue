<template>
  <v-card>
	<div>
		<DisplayTracking
			:key="renderKey"
			:tracking="getTrackingInfo"
		/>
	</div>
  </v-card>
</template>
<script>
import EventBus from '../../EventBus';
import DisplayTracking from "./DisplayTracking.vue"
import {mapGetters, mapMutations} from "vuex"
export default {
	data(){
		return{
			renderKey: 0,
		}
	},
	components : {
		DisplayTracking,
	},
	computed : {
		...mapGetters('tracking',[
			'getTrackingTimeStamp',
		]),
		...mapGetters('sseStore',[
			'getTrackingInfo',
		]),
	},
	created() {
		EventBus.$on('push-tracking', (payload)=>{
			console.log('payload>>>>>>', payload)
			this.updateTracking()
			if(payload.timestamp !== null && Number(this.getTrackingTimeStamp) !== Number(payload.timestamp)){
				this.renderKey += 1
				this.setTrackingTimeStamp(payload)
			}
		});
	},
	methods : {
		...mapMutations('tracking',['setTrackingTimeStamp']),
		updateTracking(){
			console.log('updateTracking')
			this.renderKey += 1
		}
	}
}
</script>