<template>
	<div 
		v-if="isLogged===true" 
		class="container-width wrapper"
	>
		<v-app>
			<v-navigation-drawer
				v-model="navToggle"
				absolute
				temporary
			>
				<NavList />
			</v-navigation-drawer>

			<v-app-bar
				dense
				color="#FFFFFF"
				app
				class="container-width"
				height="72px"
			>
				<v-app-bar-nav-icon @click.stop="toggle" />
				<v-spacer></v-spacer>
				<div v-if="isLogged===true">
					<router-link
						v-for="menu in getMenuList"
						:key="menu.label"
						:to="menu.route"
					>
						<span
							v-if="menu.location==='app-bar'"
						>
							<span
								v-if="getCurrentRoute in menu.routes"
								:style="{ 'color': `${getAdminPageConfig.colorTheme.activeText}` }"
							>
								{{ menu.title }}
							</span>
							<span v-else>
								{{ menu.title }}
							</span>
							&nbsp;&nbsp;
						</span>
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
	</div>
	<div 
		v-else
		class="app-content-body"
		:style="{ 'background-image': `url(${backgroundImg})`}"
	>
		<template>
			<div
				class="app-content-wrapper"
			>
				<v-container class="grey lighten-5 ">
					<v-row
						no-gutters
					>
						<v-col class="pa-2">
							<v-card
								class="pa-2"
								flat
								style="background-color:transparent"
							>
							<!--style="background-color:transparent"-->
								<LoginForm /><div :style="{ color: color}"></div>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</div>
		</template>
	</div>
</template>

<script>

import {mapGetters,mapActions,mapMutations} from "vuex"
import packageJson from "/package.json"

import NavList from "@/components/AppC/NavList"
import LoginForm from "@/components/LoginC/LoginForm"
export default {
	name: 'App',
	components : {
		NavList,
		LoginForm,
	},
	data(){
		return{
			dialog : false,
			navToggle : false,
			packageJson : packageJson,
			version : {
				fullVersion: null,
				majorVersion: 0,
				minorVersion: 0,
				patchVersion: 0
			},
			alignments: [
				'start',
				'center',
				'end',
			],
			backgroundImg: null,
			color: "red",
		}
	},
	computed : {
		...mapGetters('common',['getNowLoadingState', 'getVersionInfo', 'getBackgroundTheme', 'getCurrentRoute', 'getAdminPageConfig', 'getMenuList']),
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
		this.sp_admin_get_current_background_theme()
		this.backgroundTheme()
	},
	methods : {
		...mapActions('common',['checkIsLogged']),
		...mapActions('common', ['sp_admin_get_current_background_theme']),
		...mapMutations('common',['setVersionInfo']),
		toggle(){
			this.navToggle = !this.navToggle
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
		},
		closeDialog(){
			this.dialog = false
		},
		showMyAccountSimple(){
			this.dialog = true
			console.log('components:commonC:NoteList.vue:showMeNote:','hello')
		},
		backgroundTheme(){
			this.backgroundImg = this.getBackgroundTheme.imgPath
			console.log('this.backgroundImg', this.backgroundImg)
		}
	},
}
</script>
<style scoped>
	a:link { 
		text-decoration: none; 
		color: black
	}
	a:visited { 
		text-decoration: none; 
		color: black
	}
	a:hover { 
		text-decoration: none; 
		color: black
	}
	a:active { 
		text-decoration: none; 
		color: black
	}
	html {

		height: 100%;
	}
	.app-content-body {
		/* background-image: url('https://chium-admin.s3.ap-northeast-2.amazonaws.com/images/admin-1657876487.png'); */
		height: 100vh;
		flex-direction: column;
		display: flex;
		justify-content: center;
		align-items: center
	}
	.app-content-wrapper {
		background-color: rgba(255,255,255,0);
		z-index:3;
	}
	.container-width{
		width: 1280px;
	}
	.wrapper{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
