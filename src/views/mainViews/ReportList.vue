
<template>
	<div>
		<v-row style="margin-top : 10px">
			<v-col

				:md="6"
				cols="12"
				style="margin-bottom : 10px;"
			>
				<ReportSearchBar />
			</v-col>
		</v-row>
		<ReportTable />
		<ReportNav />
	</div>
</template>
<script>
import ReportNav from "@/components/ReportListC/ReportNav"
import ReportSearchBar from "@/components/ReportListC/ReportSearchBar"
import ReportTable from "@/components/ReportListC/ReportTable"

import {mapActions,mapMutations} from "vuex"
export default {
	data(){
		return{
			emoji : {
				type: 'reports',
				src: 'https://chium-admin.s3.ap-northeast-2.amazonaws.com/images/admin-1658041685.png',
				width: '24'
			},
			searchConfig: {
				type: 'reports',
				spec: {
					common: {
						background: '#FFFFFF',
						border: '1px solid #D4D4D4',
						borderRadius: '18px',
						height: '50'
					}
				}
			},
			tableConfig: {
				title: '처리보고서',
				type: 'reports',
				titleColor: '#00B286',
				height: '700px',
				columns: {
					color: '#031849',
					title : [
						{
							name: '등록번호',
							binding: 'ID',
							color: '#000000',
							type: 'text'
						},
						{
							name: '폐기물등록코드',
							binding: 'ORDER_CODE',
							color: '#000000',
							type: 'text'
						},
						{
							name: '수거자',
							binding: 'COLLECTOR_SITE_NAME',
							color: '#000000',
							type: 'text'
						},
						{
							name: '배출자',
							binding: 'DISPOSER_NAME',
							color: '#000000',
							type: 'text'
						},
						{
							name: '확인여부',
							binding: 'CONFIRMED',
							color: '#000000',
							type: 'switch'
						},
						{
							name: '등록일',
							binding: 'CREATED_AT',
							color: '#000000',
							type: 'datetime'
						},
					]
				}
			}
		}
	},
	components : {
		ReportNav,ReportSearchBar,ReportTable
	},

	watch: {
		$route(to) {
		// 네비게이션에서 버튼을 눌렀을 경우에 그 파라미터 값을 받아와서
		// 페이지번호 를 받아온 값으로 바꾸고 데이터들을 불러옴
		// 페이지 번호를 Number로 바꿔준다. 만약 아무 값이 없다면 NaN이 나오니까 아래에서 1로 바꿔주는 작업을 진행
		this.controlQuerySetAndGetReportList(to)
		}
	},
	created(){
		//created와 watch가 동시에 실행될 일은 없다.✅
		// 처음에 permit2로 들어오게되면 실행이 된다.
		// 처음엔 query params가 없기에 1로 지정해주는 작업을 하고,
		// 임의로 query params를 넣은 경우에 그 번호를 현재번호로 바꿔준 뒤에
		// 데이터를 불러온다.
		this.controlQuerySetAndGetReportList(this.$route)
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
		this.setTableConfig(this.tableConfig)
		this.setSearchConfig(this.searchConfig)
		this.setEmoji(this.emoji)
	},

	methods : {
		...mapMutations('common',['setCurrentRoute']),
		...mapMutations('report',[
			'setPageNum',
			'setSearch',
			'setTableConfig',
			'setEmoji',
			'setSearchConfig'
		]),
		...mapActions('report',['sp_admin_get_new_reports']),

		async controlQuerySetAndGetReportList(querySet){
			let pageToGo = Number(querySet.query.page)

			let searchKeyword = querySet.query.keyword

			if (querySet.query.page == undefined){
				pageToGo = 1
			}
			// keyword가 없다면 null로 바꿔줌
			if (searchKeyword == undefined){
				searchKeyword = null
			}

			// 라우터 쿼리에 담긴 값으로 검색 시작
			this.setSearch(searchKeyword)
			this.setPageNum(pageToGo)
			this.sp_admin_get_new_reports()
		}
	},
}
</script>
<style lang="">

</style>
