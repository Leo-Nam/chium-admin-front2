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
										&nbsp;생년월일
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
												생년월일 변경
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="4">
												<v-text-field
													outlined
													label="연도"
													id="birthYear"
													:value="getUserInfo.birthYear"
													@keyup="setBirthDay('birthYear', $event)"
													:style="{
														'justify-content': 'left',
														'font-size': '20px'
													}"
												/>
											</v-col>
											<v-col cols="4">
												<v-select
													:items="months"
													label="월"
													:value="getUserInfo.birthMonth + '월'"
													outlined
													@change="setBirthDay('birthMonth', $event)"
												></v-select>
											</v-col>
											<v-col cols="4">
												<v-text-field
													outlined
													label="일"
													id="birthDate"
													:value="getUserInfo.birthDate"
													@keyup="setBirthDay('birthDate', $event)"
													:style="{
														'justify-content': 'left',
														'font-size': '20px'
													}"
												/>
											</v-col>
										</v-row>
									</v-card>
									<!-- <v-card
										flat
										:style="{
											'padding-bottom': '50px',
										}"
									>
										<v-row>
											<v-col
												:style="{'font-size': '20px'}"
											>
												내 생일을 볼 수 있는 사용자 선택
											</v-col>
										</v-row>
										<v-row>
											<v-col >
												<v-btn-toggle
													v-model="icon"
												>
													<v-btn 
														value="비공개"
														:style="{'width': '100%'}"
														input-value
													>
														<v-icon left>
															mdi-lock
														</v-icon>
														<span class="hidden-sm-and-down">비공개</span>

													</v-btn>
													<v-btn 
														value="모든 사용자"
														:style="{'width': '100%'}"
													>
														<v-icon left>
															mdi-account-multiple
														</v-icon>
														<span class="hidden-sm-and-down">모든 사용자</span>

													</v-btn>
												</v-btn-toggle>
											</v-col>
										</v-row>
									</v-card> -->
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
														@click="sp_admin_update_admin_birthday"
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
			birthDayParse: {
				birthYear: null,
				birthMonth: null,
				birthDate: null
			},
			months:[
				'1월',
				'2월',
				'3월',
				'4월',
				'5월',
				'6월',
				'7월',
				'8월',
				'9월',
				'10월',
				'11월',
				'12월',
			],
			icon: 'justify'
		}
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		this.setNameList()
	},
	computed: {
		...mapGetters('auth',['getUserInfo', 'getNameList']),
	},
	methods : {
		...mapActions('auth',['sp_admin_update_admin_birthday']),
		...mapMutations('auth',['changeUserInfo', 'setNameList']),
		...mapMutations('common',['setCurrentRoute']),

		MyVmodel(key, value){
			// this.updateDisplayNameList(key, value)
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
		updateDisplayNameList(key, v){
			this.displayNameList[key] = v
		},
		changeCategory(a){
			this.changeUserInfo({key: 'usedName', value: this.getNameList.list.indexOf(a)})
		},
		setBirthDay(kind, e){
			if (kind === 'birthMonth') {
				this.changeUserInfo({key: kind, value: e.slice(0, e.indexOf('월'))})
			} else {
				this.changeUserInfo({key: kind, value: e.target.value})
			}
		}
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
