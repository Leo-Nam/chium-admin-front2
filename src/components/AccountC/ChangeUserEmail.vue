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
							'width': '60%',
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
										&nbsp;이메일
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
							'width': '60%',
							'margin-top': '20px'
						}"
					>
						<v-row>
							<v-col>
								<div
									:style="{
										'display': 'flex',
										'font-size': '15px',
										'justify-content': 'left'
									}"
								>
									Chium 업무관리 서비스에 연결된 이메일 주소를 관리합니다.
								</div>
							</v-col>
						</v-row>
					</v-card>
				</div>
			</v-col>
		</v-row>
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
						outlined
						:style="{
							'padding': '30px',
							'width': '60%',
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
									>
										<v-row>
											<v-col
												:style="{
													'display': 'flex',
													'font-size': '20px',
													'justify-content': 'left'
												}"
											>
												Chium 계정 이메일
											</v-col>
										</v-row>
										<v-row>
											<v-col
												:style="{
													'display': 'flex',
													'font-size': '15px',
													'justify-content': 'left'
												}"
											>
												Chium 업무관리 서비스에 로그인 하기 위한 계정으로 사용됩니다. 자세히 알아보기
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="11">
												{{ getUserEmails.loginEmail }}
											</v-col>
											<v-col 
												cols="1"
												:style="{
													'text-align': 'right',
												}"
											>
												<a
													:href="returnUrl('/account/update/email/login')"
												>
													<v-icon>
														mdi-chevron-right
													</v-icon>
												</a>
											</v-col>
										</v-row>
									</v-card>
								</div>
							</v-col>
						</v-row>
					</v-card>
					<v-card
						flat
						outlined
						:style="{
							'padding': '30px',
							'width': '60%',
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
									>
										<v-row>
											<v-col
												:style="{
													'display': 'flex',
													'font-size': '20px',
													'justify-content': 'left'
												}"
											>
												복구 이메일
											</v-col>
										</v-row>
										<v-row>
											<v-col
												:style="{
													'display': 'flex',
													'font-size': '15px',
													'justify-content': 'left'
												}"
											>
												사용자 계정에 비정상적인 활동이 감지되거나 사용자가 계정에 액세스할 수 없는 경우 Chium에서 사용자에게 연락하기 위해 사용하는 이메일 주소입니다.
											</v-col>
										</v-row>
										<v-row
											:style="{
												'padding-top': '20px',
												'font-size': '15px',
											}"
											v-for="item, idx in getUserEmails.recoveryEmails"
											:key="idx"
										>
											<v-col cols="11">
												{{ item.EMAIL }}
											</v-col>
											<v-col 
												cols="1"
												:style="{
													'text-align': 'right',
												}"
											>
												<a
													:href="returnUrl('/account/update/email/recovery')"
												>
													<v-icon>
														mdi-chevron-right
													</v-icon>
												</a>
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
import {mapMutations, mapGetters} from "vuex"
export default {
	data(){
		return {
		}
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	computed: {
		...mapGetters('auth',['getUserEmails']),
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),

		returnUrl(url){
			if (url !== null){
				return `${url}`
			} else {
				return
			}
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
