<template>
  <div>
	<ChangeUserNameC />
  </div>
</template>
<script>
import ChangeUserNameC from "@/components/AccountC/ChangeUserNameC.vue"
import {mapGetters, mapMutations} from "vuex"
export default {
	components : {
		ChangeUserNameC
	},
	computed : {
		...mapGetters('auth',['getUserInfo'])
	},
	mounted(){
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
	},
}
</script>
<style >
</style>
