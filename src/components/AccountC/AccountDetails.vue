<template>
  <div>
	<v-card-title>
		<div>
			<v-row>
				<v-col>
					<div
						:style="{
							'text-align': 'center',
							'width': '100%'
						}"
					>
						<v-card 
							flat
							:style="{
								'margin-top': '15px',
							}"
						>
							<h2
								:style="{
									'margin-bottom': '15px',
								}"
							>개인 정보</h2>
							<span>다양한 Chium 업무관리 서비스에서 사용되는 나만의 환경설정에 관한 정보입니다.</span>
						</v-card>
					</div>
				</v-col>
			</v-row>
			<v-row>
				<v-col
					cols="7"
				>
					<v-card 
						flat
						:style="{
							'padding': '30px',
						}"
					>
						<v-row>
							<v-col>
								<h2>Chium 업무관리 서비스에서 표시되는 내 프로필 정보</h2>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<span>개인 정보 및 이를 관리하기 위한 옵션입니다. 다른 사용자가 나에게 쉽게 연락할 수 있도록 정보 중 일부(예: 연락처 세부정보)를 다른 사용자에게 공개할 수 있습니다. 프로필 정보를 한눈에 확인할 수도 있습니다.</span>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
				<v-col
					cols="5"
				>
					<v-card 
						flat
						:style="{
							'padding': '30px',
						}"
					>
						<v-img 
							src="https://chium-admin.s3.ap-northeast-2.amazonaws.com/images/admin-1658371067.png" 
							:style="{
								'width': '100%'
							}"
						/>
					</v-card>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-card 
						flat
						outlined
						:style="{
							'padding': '30px',
						}"
					>
						<v-row>
							<v-col>
								<h3>기본 정보</h3>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<span>일부 정보가 Chium 업무관리 서비스를 사용하는 다른 사람에게 표시될수 있습니다.</span>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<div>
									<v-row>
										<v-col cols="3">
											사진
										</v-col>
										<v-col cols="8">
											사진을 추가하여 계정을 맞춤설정할 수 있습니다
										</v-col>
										<v-col cols="1">
											<v-avatar
												height="64px"
												width="64px"
											>
												<img
													:src="getUserInfo.avatarPath"
													:alt="getUserInfo.uid"
												>
											</v-avatar>
										</v-col>
									</v-row>
									<v-row
										:style="{
											'padding-bottom': '20px',
											'padding-top': '20px',
										}"
									>
										<v-col cols="3">
											이름
										</v-col>
										<v-col cols="8">
											{{ getUserInfo.usedName === 0 ? getUserInfo.userName : getUserInfo.nickName }}
										</v-col>
										<v-col 
											cols="1"
											:style="{
												'text-align': 'right',
											}"
										>
											<a
												:href="returnUrl('/account/update/userName')"
											>
												<v-icon
													:style="{
														'color': '#00B286',
													}"
												>
													mdi-account-multiple
												</v-icon>
												<v-icon>
													mdi-chevron-right
												</v-icon>
											</a>
										</v-col>
									</v-row>
									<v-divider />
									<v-row
										:style="{
											'padding-bottom': '20px',
											'padding-top': '20px',
										}"
									>
										<v-col cols="3">
											생년월일
										</v-col>
										<v-col cols="8">
											{{ getUserInfo.birthDay }}
										</v-col>
										<v-col 
											cols="1"
											:style="{
												'text-align': 'right',
											}"
										>
											<a
												:href="returnUrl('/account/update/birthDate')"
											>
												<span
													v-if="getUserInfo.lockBirthDate === 1"
												>
													<v-icon
														:style="{
															'color': '#00B286',
														}"
													>
														mdi-lock
													</v-icon>
												</span>
												<span
													v-else
												>
													<v-icon
														:style="{
															'color': '#00B286',
														}"
													>
														mdi-account-multiple
													</v-icon>
												</span>
												<v-icon>
													mdi-chevron-right
												</v-icon>
											</a>
										</v-col>
									</v-row>
									<v-divider />
									<v-row
										:style="{
											'padding-bottom': '20px',
											'padding-top': '20px',
										}"
									>
										<v-col cols="3">
											성별
										</v-col>
										<v-col cols="8">
											{{ getUserInfo.gender === 1 ? '남성' : '여성' }}
										</v-col>
										<v-col 
											cols="1"
											:style="{
												'text-align': 'right',
											}"
										>
											<a
												:href="returnUrl('/account/update/gender')"
											>
												<span
													v-if="getUserInfo.lockGender === 1"
												>
													<v-icon
														:style="{
															'color': '#00B286',
														}"
													>
														mdi-lock
													</v-icon>
												</span>
												<span
													v-else
												>
													<v-icon
														:style="{
															'color': '#00B286',
														}"
													>
														mdi-account-multiple
													</v-icon>
												</span>
												<v-icon>
													mdi-chevron-right
												</v-icon>
											</a>
										</v-col>
									</v-row>
								</div>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-card 
						flat
						outlined
						:style="{
							'padding': '30px',
						}"
					>
						<v-row>
							<v-col>
								<h3>연락처 정보</h3>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<div>
									<v-row
										:style="{
											'padding-bottom': '20px',
											'padding-top': '20px',
										}"
									>
										<v-col cols="3">
											이메일
										</v-col>
										<v-col cols="8">
											{{ getUserInfo.email }}
										</v-col>
										<v-col 
											cols="1"
											:style="{
												'text-align': 'right',
											}"
										>
											<a
												:href="returnUrl('/account/update/email')"
											>
												<span
													v-if="getUserInfo.lockEmail === 1"
												>
													<v-icon
														:style="{
															'color': '#00B286',
														}"
													>
														mdi-lock
													</v-icon>
												</span>
												<span
													v-else
												>
													<v-icon
														:style="{
															'color': '#00B286',
														}"
													>
														mdi-account-multiple
													</v-icon>
												</span>
												<v-icon>
													mdi-chevron-right
												</v-icon>
											</a>
										</v-col>
									</v-row>
									<v-divider />
									<v-row
										:style="{
											'padding-bottom': '20px',
											'padding-top': '20px',
										}"
									>
										<v-col cols="3">
											휴대전화
										</v-col>
										<v-col cols="8">
											{{ getUserInfo.phone }}
										</v-col>
										<v-col 
											cols="1"
											:style="{
												'text-align': 'right',
											}"
										>
											<a
												:href="returnUrl('/account/update/phone')"
											>
												<span
													v-if="getUserInfo.lockPhone === 1"
												>
													<v-icon
														:style="{
															'color': '#00B286',
														}"
													>
														mdi-lock
													</v-icon>
												</span>
												<span
													v-else
												>
													<v-icon
														:style="{
															'color': '#00B286',
														}"
													>
														mdi-account-multiple
													</v-icon>
												</span>
												<v-icon>
													mdi-chevron-right
												</v-icon>
											</a>
										</v-col>
									</v-row>
								</div>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
			</v-row>
			<v-row>
				<v-col
					cols="7"
				>
					<v-card 
						flat
						:style="{
							'padding': '30px',
						}"
					>
						<v-row>
							<v-col>
								<h2>Chium 업무관리 서비스에서 사용되는 다른 정보 및 환경설정</h2>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<span>로그인 아이디와 비밀번호 재설정 및 관리페이지의 사용설정입니다.</span>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
				<v-col
					cols="5"
				>
					<v-card 
						flat
						:style="{
							'padding': '30px',
						}"
					>
						<v-img 
							src="https://chium-admin.s3.ap-northeast-2.amazonaws.com/images/admin-1658374397.png" 
							:style="{
								'width': '100%'
							}"
						/>
					</v-card>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="6">
					<v-card
						flat
						outlined
						:style="{
							'padding': '30px',
						}"
					>
						<div
							:style="{'padding-bottom': '20px'}"
						>
							<v-row>
								<v-col>
									<h3>아이디</h3><br/>
									<span>Chium 업무관리 서비스에 로그인하기 위한 계정입니다.</span>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="11">
									{{ getUserInfo.uid }}<br/>
									{{ getUidUpdatedAt.subject }}: {{ getTime(getUidUpdatedAt.updatedAt) }}
								</v-col>
								<v-col 
									cols="1"
									:style="{
										'text-align': 'right',
									}"
								>
									<a
										:href="returnUrl('/account/update/uid')"
									>
										<v-icon>
											mdi-chevron-right
										</v-icon>
									</a>
								</v-col>
							</v-row>
						</div>
						<v-divider />
						<div
							:style="{'padding-top': '20px'}"
						>
							<v-row>
								<v-col>
									<h3>비밀번호</h3><br/>
									<span>Chium 업무관리 서비스에 로그인하기 위한 비밀번호입니다.</span>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="11">
									********<br/>
									{{ getPwdUpdatedAt.subject }}: {{ getTime(getPwdUpdatedAt.updatedAt) }}
								</v-col>
								<v-col 
									cols="1"
									:style="{
										'text-align': 'right',
									}"
								>
									<v-icon>
										mdi-chevron-right
									</v-icon>
								</v-col>
							</v-row>
						</div>
					</v-card>
				</v-col>
				<v-col cols="6">
					<v-card
						flat
						outlined
						:style="{
							'padding': '30px',
						}"
					>
						<div
							:style="{'padding-bottom': '20px'}"
						>
							<v-row>
								<v-col>
									<h3>화면설정</h3><br/>
									<span>Chium 업무관리 서비스 사용화면에 대한 설정입니다.</span>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="11">
									화면 폭<br/>
									{{ getResolution }}px<br/>
									{{ getResolutionUpdatedAt.subject }}: {{ getTime(getResolutionUpdatedAt.updatedAt) }}
								</v-col>
								<v-col 
									cols="1"
									:style="{
										'text-align': 'right',
									}"
								>
									<a
										:href="returnUrl('/account/update/resolution')"
									>
										<v-icon>
											mdi-chevron-right
										</v-icon>
									</a>
								</v-col>
							</v-row>
						</div>
					</v-card>
				</v-col>
			</v-row>
		</div>
	</v-card-title>
</div>
</template>
<script>
import {mapMutations, mapGetters, mapActions} from "vuex"
export default {
	computed : {
		...mapGetters('auth',[
			'getUserInfo', 
			'getPwdUpdatedAt',
			'getUidUpdatedAt',
			'getResolutionUpdatedAt',
			'getResolution'
		]),
		
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
		this.sp_admin_get_updated_at({keyword: 'PHONE'})
		this.sp_admin_get_updated_at({keyword: 'UID'})
		this.sp_admin_get_updated_at({keyword: 'RESOLUTION'})
		this.sp_req_b_resolution()
	},
	methods : {
		...mapActions('auth',[
			'sp_admin_get_updated_at',
			'sp_req_b_resolution',
		]),
		...mapMutations('common',['setCurrentRoute']),
		changeUserName() {
			console.log('hello987898789')
			this.$router.push({
				path: '/account/changeUserName',
				params: {
					userId: 1
				}
			});
		},
		returnUrl(url){
			if (url !== null){
				return `${url}`
			} else {
				return
			}
		},
		getTime(time){
			return time.slice(0,19)
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
