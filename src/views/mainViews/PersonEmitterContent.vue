<template>
  <div>
    <v-card>
      <PersonEmitterInfo />
    </v-card>
  </div>
</template>
<script>
import PersonEmitterInfo from "@/components/PersonEmitterContentC/PersonEmitterInfo.vue"
import {mapActions,mapMutations} from "vuex"
export default {
	components : {
		PersonEmitterInfo
	},
	created(){
		const personEmitterId = this.$route.params.id
		this.sp_admin_get_personal_details(personEmitterId)
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
		...mapActions('selectedUser',['sp_admin_get_personal_details'])
	},
}
</script>
<style lang="">

</style>
