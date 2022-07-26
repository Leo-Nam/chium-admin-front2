<template>
	<v-select
		:items="projectList"
		:menu-props="{ maxHeight: '200' }"
		class="custom"
		dense
		height="20"
		hide-details
		@change="changeProject"
		style="max-width:150px"
	/>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
export default {
	data(){
		return{
			projectList: [],
		}
	},
	computed : {
		...mapGetters('versionControl',[ 'getProjectList']),
	},
	created() {
		this.getProjectNames()
	},
	methods : {
		...mapMutations('versionControl',['setChangedProject']),
		changeProject(a){
			this.setChangedProject(this.getProjectList[this.projectList.indexOf(a)].ID)
		},
		async getProjectNames(){
			for (let i=0;i<this.getProjectList.length;i++){
				this.projectList.push(this.getProjectList[i].NAME)
			}
		}
	}
}
</script>
<style lang="scss" >
.custom {
	border-style : none;
}
</style>