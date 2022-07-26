<template>
	<div>
		<v-row
			:style="{
				'width': '100%',
				'margin-top': '20px'
			}"
		>
			<v-col
			>
				<div
					:style="{
						'flex-direction': 'column',
						'display': 'flex',
						'align-items': 'center',
						'padding': '0px',
						'width': '100%'
					}"
				>
					<v-card
						flat
						:style="{
							'width': '50%',
							'margin-top': '20px'
						}"
					>
						<v-row>
							<v-col>
								<div
									:style="{
										'display': 'flex',
										'font-size': '30px',
										'justify-content': 'left'
									}"
								>
									<router-link
										to="/account/info"
									>
										<v-icon>
											mdi-arrow-left
										</v-icon>
										&nbsp;성별
									</router-link>
								</div>
							</v-col>
						</v-row>
					</v-card>
				</div>
			</v-col>
		</v-row>
		<v-divider />
		<v-row
			:style="{
				'width': '100%',
				'margin-top': '20px'
			}"
		>
			<v-col
			>
				<div
					:style="{
						'flex-direction': 'column',
						'display': 'flex',
						'align-items': 'center',
						'padding': '0px',
						'width': '100%'
					}"
				>
					<v-card
						:style="{
							'padding': '30px',
							'width': '50%',
							'margin-top': '20px'
						}"
					>
						<v-row>
							<v-col>
								<v-container
									class="px-0"
									fluid
								>
									<v-radio-group v-model="radioGroup">
									<v-radio
										v-for="list in getGenderList.list"
										:key="list.GENDER"
										:label="`${list.GENDER}`"
										:value="`${list.ID}`"
										:style="{
											'padding-bottom': '20px',
										}"
										:off-icon="getUserGender == list.ID ? '$radioOn' : '$radioOff'"
										@change="changeUserGender(list.ID)"
									></v-radio>
									</v-radio-group>
								</v-container>
								<v-card
									flat
									:style="{
										'padding-bottom': '20px',
									}"
								>
									<v-row
										:style="{
											'justify-content': 'right',
										}"
									>
										<v-col>
											<div
												:style="{
													'align-items': 'right',
													'padding': '0px',
													'width': '100%'
												}"
											>
												<v-btn
													text
													outlined
													@click="sp_admin_update_admin_gender"
												>
													저장하기
												</v-btn>
												<router-link
													to="/account/info"
												>
													<v-btn
														text
														outlined
													>
														취소하기
													</v-btn>
												</router-link>
											</div>
										</v-col>
									</v-row>
								</v-card>
							</v-col>
						</v-row>
					</v-card>
				</div>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import {mapMutations, mapGetters, mapActions} from "vuex"
export default {
	data(){
		return {
			displayNameList: [],
			radioGroup: 1,
		}
	},
	created(){
		this.setCurrentRoute(this.$route.name)
	},
	computed: {
		...mapGetters('auth',['getGenderList', 'getUserGender']),
	},
	methods : {
		...mapActions('auth',['sp_admin_update_admin_gender']),
		...mapMutations('auth',['changeUserGender']),
		...mapMutations('common',['setCurrentRoute']),
	}
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
</style>
