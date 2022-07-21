<template>
  <div>
	<AccountDetails />
  </div>
</template>
<script>
import AccountDetails from "@/components/AccountC/AccountDetails.vue"
import {mapMutations} from "vuex"
export default {
	components : {
		AccountDetails
	},
	mounted(){
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
	},
}
</script>
<style >
</style>
