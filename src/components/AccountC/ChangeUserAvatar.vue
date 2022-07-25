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
							'width': `${this.width}`,
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
										&nbsp;프로필 사진
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
							'width': `${this.width}`,
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
									사진을 추가하면 다른 사람이 나를 알아보기 쉬워지며 내가 계정에 로그인되어 있는지 확인할 수 있습니다.
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
							'width': `${this.width}`,
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
													'text-align': 'center',
												}"
											>
												<v-avatar
													height="320px"
													width="320px"
													@click="changeImgae()"
												>
													<img
														:src="getUserAvatar"
														:style="{'cursor': 'pointer'}"
													>
												</v-avatar>
											</v-col>
										</v-row>
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
											<v-col 
												:style="{
													'text-align': 'center',
													'padding-top': '50px'
												}"
											>
												<v-btn
													text
													outlined
													@click="sp_admin_update_admin_avatar"
												>
													변경하기
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

		<v-file-input
			id="avatar-img"
			accept="image/jpeg,image/jpg,image/png"
			style="display : none"
			@change="uploadImage"			
		/>
	</div>
</template>
<script>
import {mapMutations, mapGetters, mapActions} from "vuex"
export default {
	data(){
		return {
			width: '30%',
			dialog : false,
		}
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	computed: {
		...mapGetters('auth',['getUserAvatar']),
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
		...mapActions('common',['uploadImageToS3']),
		...mapActions('auth',['sp_admin_update_admin_avatar']),

		returnUrl(url){
			if (url !== null){
				return `${url}`
			} else {
				return
			}
		},
		close(){
			this.imgDialog = false
		},
		changeImgae(){
			document.getElementById('avatar-img').click()
		},
		uploadImage(e){
			console.log('components:EmitterCollectorContentC:SiteInfo.vue:uploadBizImg:',e,'bizimg 1')
			if (e == undefined){
				alert('파일을 제대로 입력해주세요')
				return
			}
			const formData = new FormData();
			formData.append('file', e)
			console.log('e>>>>>>>>', e)
			this.uploadImageToS3(formData)
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
