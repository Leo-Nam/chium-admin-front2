<template>
  <div>
	<ChangeResolution />
  </div>
</template>
<script>
import ChangeResolution from "@/components/AccountC/ChangeResolution.vue"
import {mapMutations} from "vuex"
export default {
	components : {
		ChangeResolution
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
