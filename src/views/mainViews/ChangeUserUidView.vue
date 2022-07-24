<template>
  <div>
	<ChangeUserUid />
  </div>
</template>
<script>
import ChangeUserUid from "@/components/AccountC/ChangeUserUid.vue"
import {mapMutations} from "vuex"
export default {
	components : {
		ChangeUserUid
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
