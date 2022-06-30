<template>
  <div>
    <BiddingDetail />
  </div>
</template>
<script>
import BiddingDetail from "@/components/BiddingContentC/BiddingDetail.vue"
import {mapActions} from "vuex"
export default {
  components : {
    BiddingDetail
  },
  created(){
    const biddingId = this.$route.params.id
    this.sp_admin_get_new_bidding_details({biddingId})
  },
  methods : {
    ...mapActions('biddings',['sp_admin_get_new_bidding_details'])
  },

}
</script>
<style lang="">

</style>
