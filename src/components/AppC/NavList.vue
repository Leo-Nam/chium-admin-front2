<template>
	<div 
		:style="{ 
			'background-color': `${getAdminPageConfig.colorTheme.nav.backGroundColor.normal}`,
			'height': `${getAdminPageConfig.nav.height}`
		}"
	>
		<div 
			:style="{ 
				'height': `${getAdminPageConfig.nav.logo.height}`,
				'padding': `${getAdminPageConfig.nav.logo.padding}`
			}"
		>
			<v-list-item>
				<v-img 
					:src="getAdminPageConfig.nav.logo.imgPath" 
					:width="getAdminPageConfig.nav.logo.width"
				/>

				<v-list-item-content>
					<v-list-item-title>{{ getUserClass }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

		</div>

		<v-list dense>
			<v-list-item
				v-for="item in getMenuList"
				:key="item.title"
				link
				style="padding:0px"
			>
				<v-list-item-content
					v-if="item.menuId === 100 && item.location==='nav' && item.display===true"
				>
					<div 
						:style="getCurrentRoute in item.routes ? { 
							'padding': `${getAdminPageConfig.nav.logo.padding}` ,
							'background-color': `${getAdminPageConfig.colorTheme.nav.backGroundColor.active}`,
						} : {
							'padding': `${getAdminPageConfig.nav.logo.padding}` ,
							'background-color': `${getAdminPageConfig.colorTheme.nav.backGroundColor.normal}`
						}"
					>
						<v-list-item-title>
							<span 
								:style="getCurrentRoute in item.routes ? { 
									'color': `${getAdminPageConfig.colorTheme.nav.text.active}`,
									'background-color': `${getAdminPageConfig.colorTheme.nav.backGroundColor.active}`,
								} : {
									'color': `${getAdminPageConfig.colorTheme.nav.text.normal}`,
									'background-color': `${getAdminPageConfig.colorTheme.nav.backGroundColor.normal}`,
								}"
							>
								<v-icon 
									:style="getCurrentRoute in item.routes ? { 
										'color': `${getAdminPageConfig.colorTheme.nav.text.active}`,
										'background-color': `${getAdminPageConfig.colorTheme.nav.backGroundColor.active}`,
									} : {
										'color': `${getAdminPageConfig.colorTheme.nav.text.normal}`,
										'background-color': `${getAdminPageConfig.colorTheme.nav.backGroundColor.normal}`,
									}"
								>
									{{ item.icon }}
								</v-icon> {{ item.title }}
							</span>
						</v-list-item-title>
						<v-list-item
							v-for="eachNav in item.subNavs"
							:key="eachNav.title"
							link
						>
							<v-list-item-content @click="goToRoute(eachNav.route, item.menuId)">
								<v-list-item-title>
									<span v-if="getCurrentMenuId < 200">
										<span 
											:style="getCurrentRoute in eachNav.routes ? { 
												'color': `${getAdminPageConfig.colorTheme.nav.text.active}` 
											} : {
												'color': `${getAdminPageConfig.colorTheme.nav.text.selectedNormal}`
											}"
										>
											{{ eachNav.title }}
										</span>
									</span>
									<span v-else>
										<span 
											:style="{'color': `${getAdminPageConfig.colorTheme.nav.text.normal}` }"
										>
											{{ eachNav.title }}
										</span>
									</span>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</div>
				</v-list-item-content>
				<v-list-item-content
					v-else-if="item.location==='nav'"
					@click="goToRoute(item.route, item.menuId)"
				>
					<div 
						:style="{ 
							'background-color': `${getAdminPageConfig.colorTheme.nav.backGroundColor.active}`,
							'padding': `${getAdminPageConfig.nav.itemList.padding}`
						}"
					>
						<div 
							:style="getCurrentRoute in item.routes ? { 
								'color': `${getAdminPageConfig.colorTheme.nav.text.active}`,
								'background-color': `${getAdminPageConfig.colorTheme.nav.backGroundColor.active}`,
								'padding': `${getAdminPageConfig.nav.logo.padding}`
							} : {
								'color': `${getAdminPageConfig.colorTheme.nav.text.normal}` ,
								'background-color': `${getAdminPageConfig.colorTheme.nav.backGroundColor.normal}`,
								'padding': `${getAdminPageConfig.nav.logo.padding}`
							}"
						>
							<v-list-item-title>
								<span 
									:style="getCurrentRoute in item.routes ? { 
										'color': `${getAdminPageConfig.colorTheme.nav.text.active}`
									} : {
										'color': `${getAdminPageConfig.colorTheme.nav.text.normal}`
									}"
								>
									<v-icon 
										:style="getCurrentRoute in item.routes ? { 
											'color': `${getAdminPageConfig.colorTheme.nav.text.active}`
										} : {
											'color': `${getAdminPageConfig.colorTheme.nav.text.normal}`
										}"
									>
										{{ item.icon }}
									</v-icon> {{ item.title }}
								</span>
							</v-list-item-title>
						</div>
					</div>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</div>
</template>
<script>
import {mapGetters, mapMutations} from "vuex"
export default {
	data(){
		return {
			items : [{ title: '로그인', icon: 'mdi-account', route : '/login' }],
		}
	},

	computed : {
		...mapGetters('auth',['getUserClass','isLogged']),
		...mapGetters('common',['getMenuList', 'getCurrentRoute', 'getCurrentMenuId', 'getAdminPageConfig']),
	},
	methods : {
		...mapMutations('common',['setCurrentMenuId']),
		goToRoute(route, menuId){
			console.log('menuId', menuId)
			this.$router.push({path : route})
			this.setCurrentMenuId(menuId)
		}
	}
}
</script>
<style lang="">

</style>
