<template>
  <div>
    성공적으로 로그아웃 되셨습니다.
  </div>
</template>
<script>
import {mapMutations} from "vuex"
export default {
	created(){
		this.logout()
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
		...mapMutations('auth',['logout']),
	},
}
</script>
<style lang="">

</style>
