<template>
  <v-app>
    <v-navigation-drawer
      v-model="value"
      app
    >
      <!-- --><NavList />
    </v-navigation-drawer>

    <v-app-bar
      dense
      color="#01b286"
      app
    >
      <v-app-bar-nav-icon @click.stop="toggle" />
      <v-toolbar-title style="color : white; font-size : 14px">
        치움 관리자 페이지
      </v-toolbar-title>
    <!-- -->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view />
      </v-container>
    </v-main>

    <v-footer
      padless
      style="background-color : #01b286; color : white"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>CHIUM ADMIN PAGE Ver. {{ version }}</strong>
      </v-col>
    </v-footer>
    <v-overlay
      :value="getNowLoadingState"
      opacity="0.2"
    >
      <v-progress-circular
        :value="100"
        color="green"
        indeterminate
        size="40"
        :width="15"
      />
    </v-overlay>
  </v-app>
</template>

<script>

import {mapGetters,mapActions,mapMutations} from "vuex"
import packageJson from "/package.json"

import NavList from "@/components/AppC/NavList"
export default {
	name: 'App',
	components : {
		NavList
	},
	data(){
		return{
			value : false,
			packageJson : packageJson,
			version : {
				fullVersion: null,
				majorVersion: 0,
				minorVersion: 0,
				patchVersion: 0
			}
		}
	},
	computed : {
		...mapGetters('common',['getNowLoadingState', 'getVersionInfo']),
		...mapGetters('auth',['isLogged']),
	},
	watch : {
		isLogged(){
		this.checkIsLogged()
		}
	},
	mounted() {
		this.parseVersionInfo()
	},
	created(){
		this.checkIsLogged()
	},
	methods : {
		...mapActions('common',['checkIsLogged']),
		...mapMutations('common',['setVersionInfo']),
		toggle(){
			this.value = !this.value
		},

		right(str, chr) {
			return str.slice(str.length-chr,str.length);
		},
	
		left(str, chr) {
			return str.slice(0, chr - str.length);
		},

		parseVersionInfo(){
			this.version.fullVersion = this.packageJson.version
			let firstComma = this.version.fullVersion.indexOf('.', 0)
			let secondComma = this.version.fullVersion.indexOf('.', firstComma+1)
			this.version.majorVersion = this.left(this.version.fullVersion, firstComma)
			this.version.minorVersion = this.version.fullVersion.substring(firstComma+1, secondComma)
			this.version.patchVersion = this.version.fullVersion.substring(secondComma+1, this.version.fullVersion.length)
			this.setVersionInfo(this.version)

			console.log('VersionInfo', this.getVersionInfo)
		}
	},
}
</script>
<style >

html {

    height: 100%;
}
</style>
