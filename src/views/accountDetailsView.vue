<template>
  <div>
	<AccountDetails />
  </div>
</template>
<script>
import AccountDetails from "@/components/AccountC/AccountDetails.vue"
import {mapGetters} from "vuex"
export default {
	components : {
		AccountDetails
	},
	computed : {
		...mapGetters('auth',['getUserInfo'])
	},
	mounted(){
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
