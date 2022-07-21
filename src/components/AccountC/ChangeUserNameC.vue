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
									<v-icon>
										mdi-arrow-left
									</v-icon>
									&nbsp;이름

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
												이름
											</v-col>
										</v-row>
										<v-row>
											<v-col>
												<v-text-field
													flat
													id="userName"
													dense
													:value="getUserInfo.userName"
													hide-details=""
													solo
													readonly
													append-icon="mdi-pencil-outline"
													@click:append="changeContent('userName')"
													@input="MyVmodel('userName', $event)"
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
											'padding-bottom': '50px',
										}"
									>
										<v-row>
											<v-col>
												닉네임
											</v-col>
										</v-row>
										<v-row>
											<v-col >
												<v-text-field
													flat
													id="nickName"
													dense
													:value="getUserInfo.nickName"
													hide-details=""
													solo
													readonly
													append-icon="mdi-pencil-outline"
													@click:append="changeContent('nickName')"
													@input="MyVmodel('nickName', $event)"
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
										<v-row>
											<v-col>
												표시이름
											</v-col>
										</v-row>
										<v-row>
											<v-col >
												<v-select
													:items="getNameList.list"
													label="Standard"
													@change="changeCategory"
												></v-select>
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
											<v-col>
												이름과 닉네임을 변경한 후 저장하지 않더라도 다음 로그인할때 까지 본인의 컴퓨터에서는 변경시도한 이름과 닉네임으로 표시되며 다른 사용자들에게는 반영되지 않습니다.
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
														@click="sp_admin_update_admin_info"
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
		this.setNameList()
		console.log('this.$route>>>>', this.$route)
	},
	computed: {
		...mapGetters('auth',['getUserInfo', 'getNameList']),
	},
	methods : {
		...mapActions('auth',['sp_admin_update_admin_info']),
		...mapMutations('auth',['changeUserInfo', 'setNameList']),
		...mapMutations('common',['setCurrentRoute']),

		MyVmodel(key, value){
			this.updateDisplayNameList(key, value)
			this.changeUserInfo({key, value})
			console.log('this.displayNameList.....', this.displayNameList)
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
			console.log(key, v)
			this.displayNameList[key] = v
			console.log(this.displayNameList)
		},
		changeCategory(a){
			console.log('a ===>', a)
			console.log('getNameList index ===>', this.getNameList.list.indexOf(a))
			this.changeUserInfo({key: 'usedName', value: this.getNameList.list.indexOf(a)})
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
