<template>
	<div 
		v-if="isLogged===true" 
		class="wrapper"
		:style="{ 'width': `${getResolution}px` }"
	>
		<v-app>
			<v-navigation-drawer
				v-model="navToggle"
				absolute
				temporary
				:style="{ 'width': `${getAdminPageConfig.nav.width}` }"
			>
				<NavList />
			</v-navigation-drawer>

			<v-app-bar
				dense
				color="#FFFFFF"
				app
				:height="getAdminPageConfig.appBar.height"
				:style="{ 'width': `${getAdminPageConfig.container.width}` }"
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
							v-if="menu.location==='app-bar' && menu.display===true"
						>
							<span
								v-if="getCurrentRoute in menu.routes"
								:style="{ 'color': `${getAdminPageConfig.colorTheme.appBar.text.active}` }"
							>
								{{ menu.title }}
							</span>
							<span 
								v-else
								:style="{ 'color': `${getAdminPageConfig.colorTheme.appBar.text.normal}` }"
							>
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
				v-if="getAdminPageConfig.footer.display===true"
				padless
				style="background-color : #01b286; color : white"
				:style="{ 
					'background-color': `${getAdminPageConfig.footer.color.backGround}`,
					'color': `${getAdminPageConfig.footer.color.text}`
				}"
			>
				<v-col
					class="text-center"
					cols="12"
				>
					© {{ new Date().getFullYear() }} Neuru Co, LTD.
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
								<LoginForm 
									:isLogged = "isLogged"
								/><div :style="{ color: color}"></div>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</div>
		</template>
	</div>
</template>

<script>

import EventBus from './EventBus';
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
			serverTimeStampNewVal: null,
			serverTimeStampOldVal: null,
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
			adminPageConfig: {
				colorTheme: {
					appBar: {
						text: {
							active: '#00B286',
							normal: '#000000'
						}
					},
					nav: {
						text: {
							active: '#00B286',
							normal: '#FFFFFF',
							selectedNormal: '#000000'
						},
						backGroundColor: {
							active: '#D9D9D9',
							normal: '#272727'
						}
					}
				},
				appBar: {
					height: '72px'
				},
				nav: {
					logo:{
						padding: '10px',
						height: '100px',
						width: '32px',
						imgPath: 'https://chium-admin.s3.ap-northeast-2.amazonaws.com/images/admin-1657938837.png'
					},
					height: '100vh',
					width: '200px',
					itemList: {
						padding: '0px'
					}
				},
				footer: {
					display: true,
					color: {
						backGround: '#272727',
						text: '#FFFFFF'
					}
				},
				container:{
					width: this.getResolution + 'px'
				}
			},
			messages: [],
		}
	},
	computed : {
		...mapGetters('common',[
			'getNowLoadingState', 
			'getVersionInfo', 
			'getBackgroundTheme', 
			'getCurrentRoute', 
			'getAdminPageConfig', 
			'getMenuList'
		]),
		...mapGetters('auth',[
			'isLogged', 
			'getUserId', 
			'getUserClassId', 
			'getResolution'
		]),
		
	},
	watch : {
		isLogged(){
			this.checkIsLogged()
		},
		serverTimeStampNewVal: function(value){
			console.log("timestamp:", value)
			this.setSSEChanged(value)
		}
	},
	mounted() {
		this.parseVersionInfo()
		
	},
	created(){
		this.checkIsLogged()
		this.sp_admin_get_current_background_theme()
		this.backgroundTheme()
		this.initAdminPageConfig()
		// this.fetch()
		this.listenEvent()
		// this.connectSse()
	},
	beforeDestroy() {
		console.log('destroyed')
		this.$el.removeEventListener('message', (evt) => {
			this.handleClickEvent(evt)
			console.log('evt', evt)
		})
		this.$el.removeEventListener('trackingInfo', (evt) => {
			this.handleClickEvent(evt)
			console.log('evt', evt)
		})
	},
	methods : {
		...mapActions('common',['checkIsLogged']),
		...mapActions('common', ['sp_admin_get_current_background_theme']),
		...mapMutations('common',['setVersionInfo', 'setAdminPageConfig']),
		...mapMutations('sseStore',['setSSEChanged', 'setTrackingChanged']),
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
		},
		closeDialog(){
			this.dialog = false
		},
		showMyAccountSimple(){
			this.dialog = true
		},
		backgroundTheme(){
			this.backgroundImg = this.getBackgroundTheme.imgPath
		},
		initAdminPageConfig(){
			this.setAdminPageConfig(this.adminPageConfig)
		},
		handleBan(banMessage) {
			// Note that we can access properties of message, since our parser is set to JSON
			// and the hypothetical object has a `reason` property.
			this.messages.push(`You've been banned! Reason: ${banMessage.reason}`);
		},
		handleChat(message) {
			// Note that we can access properties of message, since our parser is set to JSON
			// and the hypothetical object has these properties.
			this.messages.push(`${message.user} said: ${message.text}`);
		},
		handleMessage(message, lastEventId) {
			console.warn('Received a message w/o an event!', message, lastEventId);
		},
		listenEvent(){
			let sse = new EventSource(process.env.VUE_APP_API + '/sse')
			console.log('hello! sse connected!!!')
			sse.addEventListener('message', (e) => this.serverTimeStampHasChanged(e.data))
			
			let sseTracking = new EventSource(process.env.VUE_APP_API + '/tracking')
			console.log('hello! sse tracking connected!!!')
			sseTracking.addEventListener('message', (e) => this.serverTrackingInfoHasChanged(e.data))
		},
		serverTimeStampHasChanged(e){
			console.log('serverTimeStampHasChanged')
			let sseDataTemp = JSON.parse(e)
			this.setSSEChanged(sseDataTemp)
			EventBus.$emit('push-sse', sseDataTemp);
			console.log(sseDataTemp)
			// this.soundAlerm()
		},
		serverTrackingInfoHasChanged(e){
			console.log('serverTrackingInfoHasChanged')
			let sseTrackingTemp = JSON.parse(e)
			console.log(sseTrackingTemp)
			this.setTrackingChanged(sseTrackingTemp)
			EventBus.$emit('push-tracking', sseTrackingTemp);
			// this.soundAlerm()
		},
		// play(sound) {
		// 	if (sound) {
		// 		var audio = new Audio(sound);
		// 		audio.play();
		// 	}
		// },
		// soundAlerm(){
		// 	this.play(
		// 		'https://chium-admin.s3.ap-northeast-2.amazonaws.com/images/admin-1659056555.mp3'
		// 	)
		// }
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
	.wrapper{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
