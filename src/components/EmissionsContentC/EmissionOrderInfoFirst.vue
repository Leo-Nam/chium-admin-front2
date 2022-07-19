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
					<div 
						:style="{
							'width': `${tableConfig.textFieldBig.width}`,
							'height': `${tableConfig.textFieldBig.height}`,
							'border': `${tableConfig.textFieldBig.border}`,
							'border-radius': `${tableConfig.textFieldBig.borderRadius}`,
							'vertical-align': `${tableConfig.textFieldBig.verticalAlign}`,
							'display': `${tableConfig.textFieldBig.display}`,
							'padding-left': `${tableConfig.textFieldBig.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.COLLECTOR_ID === null ? '입찰 거래' : '기존거래' }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textFieldBig.width}`,
							'height': `${tableConfig.textFieldBig.height}`,
							'border': `${tableConfig.textFieldBig.border}`,
							'border-radius': `${tableConfig.textFieldBig.borderRadius}`,
							'vertical-align': `${tableConfig.textFieldBig.verticalAlign}`,
							'display': `${tableConfig.textFieldBig.display}`,
							'padding-left': `${tableConfig.textFieldBig.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.ORDER_ID }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textFieldBig.width}`,
							'height': `${tableConfig.textFieldBig.height}`,
							'border': `${tableConfig.textFieldBig.border}`,
							'border-radius': `${tableConfig.textFieldBig.borderRadius}`,
							'vertical-align': `${tableConfig.textFieldBig.verticalAlign}`,
							'display': `${tableConfig.textFieldBig.display}`,
							'padding-left': `${tableConfig.textFieldBig.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.DISPOSER_TYPE }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textFieldBig.width}`,
							'height': `${tableConfig.textFieldBig.height}`,
							'border': `${tableConfig.textFieldBig.border}`,
							'border-radius': `${tableConfig.textFieldBig.borderRadius}`,
							'vertical-align': `${tableConfig.textFieldBig.verticalAlign}`,
							'display': `${tableConfig.textFieldBig.display}`,
							'padding-left': `${tableConfig.textFieldBig.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.ORDER_CODE }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textFieldBig.width}`,
							'height': `${tableConfig.textFieldBig.height}`,
							'border': `${tableConfig.textFieldBig.border}`,
							'border-radius': `${tableConfig.textFieldBig.borderRadius}`,
							'vertical-align': `${tableConfig.textFieldBig.verticalAlign}`,
							'display': `${tableConfig.textFieldBig.display}`,
							'padding-left': `${tableConfig.textFieldBig.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.DISPOSER_NAME }}
					</div>
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
							:input-value="getOrderInfo.IS_DELETED"
							inset
							:style="{
								'height': `${tableConfig.switch.height}`,
								'margin-top': `${tableConfig.switch.marginTop}`
							}"
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
					<div 
						:style="{
							'width': `${tableConfig.textFieldBig.width}`,
							'height': `${tableConfig.textFieldBig.height}`,
							'border': `${tableConfig.textFieldBig.border}`,
							'border-radius': `${tableConfig.textFieldBig.borderRadius}`,
							'vertical-align': `${tableConfig.textFieldBig.verticalAlign}`,
							'display': `${tableConfig.textFieldBig.display}`,
							'padding-left': `${tableConfig.textFieldBig.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.ADDR }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textFieldBig.width}`,
							'height': `${tableConfig.textFieldBig.height}`,
							'border': `${tableConfig.textFieldBig.border}`,
							'border-radius': `${tableConfig.textFieldBig.borderRadius}`,
							'vertical-align': `${tableConfig.textFieldBig.verticalAlign}`,
							'display': `${tableConfig.textFieldBig.display}`,
							'padding-left': `${tableConfig.textFieldBig.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.DELETED_AT }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textFieldBig.width}`,
							'height': `${tableConfig.textFieldBig.height}`,
							'border': `${tableConfig.textFieldBig.border}`,
							'border-radius': `${tableConfig.textFieldBig.borderRadius}`,
							'vertical-align': `${tableConfig.textFieldBig.verticalAlign}`,
							'display': `${tableConfig.textFieldBig.display}`,
							'padding-left': `${tableConfig.textFieldBig.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.CREATED_AT }}
					</div>
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
					<div>
						<v-switch
							:input-value="getOrderInfo.CS_CONFIRMED"
							inset
							:style="{
								'height': `${tableConfig.switch.height}`,
								'margin-top': `${tableConfig.switch.marginTop}`
							}"
						></v-switch>
					</div>
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
					<div>
						<v-switch
							:input-value="getOrderInfo.CHECK_STATE"
							inset
							:style="{
								'height': `${tableConfig.switch.height}`,
								'margin-top': `${tableConfig.switch.marginTop}`
							}"
						></v-switch>
					</div>
				</v-col>
			</v-row>
			<v-row 
				no-gutters 
			>
				<v-col 
					cols="2"
				>
					요청사항
				</v-col>
				<v-col 
					cols="10"
				>
					<div>
						<v-textarea
							solo
							outlined
							flat
							:value="getOrderInfo.NOTE"
							:style="{
								'width': `${tableConfig.textArea.width}`,
								'height': `${tableConfig.textArea.height}`
							}"
						></v-textarea>	
					</div>
				</v-col>
			</v-row>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.VISIT_START_AT }}
					</div>
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
					<div>
						<v-switch
							:input-value="getOrderInfo.VISIT_EARLY_CLOSEING"
							inset
							:style="{
								'height': `${tableConfig.switch.height}`,
								'margin-top': `${tableConfig.switch.marginTop}`
							}"
						></v-switch>
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.VISIT_EARLY_CLOSED_AT }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.BIDDING_END_AT }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.OPEN_AT }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.CLOSE_AT }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.PROSPECTIVE_VISITORS }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.BIDDERS }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.PROSPECTIVE_BIDDERS }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.SELECTED }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.SELECTED_AT }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.MAX_SELECT_AT }}
					</div>
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
					<div>
						<v-switch
							:input-value="getOrderInfo.COLLECTOR_SELECTION_CONFIRMED"
							inset
							:style="{
								'height': `${tableConfig.switch.height}`,
								'margin-top': `${tableConfig.switch.marginTop}`
							}"
						></v-switch>
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.COLLECTOR_SELECTION_CONFIRMED_AT }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.COLLECTOR_MAX_DECISION_AT }}
					</div>
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
					<div>
						<v-switch
							:input-value="getOrderInfo.COLLECTOR_SELECTION_CONFIRMED2"
							inset
							:style="{
								'height': `${tableConfig.switch.height}`,
								'margin-top': `${tableConfig.switch.marginTop}`
							}"
						></v-switch>
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.COLLECTOR_SELECTION_CONFIRMED2_AT }}
					</div>
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
					<div 
						:style="{
							'width': `${tableConfig.textField.width}`,
							'height': `${tableConfig.textField.height}`,
							'border': `${tableConfig.textField.border}`,
							'border-radius': `${tableConfig.textField.borderRadius}`,
							'vertical-align': `${tableConfig.textField.verticalAlign}`,
							'display': `${tableConfig.textField.display}`,
							'padding-left': `${tableConfig.textField.paddingLeft}`,
						}"
					>
						{{ getOrderInfo.COLLECTOR_MAX_DECISION2_AT }}
					</div>
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
import {mapGetters,mapActions} from "vuex"
import EmissionMap from "./EmissionMap.vue"
import EmissionImageList from "./EmissionImageList.vue"
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
					height: '200px'
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
    EmissionMap,EmissionImageList
  },
  computed : {
    ...mapGetters('emissions',['getOrderInfo']),

  },

  methods : {
    ...mapActions('emissions',['sp_admin_update_order_details']),
    getTime(time){
      if (time != null) {
      return time.slice(0,19)}

    },
    modify(){
      this.sp_admin_update_order_details();

    }
  }
}
</script>
<style lang="">
</style>
