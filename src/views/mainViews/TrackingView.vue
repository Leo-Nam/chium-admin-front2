<template>
  <div>
    <TrackingMap />
  </div>
</template>
<script>
import TrackingMap from "@/components/TrackingC/TrackingMap.vue"
import {mapActions, mapMutations} from "vuex"
export default {
	components : {
		TrackingMap
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
