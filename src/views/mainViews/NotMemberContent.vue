<template>
  <div>
    <v-card>
      <NotMemberDetail />
    </v-card>
  </div>
</template>
<script>
import NotMemberDetail from "@/components/NotMemberContentC/NotMemberDetail.vue"
import {mapActions,mapMutations} from "vuex"
export default {
	components : {
		NotMemberDetail
	},
	created(){
		const notMemberId = this.$route.params.id
		this.sp_admin_retrieve_prospective_site_info({siteId : notMemberId})
		this.sp_req_b_trmt_biz()
		this.setCurrentRoute(this.$route.name)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
		...mapActions('notMember',['sp_admin_retrieve_prospective_site_info', 'sp_req_b_trmt_biz'])
	},
}
</script>
<style lang="">

</style>
