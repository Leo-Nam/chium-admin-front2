<template>
  <div>
	<ChangeUserBirthDate />
  </div>
</template>
<script>
import ChangeUserBirthDate from "@/components/AccountC/ChangeUserBirthDate.vue"
import {mapMutations} from "vuex"
export default {
	components : {
		ChangeUserBirthDate
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
