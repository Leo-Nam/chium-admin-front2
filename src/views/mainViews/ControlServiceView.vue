<template>
  <div>
	<ControlService />
  </div>
</template>
<script>
import ControlService from "@/components/ControlServiceC/ControlService.vue"
import {mapMutations, mapActions} from "vuex"
export default {
	components : {
		ControlService
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		this.sp_req_b_genders()
	},
	methods : {
		...mapActions('auth',['sp_req_b_genders']),
		...mapMutations('common',['setCurrentRoute']),
	},
}
</script>
<style >
</style>
