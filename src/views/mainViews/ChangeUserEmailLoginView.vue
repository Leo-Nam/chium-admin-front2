<template>
  <div>
	<ChangeUserEmailLogin />
  </div>
</template>
<script>
import ChangeUserEmailLogin from "@/components/AccountC/ChangeUserEmailLogin.vue"
import {mapMutations} from "vuex"
export default {
	components : {
		ChangeUserEmailLogin
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('이게 나와야지111??? this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
	},
}
</script>
<style >
</style>
