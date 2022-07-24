<template>
  <div>
	<ChangeUserEmail />
  </div>
</template>
<script>
import ChangeUserEmail from "@/components/AccountC/ChangeUserEmail.vue"
import {mapMutations} from "vuex"
export default {
	components : {
		ChangeUserEmail
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('이게 나와야지...!!!??? this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
	},
}
</script>
<style >
</style>
