<template>
	<v-select
		:items="items"
		:menu-props="{ maxHeight: '200' }"
		class="custom"
		dense
		height="20"
		hide-details
		@change="changeCategory"
		style="max-width:100px"
	/>
</template>
<script>
import { mapMutations, mapGetters } from "vuex"
import packageJson from "/package.json"
export default {
	data(){
		return{
			items: ['major', 'minor', 'patch'],
			packageJson : packageJson,
			version : {
				fullVersion: null,
				majorVersion: 0,
				minorVersion: 0,
				patchVersion: 0
			},
			prevVersion: null,
			nextVersion: null,
		}
	},
	computed : {
		...mapGetters('common',[ 'getVersionInfo']),
	},
	mounted() {
		this.parseVersionInfo()
	},
	methods : {
		...mapMutations('common',['changeVersionInfo', 'setVersionInfo']),
		...mapMutations('versionControl',['setChangedVersionNew']),
		changeCategory(a){
			this.prevVersion = this.packageJson.version
			console.log('components:VersionListC:VersionUpdateCategory.vue:changeCategory:','this.prevVersion >>>', this.prevVersion)
			this.parseVersionInfo()
			console.log('components:VersionListC:VersionUpdateCategory.vue:changeCategory:',a)
			this.changeVersionInfo(a)
			this.nextVersion = this.getVersionInfo
			this.setChangedVersionNew(this.nextVersion.fullVersion)
			console.log('components:VersionListC:VersionUpdateCategory.vue:changeCategory:','this.nextVersion >>>', this.nextVersion['fullVersion'])
		},

		right(str, chr) {
			return str.slice(str.length-chr,str.length);
		},
	
		left(str, chr) {
			return str.slice(0, chr - str.length);
		},

		parseVersionInfo(){
			this.version.fullVersion = this.packageJson.version
			let currentFullVersion = this.version.fullVersion
			let firstComma = this.version.fullVersion.indexOf('.', 0)
			let secondComma = this.version.fullVersion.indexOf('.', firstComma+1)
			this.version.majorVersion = this.left(this.version.fullVersion, firstComma)
			this.version.minorVersion = this.version.fullVersion.substring(firstComma+1, secondComma)
			this.version.patchVersion = this.version.fullVersion.substring(secondComma+1, this.version.fullVersion.length)
			this.setVersionInfo(this.version)

			return currentFullVersion
		}
	}
}
</script>
<style lang="scss" >
.custom {
	border-style : none;
}
</style>