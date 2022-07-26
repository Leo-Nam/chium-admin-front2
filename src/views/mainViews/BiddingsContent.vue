<template>
  <div>
    <BiddingDetail />
  </div>
</template>
<script>
import BiddingDetail from "@/components/BiddingContentC/BiddingDetail.vue"
import {mapActions, mapMutations} from "vuex"
export default {
	components : {
		BiddingDetail
	},
	created(){
		const biddingId = this.$route.params.id
		this.sp_admin_get_new_bidding_details({biddingId})
		this.setCurrentRoute(this.$route.name)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
		...mapActions('biddings',['sp_admin_get_new_bidding_details'])
	},
}
</script>
<style lang="">

</style>
