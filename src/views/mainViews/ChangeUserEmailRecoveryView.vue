<template>
  <div>
	<ChangeUserEmailRecovery />
  </div>
</template>
<script>
import ChangeUserEmailRecovery from "@/components/AccountC/ChangeUserEmailRecovery.vue"
import {mapMutations} from "vuex"
export default {
	components : {
		ChangeUserEmailRecovery
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('이게 나와야지??? this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
	},
}
</script>
<style >
</style>
