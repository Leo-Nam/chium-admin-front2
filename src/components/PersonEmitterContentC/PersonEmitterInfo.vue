<template>
	<div>
		<v-expansion-panels
			multiple
			:value="[0,1]"
		>
			<v-expansion-panel>
				<v-expansion-panel-header>
					<v-card-title>
						개인 배출자 정보 변경
					</v-card-title>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<!-- 수정하기 버튼 -->
					<v-row justify="end">
						<v-col
							cols="auto"
						>
							<v-btn @click="sp_admin_update_personal_details">
								수정하기
							</v-btn>
						</v-col>
					</v-row>
					<!-- 수정하기 항목 -->
					<v-row>
						<v-col
							v-for="content, idx in headerArray"
							:key="idx"
							cols="12"
							lg="6"
							xl="6"
						>
							<v-row>
								<!-- 타이틀 -->
								<v-col
									cols="3"
								>
									<v-subheader>
										{{ subHeaders[idx] }}
									</v-subheader>
								</v-col>
								<!-- 항목 -->
								<v-col
									cols="9"
								>
									<!-- 체크박스 분기 -->
									<div v-if="checkBoxType.indexOf(content) > -1">
										<div>
											<v-switch
												:input-value="getSelectedPersonEmitter[content] === 1 ? true : false"
												inset
												:style="{
													'height': `${tableConfig.switch.height}`,
													'margin-top': `${tableConfig.switch.marginTop}`
												}"
												@change="modifyOrderInfo({key: content, value: $event}, 'switch')"
											></v-switch>
											<!-- <input
												:id="content"
												class="checked-box"
												disabled
												type="checkbox"
												:checked="getSelectedPersonEmitter[content] ? true : false"
											>
											<v-icon
												style="pointer:cursor"
												@click="changeActive({key : content})"
											>
												mdi-pencil
											</v-icon> -->
										</div>
									</div>
									<!-- 사진 변경 분기 -->
									<div v-else-if="content == 'AVATAR_PATH'">
										<a
											:href="getSelectedPersonEmitter[content]"
											target="_blank"
										>
											{{ getSelectedPersonEmitter[content] }}
										</a>
										<v-icon
											style="pointer:cursor"
											@click="clickAvatarImg"
										>
											mdi-pencil
										</v-icon>
									</div>
									<!-- 소속사이트인 경우 -->
									<div v-else-if="content == 'SITE_ID'">
										<div v-if="getSelectedPersonEmitter[content]===0">
											{{ getSelectedPersonEmitter['SITE_NAME'] }}
										</div>
										<div v-else>
											<a
												:href="returnUrl6(getSelectedPersonEmitter[content])"
											>
												{{ getSelectedPersonEmitter['SITE_NAME'] }}
											</a>
										</div>
									</div>
									<div v-else-if="content == 'CS_MANAGER_ID'">
										<v-select
											:items="csManager.name"
											:value="getSelectedPersonEmitter.MANAGER_NAME !== null ? getSelectedPersonEmitter.MANAGER_NAME : null"
											outlined
											@change="modifyOrderInfo({key: content, value: csManager.id[csManager.name.indexOf($event)]}, 'select')"
										></v-select>
									</div>
									<!-- 접속경로인 경우 -->
									<div v-else-if="content == 'CONTACT_PATH'">
										{{ getSelectedPersonEmitter['CONTACT_PATH'] }}
									</div>
									<!-- 그 외 분기 -->
									<div v-else>
										<v-text-field
											:id="content+idx"
											dense
											flat
											outlined
											:value="getSelectedPersonEmitter[content]"
											hide-details=""
											solo
											readonly
											append-icon="mdi-pencil"
											@click:append="changeContent(content+idx)"
											@input="modifySelectedPersonEmitter({key : content, value : $event}, 'text')"
										/>
									</div>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
		<v-card style="margin-top : 50px;">
			<v-row>
				<v-col>
					<div 
						:style="{
							'padding-bottom': '0px', 
							'padding-left': '30px', 
							'padding-right': '30px', 
							'margin': '0px'
						}"
					>
						<div v-if="getPersonalInterestedSiteCount>0">
							<InterestedSite 
								:userType="userType"
							/>
						</div>
					</div>
				</v-col>
			</v-row>
		</v-card>
		<v-card style="margin-top : 50px;">
			<v-card-title>
				노트
			</v-card-title>
			<NoteInput
				:member-id="memberId"
			/>
			<NoteList
				v-if="getNotes"
				:note-list="getNotes"
			/>
		</v-card>
		<v-file-input
			id="avatar-img"
			accept="image/jpeg,image/jpg,image/png"
			style="display : none"
			@change="changeAvatar"
		/>
	</div>
</template>
<script>
import NoteInput from "@/components/CommonC/NoteInput.vue"
import NoteList from "@/components/CommonC/NoteList.vue"
import InterestedSite from "@/components/EmitterCollectorContentC/InterestedSite.vue"
// import customSwitch01 from "@/components/ModuleC/customSwitch01.vue"
import {mapGetters,mapMutations,mapActions} from "vuex"

export default {
	components : {
		NoteInput,
		NoteList,
		// customSwitch01,
		InterestedSite
	},
	data(){
		return{
			checkBoxType : ['ACTIVE', 'CONFIRMED','NOTICE_ENABLED','PUSH_ENABLED',],
			memberId : null,
			subHeaders : [
				'사용자ID',
				'이름',
				'연락처',
				'담당 CS 매니저',
				'사진',
				'활성화',
				'앱노출',
				'NOTICE_ENABLED',
				'PUSH_ENABLED',
				'소속사이트',
				'접속경로',
			],
			headerArray : [
				'USER_ID',
				'USER_NAME',
				'PHONE',
				'CS_MANAGER_ID',
				'AVATAR_PATH',
				'ACTIVE',
				'CONFIRMED',
				'NOTICE_ENABLED',
				'PUSH_ENABLED',
				'SITE_ID',
				'CONTACT_PATH',
			],
			tableConfig:{},
			csManager: {
				id: [],
				name: [],
			},
			userType: 0
		}
	},
	computed : {
		...mapGetters('selectedUser',[
			'getSelectedPersonEmitter', 
			'getPersonalInterestedSiteCount'
		]),
		...mapGetters('common',[
			'getNotes', 
			'getTableConfig', 
			'getCsManagerList'
		]),
	},
	watch : {
		getSelectedPersonEmitter(to){
			this.memberId = to.ID
		}
	},
	created() {
		this.tableConfig = this.getTableConfig
		this.sp_req_b_cs_manager()
		this.retrieveManagers()
	},
	methods : {
		...mapMutations('selectedUser',['modifySelectedPersonEmitter']),
		...mapActions('selectedUser',[
			'uploadPersonEmitterAvatar',
			'sp_admin_update_personal_details'
		]),
		...mapActions('common',[
			'sp_req_b_cs_manager',
		]),
		changeContent(e){
			const el = document.getElementById(e)
			if (el.readOnly){
				el.readOnly = false
			} else {
				el.readOnly = true
			}
			el.focus()
		},
		changeActive({key}){
			let value
			const el = document.getElementById(key)
			if (el.checked){
				el.checked = false
				value = 0
			} else {
				el.checked = true
				value = 1
			}
			this.modifySelectedPersonEmitter({key,value})
		},
		changeAvatar(e){
			if (e == undefined){
				alert('파일을 제대로 입력해주세요')
				return
			}
			const formData = new FormData();
			formData.append('file', e)
			this.uploadPersonEmitterAvatar(formData)
		},
		clickAvatarImg(){
			document.getElementById('avatar-img').click()
		},
		returnUrl6(siteId){
			if (siteId !== null){
				return `/admin/main/emitter-collector/${siteId}`
			} else {
				return
			}
		},
		modifyOrderInfo(payload, type){
			console.log(payload)
			if (type === 'switch'){
				this.modifySelectedPersonEmitter({key: payload.key, value: (payload.value === true ? 1 : 0)})
			} else {
				this.modifySelectedPersonEmitter({key: payload.key, value: payload.value})
			}
		},
		retrieveManagers(){
			for (var i=0;i<this.getCsManagerList.length;i++){
				this.csManager.name.push(this.getCsManagerList[i].NAME)
				this.csManager.id.push(this.getCsManagerList[i].ID)
			}
			console.log(this.csManager)
		},
		
	},
}
</script>
<style lang="">

</style>
