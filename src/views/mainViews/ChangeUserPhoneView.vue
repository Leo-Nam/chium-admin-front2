<template>
  <div>
	<ChangeUserPhone />
  </div>
</template>
<script>
import ChangeUserPhone from "@/components/AccountC/ChangeUserPhone.vue"
import {mapMutations} from "vuex"
export default {
	components : {
		ChangeUserPhone
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
