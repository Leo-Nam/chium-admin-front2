<template>
  <div>
    <ReportDetail />
  </div>
</template>
<script>
import ReportDetail from "@/components/ReportContentC/ReportDetail.vue"
import {mapActions, mapMutations} from "vuex"
export default {
	components : {
		ReportDetail
	},
	created(){
		const reportId = Number(this.$route.params.id)
		this.sp_admin_get_new_report_details({reportId})
		this.setCurrentRoute(this.$route.name)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
		...mapActions('report',['sp_admin_get_new_report_details'])
	},
}
</script>
<style lang="">

</style>
