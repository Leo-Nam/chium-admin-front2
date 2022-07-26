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
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
	},
}
</script>
<style >
</style>
