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
			console.log('components:VersionListC:VersionUpdateCategory.vue:changeProject:a',a)
			console.log('components:VersionListC:VersionUpdateCategory.vue:changeProject:a',this.projectList.indexOf(a))
			this.setChangedProject(this.getProjectList[this.projectList.indexOf(a)].ID)
		},
		getProjectNames(){
			for (let i=0;i<this.getProjectList.length;i++){
				this.projectList.push(this.getProjectList[i].NAME)
			}
			console.log('this.projectList >>>>>>>>>', this.projectList)
		}
	}
}
</script>
<style lang="scss" >
.custom {
	border-style : none;
}
</style>