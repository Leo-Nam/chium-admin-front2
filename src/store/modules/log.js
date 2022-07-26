import logApi from "@/api/apiList/logApi";

export default {
	namespaced: true,
	state: {
		// 로그 검색 조건
		searchObj : {
			pageOffset: 0,
			pageSize: 15,
			pageNum: 1,
			lastPageNum: 10,
			search: null,
		},
		// 선택된 로그 정보
		selectedLog : {},
		// 로그 리스트
		logList: [],
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
			state.pageConfig.search = payload.spec
		},
		setTableConfig(state, payload){
			state.pageConfig.table = payload
		},
		setEmoji(state, payload){
			state.pageConfig.emoji = payload
		},
		// 로그 리스트 설정
		setLogList(state,payload){
			if (payload) {
				state.logList = payload.LOG_LIST;
				state.searchObj.lastPageNum = Number(payload.LAST_PAGE);
			} else {
				// 비어있다면 초기화 시켜준다.
				state.logList = [];
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
		// 로그 디테일 저장
		setLogDetail(state,payload){
			state.selectedLog = payload
		},
		// 로그 수정사항
		changeSelectedLog(state,{key,value}){
			state.selectedLog[key] = value
		}

	},
	actions: {
		// 로그 리스트
		async sp_admin_get_new_logs({state,rootState,commit},{orderId}){
			try {
				const res = await logApi.sp_admin_get_new_logs({state, rootState,orderId})
				commit("setLogList", res.data.data[0]);
			} catch (e) {
				console.log(e)
			}
		},

	},
	getters: {
		// 로그 리스트
		getLogList(state){
			return state.logList;
		},
		// 로그 디테일
		getLogDetail(state){
			return state.selectedLog
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
