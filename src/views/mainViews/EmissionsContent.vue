<template>
	<div>
		<div 
			:style="{
				'margin-bottom': '30px',
			}"
		>
			<EmissionOrderInfoFirst/>  
		</div>
		<div>
			<EmissionScheduleCalendar ref="scheduleCalendar" />
			<EmissionCollectorListAreaOfInterest
				:orderid="orderId"
			/>
			<v-card class="collector-list">
			<v-row>
				<v-col>
					<EmissionMapCollectorListWithin />
				</v-col>
			</v-row>
			<!-- <v-row>
				<v-col>
					<EmissionCollectorListOpt />
					<EmissionCollectorListTableWithOpt 
						:orderid="orderId"
					/>
				</v-col>
			</v-row> -->
			</v-card>


			<v-card
				v-if="getBiddingInfo"
				class="collector-list"
			>
				<EmissionBiddingTable />
			</v-card>

			<v-card class="collector-list">
				<EmissionTransactionTable />
			</v-card>

			<v-card
				v-if="getReportInfo"
				class="collector-list"
			>
				<EmissionReportTable />
			</v-card>


			<v-card
				v-if="getLogList"
				class="collector-list"
			>
				<EmissionLog />
			</v-card>

			<v-card
				v-if="getLogList"
				class="collector-list"
			>
				<v-card-title>
					노트
				</v-card-title>

				<NoteInput :order-id="orderId" />
				<NoteList
					v-if="getNotes"
					:note-list="getNotes"
				/>
			</v-card>
		</div>
	</div>
</template>
<script>
import EmissionOrderInfoFirst from "@/components/EmissionsContentC/EmissionOrderInfoFirst.vue"
import EmissionBiddingTable from "@/components/EmissionsContentC/EmissionBiddingTable.vue"
import EmissionScheduleCalendar from "@/components/EmissionsContentC/EmissionScheduleCalendar.vue"
import EmissionCollectorListAreaOfInterest from "@/components/EmissionsContentC/EmissionCollectorListAreaOfInterest.vue"
// import EmissionCollectorListOpt from "@/components/EmissionsContentC/EmissionCollectorListOpt.vue"
// import EmissionCollectorListTableWithOpt from "@/components/EmissionsContentC/EmissionCollectorListTableWithOpt.vue"
import EmissionMapCollectorListWithin from "@/components/EmissionsContentC/EmissionMapCollectorListWithin.vue"
import EmissionTransactionTable from "@/components/EmissionsContentC/EmissionTransactionTable.vue"
import EmissionLog from "@/components/EmissionsContentC/EmissionLog.vue"
import EmissionReportTable from "@/components/EmissionsContentC/EmissionReportTable.vue"
import NoteInput from "@/components/CommonC/NoteInput.vue"
import NoteList from "@/components/CommonC/NoteList.vue"
import {mapActions,mapGetters, mapMutations} from "vuex"
export default {
	components : {
		EmissionOrderInfoFirst,
		EmissionBiddingTable,
		EmissionScheduleCalendar,
		EmissionCollectorListAreaOfInterest,
		// EmissionCollectorListOpt,
		// EmissionCollectorListTableWithOpt,
		EmissionMapCollectorListWithin,
		EmissionTransactionTable,
		EmissionLog,
		EmissionReportTable,
		NoteInput,
		NoteList
	},
	data(){
		return  {
			orderId : null
		}
	},
	computed : {
		...mapGetters('emissions',['getCollectorListAreaOfInterest','getBiddingInfo','getOrderInfo','getLogList','getReportInfo']),
		...mapGetters('common',['getNotes']),
	},
	watch : {
		getOrderInfo(to){
			this.orderId = to.ORDER_ID
		}
	},
	destroyed(){
		this.setNowSelectedOpt('회원사 거리')
		this.setCircleRange(50)
		this.setNowSelectedIsTransitOpt('모두')
		this.setNowSelectedBCodeWithinOpt('해당 시군구')
	},
	async created(){
		console.log('views:mainViews:EmissionsContent.vue:created:',this.$route.params.id, "====>this.$route.params.id")
		await this.sp_admin_get_new_comings_detail(this.$route.params.id)
		await this.sp_get_site_list_whose_biz_areas_of_interest()
		await this.sp_get_site_list_inside_range()
		await this.logList2({orderId : this.getOrderInfo.ORDER_ID})
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
		...mapActions('emissions',['sp_admin_get_new_comings_detail','sp_get_site_list_whose_biz_areas_of_interest','sp_get_site_list_inside_range','logList2']),
		...mapMutations('emissions',['setNowSelectedOpt','setCircleRange','setNowSelectedIsTransitOpt','setNowSelectedBCodeWithinOpt']),
	},
}
</script>
<style >
.main-order {
  padding : 30px;
}
.collector-list {
  margin-top : 30px;
}
</style>