<template>
  <div>
	<v-card-title>
		Account Details
	</v-card-title>
</div>
</template>
<script>
import {mapMutations} from "vuex"
export default {
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
	}
}
</script>
<style lang="">

</style>
