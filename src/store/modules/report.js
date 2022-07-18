import reportApi from "@/api/apiList/reportApi";

export default {
	namespaced: true,
	state: {
		// 처리보고서 검색 조건
		searchObj : {
			pageOffset: 0,
			pageSize: 15,
			pageNum: 1,
			lastPageNum: 10,
			search: null,
		},
		// 선택된 처리보고서 정보
		selectedReport : {},
		// 처리보고서 리스트
		reportList: [],
		s3Img: {
			components: {
				checkOn: {
					src: 'https://chium-admin.s3.ap-northeast-2.amazonaws.com/images/admin-1658029718.png',
					width: 20
				},
				checkOff: {
					src: 'https://chium-admin.s3.ap-northeast-2.amazonaws.com/images/admin-1658029940.png',
					width: 20
				}			
			}
		},
		pageConfig: {
			search: {},
			table: {},
			emoji: {},
		}
	},
	mutations: {
		setSearchConfig(state, payload){
			console.log('hello>>>>>', payload)
			state.pageConfig.search = payload.spec
		},
		setTableConfig(state, payload){
			console.log('hello>>>>>', payload.type, payload.data)
			state.pageConfig.table = payload
		},
		setEmoji(state, payload){
			state.pageConfig.emoji = payload
		},
		// 처리보고서 리스트 설정
		setReportList(state,payload){
			if (payload) {
				state.reportList = payload.REPORT_LIST;
				state.searchObj.lastPageNum = Number(payload.LAST_PAGE);
			} else {
				// 비어있다면 초기화 시켜준다.
				state.reportList = [];
				state.searchObj.lastPageNum = 0;
			}
		},
		// 현재 페이지 번호
		setPageNum(state, payload) {
			state.searchObj.pageNum = payload;
			if (state.searchObj.pageNum == 1) {
				state.searchObj.pageOffset = 0;
			} else {
				state.searchObj.pageOffset =
				(state.searchObj.pageNum - 1) * state.searchObj.pageSize;
			}
		},
		// 검색어 저장
		setSearch(state, payload) {
			state.searchObj.search = payload;
		},
		// 처리보고서 디테일 저장
		setReportDetail(state,payload){
			// 보여주지 않을 키워드
			const uselessKeys = [
				'WSTE_FCTL_ID',
			]
			// 삭제하고
			uselessKeys.forEach( (v) => {
				delete payload[v]
			})
			// 저장
			state.selectedReport = payload
		},
		// 처리보고서 수정사항
		changeSelectedReport(state,{key,value}){
			state.selectedReport[key] = value
		}

	},
	actions: {
		// 처리보고서 리스트
		async sp_admin_get_new_reports({state,rootState,commit}){
			try {
				const res = await reportApi.sp_admin_get_new_reports({state, rootState})
				commit("setReportList", res.data.data[0]);
			} catch (e) {
				console.log(e)
			}
		},
		// 처리보고서 디테일
		async sp_admin_get_new_report_details({rootState, commit},{reportId}){
			try {
				const res = await reportApi.sp_admin_get_new_report_details({rootState,reportId})
				commit("setReportDetail", res.data.data[0].REPORT_INFO[0]);
				commit("common/setNotes", res.data.data[0].NOTES.NOTES, { root : true });
			} catch (e) {
				console.log(e)
			}
		},

		// 처리보고서 수정
		async sp_admin_update_report_details({state, rootState}){
			try {
				await reportApi.sp_admin_update_report_details({state, rootState})
				location.reload()

			} catch (e) {
				console.log(e)
			}
		}
	},
	getters: {
		// 처리보고서 리스트
		getReportList(state){
			return state.reportList;
		},
		// 처리보고서 디테일
		getReportDetail(state){
			return state.selectedReport
		},
		// 현재 페이지 번호
		getPageNum(state){
			return state.searchObj.pageNum
		},
		// 마지막 페이지 번호
		getLastPageNum(state){
			return state.searchObj.lastPageNum
		},
		// 현재 검색어
		getSearch(state){
			return state.searchObj.search
		},
		getS3Img(state){
			return state.s3Img
		},
		getEmoji(state){
			return state.pageConfig.emoji
		},
		getSearchConfig(state){
			return state.pageConfig.search		
		},
		getTableConfig(state){
			return state.pageConfig.table		
		},
	},
};
