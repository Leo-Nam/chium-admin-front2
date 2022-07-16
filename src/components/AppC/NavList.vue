<template>
	<div>
		<v-list-item>
			<v-list-item-avatar>
				<v-img src="https://chium.s3.ap-northeast-2.amazonaws.com/temp/admin-1651803316.png" />
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title>{{ getUserClass }}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>

		<v-divider />

		<v-list dense>
			<v-list-item
				v-for="item in getMenuList"
				:key="item.title"
				link
			>
				<v-list-item-content
					v-if="item.title === '회원목록' && item.location==='nav'"
				>
					<v-list-item-title>
						<span 
							v-if="getCurrentRoute in item.routes"
							:style="{ 'color': `${getAdminPageConfig.colorTheme.activeText}` }"
						>
							{{ item.title }}
						</span>
						<span v-else>
							{{ item.title }}
						</span>
					</v-list-item-title>
					<v-list-item
						v-for="eachNav in item.subNavs"
						:key="eachNav.title"
						link
					>
						<v-list-item-content @click="goToRoute(eachNav.route)">
							<v-list-item-title>
								<span 
									v-if="getCurrentRoute in eachNav.routes"
									:style="{ 'color': `${getAdminPageConfig.colorTheme.activeText}` }"
								>
									{{ eachNav.title }}
								</span>
								<span v-else>
									{{ eachNav.title }}
								</span>
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-content>
				<v-list-item-content
					v-else-if="item.location==='nav'"
					@click="goToRoute(item.route)"
				>
					<v-list-item-title>
						<span 
							v-if="getCurrentRoute in item.routes"
							:style="{ 'color': `${getAdminPageConfig.colorTheme.activeText}` }"
						>
							{{ item.title }}
						</span>
						<span v-else>
							{{ item.title }}
						</span>
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
	data(){
		return {
			items : [{ title: '로그인', icon: 'mdi-account', route : '/login' }],
		}
	},

	computed : {
		...mapGetters('auth',['getUserClass','isLogged']),
		...mapGetters('common',['getMenuList', 'getCurrentRoute', 'getAdminPageConfig']),
	},
	methods : {
		goToRoute(route){
			this.$router.push({path : route})
		}
	}
}
</script>
<style lang="">

</style>
