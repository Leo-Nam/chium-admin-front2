<template>
  <div>
	<v-card-title>
		버전정보
	</v-card-title>
	<div v-if="getUserInfo.depId===2">
		<VersionUpdate />
	</div>
	<div 
		v-for="info in getVersionList"
		:key="info.ID"
	>
		<v-row style="height: 100px;">
			<v-col cols="auto">
				<v-row style="height: 20px;">
					<v-col cols="auto">Ver. {{ info.VERSION }}
					</v-col>
				</v-row>
				<v-row style="height: 20px;">
					<v-col cols="auto">{{ getTime(info.PROJECT_NAME) }}
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="auto">
				<v-row style="height: 20px;">
					<v-col cols="auto">{{ getTime(info.CREATED_AT) }}
					</v-col>
				</v-row>
				<v-row style="height: 20px;">
					<v-col cols="auto">
						{{ showContent(info.CONTENT) }}
					</v-col>
				</v-row>
				<v-row style="height: 20px;">
					<v-col cols="auto">commited by {{ getTime(info.CREATOR_NAME) }}
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from "vuex"
import VersionUpdate from "@/components/VersionListC/VersionUpdate.vue"
export default {
	components : {
		VersionUpdate,
	},
	data(){
		return {
			content: null
		}
	},
	created(){
		this.init()
		this.setCurrentRoute(this.$route.name)
	},
	computed : {
		...mapActions('versionControl',['sp_admin_get_version_list']),
		...mapGetters('versionControl',['getVersionList']),
		...mapGetters('auth',['getUserInfo'])
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
		getTime(time){
			if (time){
				return time.slice(0,19)
			}
			return time
		},
		async init(){
			await this.sp_admin_get_version_list;
		},
		showContent(e){
			let content = e.split('\n')
			content = e.replace(/(?:\r\n|\r|\n)/g, '<br />')
			return content
		},
	}
}
</script>
<style lang="">

</style>
