<template>
  <div>
	<ChangeUserGender />
  </div>
</template>
<script>
import ChangeUserGender from "@/components/AccountC/ChangeUserGender.vue"
import {mapMutations, mapActions} from "vuex"
export default {
	components : {
		ChangeUserGender
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
