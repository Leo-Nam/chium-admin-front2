<template>
  <div>
    <TransactionDetail />
  </div>
</template>
<script>
import TransactionDetail from "@/components/TransactionContentC/TransactionDetail.vue"
import {mapActions, mapMutations} from "vuex"
export default {
	components : {
		TransactionDetail
	},
	created(){
		const transactionId = Number(this.$route.params.id)
		this.sp_admin_get_new_transaction_details({transactionId})
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
		...mapActions('transaction',['sp_admin_get_new_transaction_details'])
	},
}
</script>
<style lang="">

</style>
