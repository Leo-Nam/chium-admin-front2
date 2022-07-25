<template>
  <div>
	<ChangeUserAvatar />
  </div>
</template>
<script>
import ChangeUserAvatar from "@/components/AccountC/ChangeUserAvatar.vue"
import {mapMutations} from "vuex"
export default {
	components : {
		ChangeUserAvatar
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
