<template>
  <div>
	<ChangeUserNameC />
  </div>
</template>
<script>
import ChangeUserNameC from "@/components/AccountC/ChangeUserNameC.vue"
import {mapMutations} from "vuex"
export default {
	components : {
		ChangeUserNameC
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
