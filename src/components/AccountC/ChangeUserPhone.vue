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
										&nbsp;전화번호
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
						flat
						:style="{
							'padding': '30px',
							'width': '50%',
							'margin-top': '20px'
						}"
					>
						<v-row>
							<v-col>
								<div
									:style="{
										'justify-content': 'left',
										'width': '100%'
									}"
								>
									<v-card
										flat
										:style="{
											'padding-bottom': '50px',
										}"
									>
										<v-row>
											<v-col>
												<v-text-field
													flat
													id="phone"
													dense
													:value="getUserPhone"
													hide-details=""
													solo
													readonly
													append-icon="mdi-pencil-outline"
													@click:append="changeContent('phone')"
													@input="MyVmodel('phone', $event)"
													:style="{
														'justify-content': 'left',
														'font-size': '20px'
													}"
												/>
											</v-col>
										</v-row>
										<v-divider />
									</v-card>
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
														@click="sp_admin_update_admin_phone"
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
								</div>
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
			displayNameList: []
		}
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	computed: {
		...mapGetters('auth',['getUserPhone']),
	},
	methods : {
		...mapActions('auth',['sp_admin_update_admin_phone']),
		...mapMutations('auth',['changeUserPhone', 'changeUserInfo']),
		...mapMutations('common',['setCurrentRoute']),

		MyVmodel(key, value){
			this.changeUserInfo({key, value})
		},
		changeContent(e){
			const el = document.getElementById(e)
			if (el.readOnly){
				el.readOnly = false
			} else {
				el.readOnly = true
			}
			el.focus()
		},
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
