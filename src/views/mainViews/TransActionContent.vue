<template>
  <div>
    <TransactionDetail />
  </div>
</template>
<script>
import TransactionDetail from "@/components/TransactionContentC/TransactionDetail.vue"
import {mapActions} from "vuex"
export default {
  components : {
    TransactionDetail
  },
  created(){
    const transactionId = Number(this.$route.params.id)
    this.sp_admin_get_new_transaction_details({transactionId})
  },
  methods : {
    ...mapActions('transaction',['sp_admin_get_new_transaction_details'])
  },

}
</script>
<style lang="">

</style>
