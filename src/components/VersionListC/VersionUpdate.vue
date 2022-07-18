<template>
  <div>
	<v-row>
		<v-col
			cols="auto"
		>
			<ProjectList />
		</v-col>
		<v-col
			cols="auto"
		>
			<VersionUpdateCategory />
		</v-col>
		<v-col
			cols="auto"
		>
			{{ getVersionStateChanged }}
		</v-col>
		<v-col
			cols="auto"
		>
			<v-btn @click="commitVersionChangedDetails">
				입력하기
			</v-btn>
		</v-col>
	</v-row>
    <v-row>
      <v-col
        cols="auto"
      >
		<v-textarea
			id="content"
			dense
			hide-details=""
			solo
			style="width:500px"
			@input="MyVmodel($event)"
		/>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from "vuex"
import ProjectList from "@/components/VersionListC/ProjectList.vue"
import VersionUpdateCategory from "@/components/VersionListC/VersionUpdateCategory.vue"
export default {
	components : {
		ProjectList,
		VersionUpdateCategory,
	},
	data(){
		return {
			content: null
		}
	},
  
	computed : {
		...mapGetters('common',['getVersionInfo', 'getVersionStateChanged']),
		...mapGetters('versionControl',['getChangedVersion']),
	},

	watch : {
	},

	methods : {	
		...mapMutations('versionControl',['setChangedVersionContent']),
		...mapActions('versionControl',['sp_admin_insert_version_info']),
		MyVmodel(e){
			this.content = e
			this.setChangedVersionContent(e)
			console.log(e)
		},
		commitVersionChangedDetails(){
			if(this.content === null){
				alert('내용을 입력해주세요')
			} else {
				if(this.getChangedVersion === null){
					alert('변경할 버전을 선택해주세요')
				}else {
					this.sp_admin_insert_version_info()
					console.log('components:VersionListC:VersionUpdate.vue:commitVersionChangedDetails:','commit Version Updated ....')
				}
			}
		},
	}
}
</script>
<style>
</style>