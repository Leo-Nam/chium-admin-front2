<template>
  <div>
	<AccountDetails />
  </div>
</template>
<script>
import AccountDetails from "@/components/AccountC/AccountDetails.vue"
import {mapGetters,mapMutations} from "vuex"
export default {
	components : {
		AccountDetails
	},
	computed : {
		...mapGetters('auth',['getUserInfo'])
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
.container-box {
  height: 700px !important;
  justify-content: center;
  align-items: center;
  display: flex;

}
</style>
