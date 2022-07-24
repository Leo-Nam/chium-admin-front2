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
		console.log('이게 나와야지??? this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
	},
}
</script>
<style >
</style>
