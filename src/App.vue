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
		<v-toolbar-title 
			style="color : white; font-size : 14px"
		>
        치움 관리자 페이지
      </v-toolbar-title>

      <v-spacer></v-spacer>
	<div v-if="isLogged===true">
			<router-link
				to="/admin/main/add-admin"
				v-if="getUserClassId===101"
			>
					<v-btn icon>
						<v-icon>mdi-account</v-icon>
					</v-btn>
			</router-link>
		<router-link
			to="/admin/main/log/list"
			v-if="getUserClassId===101"
		>
			<v-btn icon>
				<v-icon>mdi-math-log</v-icon>
			</v-btn>
		</router-link>
		<router-link
			to="/admin/main/note-list/list"
		>
			<v-btn icon>
				<v-icon>mdi-face-agent</v-icon>
			</v-btn>
		</router-link>
		<router-link
			to="/admin/main/question/list"
		>
			<v-btn icon>
				<v-icon>mdi-alert</v-icon>
			</v-btn>
		</router-link>
		<router-link
			to="/admin/main/version/list"
		>
			<v-btn icon>
				<v-icon>mdi-dev-to</v-icon>
			</v-btn>
		</router-link>
		<router-link
			to="/logout"
		>
			<v-btn icon>
				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</router-link>
	</div>
	<div v-else>
		<router-link
			to="/login"
		>
			<v-btn icon>
				<v-icon>mdi-login</v-icon>
			</v-btn>
		</router-link>

	</div>
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
        {{ new Date().getFullYear() }} — <strong>CHIUM ADMIN PAGE Ver. {{ version.fullVersion }}</strong>
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
		...mapGetters('auth',['isLogged', 'getUserId', 'getUserClassId']),
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

			console.log('App.vue:parseVersionInfo:', this.getVersionInfo)
		}
	},
}
</script>
<style >
a { text-decoration: none; }
html {

    height: 100%;
}
</style>
