<template>
  <v-card>
	<div>
		<div 
			:style="{
				'padding-top': '40px', 
				'padding-bottom': '0px', 
				'padding-left': '30px', 
				'padding-right': '30px', 
				'margin': '0px'
			}"
		>
			<h2>배출 오더 정보</h2>
		</div>
		<div 
			:style="{
				'padding-top': '0px', 
				'padding-bottom': '0px', 
				'padding-left': '30px', 
				'padding-right': '30px', 
				'margin': '0px'
			}"
		>
			<EmissionImageList 
				:style="{
					'margin-top': '15px', 
					'margin-bottom' : '15px'
				}" 
			/>
		</div>
		<div 
			:style="{
				'padding-left': '30px',
				'padding-right': '30px',
				'text-align': 'right'
			}"
		>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col>
					<v-btn
						text
						outlined
						@click="sp_admin_update_order_details"
					>
						수정하기
					</v-btn>
				</v-col>
			</v-row>
		</div>
		<div 
			:style="{
				'padding': '30px',
			}"
		>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col 
					cols="2"
				>
					거래방식
				</v-col>
				<v-col 
					cols="4"
				>
					<divTextFieldBig 
						:text="getOrderInfo.COLLECTOR_ID === null ? '입찰 거래' : '기존거래'"
					/>
				</v-col>
			</v-row>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col 
					cols="2"
				>
					ORDER ID
				</v-col>
				<v-col 
					cols="4"
				>
					<divTextFieldBig :text="getOrderInfo.ORDER_ID"/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					개인/사업자
				</v-col>
				<v-col 
					cols="4"
				>
					<divTextFieldBig :text="getOrderInfo.DISPOSER_TYPE"/>
				</v-col>
			</v-row>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col 
					cols="2"
				>
					ORDER CODE
				</v-col>
				<v-col 
					cols="4"
				>
					<divTextFieldBig :text="getOrderInfo.ORDER_CODE"/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					업체명
				</v-col>
				<v-col 
					cols="4"
				>
					<divTextFieldBig :text="getOrderInfo.DISPOSER_NAME"/>
				</v-col>
			</v-row>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col 
					cols="2"
				>
					ORDER 삭제여부
				</v-col>
				<v-col 
					cols="4"
				>
					<div>
						<v-switch
							:input-value="getOrderInfo.IS_DELETED === 1 ? true : false"
							inset
							:style="{
								'height': `${tableConfig.switch.height}`,
								'margin-top': `${tableConfig.switch.marginTop}`
							}"
							@change="modifyOrderInfo({key: 'IS_DELETED', value: $event})"
						></v-switch>
					</div>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					배출지
				</v-col>
				<v-col 
					cols="4"
				>
					<divTextFieldBig :text="getOrderInfo.ADDR"/>
				</v-col>
			</v-row>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col 
					cols="2"
				>
					ORDER 삭제일시
				</v-col>
				<v-col 
					cols="4"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.DELETED_AT)"/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					배출등록일시
				</v-col>
				<v-col 
					cols="4"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.CREATED_AT)"/>
				</v-col>
			</v-row>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col 
					cols="2"
				>
					CS확인여부
				</v-col>
				<v-col 
					cols="4"
				>
					<v-switch
						:input-value="getOrderInfo.CS_CONFIRMED === 1 ? true : false"
						inset
						:style="{
							'height': `${tableConfig.switch.height}`,
							'margin-top': `${tableConfig.switch.marginTop}`
						}"
						@change="modifyOrderInfo({key: 'CS_CONFIRMED', value: $event})"
					></v-switch>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					상태체크여부
				</v-col>
				<v-col 
					cols="4"
				>
					<customSwitch01 
						:value="getOrderInfo.CHECK_STATE === 1 ? true : false"
						:disabled="true"
					/>
				</v-col>
			</v-row>
					<EmissionComment
						width="tableConfig.textArea.width"
						height="tableConfig.textArea.height"
						:value="getOrderInfo.NOTE"
					/>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col 
					cols="2"
				>
					방문시작일시
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.VISIT_START_AT)"/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					방문조기마감여부
				</v-col>
				<v-col 
					cols="2"
				>
					<customSwitch01 
						:value="Number(getOrderInfo.VISIT_EARLY_CLOSING) === 1 ? true : false"
						:disabled="true"
					/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					방문조기마감요청일시
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.VISIT_EARLY_CLOSED_AT)"/>
				</v-col>
			</v-row>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col 
					cols="2"
				>
					입찰마감일시
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.BIDDING_END_AT)"/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					배출시작일시
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.OPEN_AT)"/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					배출종료일시
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.CLOSE_AT)"/>
				</v-col>
			</v-row>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col 
					cols="2"
				>
					방문예정자수
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getOrderInfo.PROSPECTIVE_VISITORS"/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					입찰자수
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getOrderInfo.BIDDERS"/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					잠재입찰자수
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getOrderInfo.PROSPECTIVE_BIDDERS"/>
				</v-col>
			</v-row>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col 
					cols="2"
				>
					낙찰자투찰번호
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getOrderInfo.SELECTED"/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					낙찰자선정일시
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.SELECTED_AT)"/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					낙찰자선정기한
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.MAX_SELECT_AT)"/>
				</v-col>
			</v-row>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col 
					cols="2"
				>
					1순위결심여부
				</v-col>
				<v-col 
					cols="2"
				>
					<customSwitch01 
						:value="getOrderInfo.COLLECTOR_SELECTION_CONFIRMED === 1 ? true : false"
						:disabled="true"
					/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					1순위결심일시
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.COLLECTOR_SELECTION_CONFIRMED_AT)"/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					1순위결심기한
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.COLLECTOR_MAX_DECISION_AT)"/>
				</v-col>
			</v-row>
			<v-row 
				no-gutters 
				:style="{'margin-bottom':`${tableConfig.rowMarginBottom}`}"
			>
				<v-col 
					cols="2"
				>
					2순위결심여부
				</v-col>
				<v-col 
					cols="2"
				>
					<customSwitch01 
						:value="getOrderInfo.COLLECTOR_SELECTION_CONFIRMED2 === 1 ? true : false"
						:disabled="true"
					/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					2순위결심일시
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.COLLECTOR_SELECTION_CONFIRMED2_AT)"/>
				</v-col>
				<v-col 
					cols="2"
					:style="{
						'padding-left': `${tableConfig.label.paddingLeft.rightColumn}`
					}"
				>
					2순위결심기한
				</v-col>
				<v-col 
					cols="2"
				>
					<divTextFieldBig :text="getTime(getOrderInfo.COLLECTOR_MAX_DECISION2_AT)"/>
				</v-col>
			</v-row>
		</div>
	</div>
	<div>
		<EmissionMap/>
	</div>
  </v-card>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from "vuex"
import EmissionMap from "./EmissionMap.vue"
import EmissionImageList from "./EmissionImageList.vue"
import EmissionComment from "./EmissionComment.vue"
import divTextFieldBig from "@/components/ModuleC/divTextFieldBig.vue"
import customSwitch01 from "@/components/ModuleC/customSwitch01.vue"
export default {
	data(){
		return{
			tableConfig:{
				rowMarginBottom: '20px',
				textFieldBig: {
					width: '600px',
					height: '40px',
					border: 'solid 1px',
					borderRadius: '10px',
					verticalAlign: 'middle',
					display: 'table-cell',
					paddingLeft: '10px'
				},
				textField: {
					width: '300px',
					height: '40px',
					border: 'solid 1px',
					borderRadius: '10px',
					verticalAlign: 'middle',
					display: 'table-cell',
					paddingLeft: '10px'
				},
				textArea: {
					width: '100%',
					height: '150px'
				},
				switch: {
					height: '0px',
					marginTop: '0px'
				},
				label: {
					paddingLeft: {
						leftColumn: '0px',
						rightColumn: '20px'
					}
				}
			}
		}
	},
	components : {
		EmissionMap,
		EmissionImageList,
		EmissionComment,
		divTextFieldBig,
		customSwitch01
	},
	computed : {
		...mapGetters('emissions',['getOrderInfo']),

	},
	methods : {
		...mapMutations('emissions',['changeOrderInfo']),
		...mapActions('emissions',['sp_admin_update_order_details']),
		getTime(time){
			if (time != null) {
				return time.slice(0,19)}
			},
			modify(){
			this.sp_admin_update_order_details();
		},
		modifyOrderInfo(payload){
			console.log(payload)
			this.changeOrderInfo({key: payload.key, value: (payload.value === true ? 1 : 0)})
		}
	}
}
</script>
<style lang="">
</style>
