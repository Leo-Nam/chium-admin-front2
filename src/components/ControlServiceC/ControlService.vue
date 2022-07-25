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
							'width': `600px`,
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
										&nbsp;이름
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
					<v-row
						v-for="list, idx in getPolicyList"
						:key="list.policy"
					>
						<v-col>
							<v-card
								:style="{
									'padding': '30px',
									'width': `600px`,
									'margin-top': '20px'
								}"
							>
								<v-row>
									<v-col>
										{{ list.title }}
									</v-col>
								</v-row>
								<v-row>
									<v-col>
										<span
											v-if="list.data_type === 'boolean'"
										>
											<v-switch
												:input-value="Number(list.direction)"
												@change="changePolicy(list.policy, $event, idx)"
											></v-switch>
										</span>
										<span
											v-else
										>
											<v-text-field
												flat
												outlined
												:id="list.policy"
												dense
												:value="list.direction"
												hide-details=""
												solo
												readonly
												append-icon="mdi-pencil-outline"
												@click:append="changeContent(list.policy)"
												@input="changePolicy(list.policy, $event, idx)"
												:style="{
													'justify-content': 'left',
													'font-size': '20px'
												}"
											/>
										</span>
									</v-col>
								</v-row>
								<v-row
									:style="{
										'justify-content': 'right',
									}"
								>
									<span
										:id="idx"
										style="display: none"
										class="btnClass"
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
													@click="sp_admin_change_policy"
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
									</span>
								</v-row>
							</v-card>
						</v-col>
					</v-row>
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
			width: '300px',
		}
	},
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
		this.sp_req_b_sys_policy()
	},
	computed: {
		...mapGetters('controlService',['getPolicyList']),
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
		...mapMutations('controlService',['setPolicyToChange']),
		...mapActions('controlService',['sp_req_b_sys_policy', 'sp_admin_change_policy']),
		changeContent(e){
			const el = document.getElementById(e)
			if (el.readOnly){
				el.readOnly = false
			} else {
				el.readOnly = true
			}
			el.focus()
		},
		MyVmodel(key, value){
			this.changePolicy({key, value})
		},
		changePolicy(key, e, idx){
			this.showButton(idx)
			if (key === 'include_inactive_phone' || key === 'include_wste_condition' || key === 'dummy_activate' || key === 'system_stop'){
				this.setPolicyToChange({policy: key, direction: (e === true ? '1' : '0')})
			} else {
				this.setPolicyToChange({policy: key, direction: e})
			}
		},
		showButton(e){
			var x = document.getElementsByClassName("btnClass")
			for (var i=0; i<x.length; i++){
				x[i].style.display = 'none'
			}
			const el = document.getElementById(e)
			el.style.display = 'inline-block'
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
