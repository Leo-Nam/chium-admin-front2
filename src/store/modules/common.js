import myAxios from "@/api";
import commonApi from "@/api/apiList/commonApi";
import packageJson from "/package.json"

export default {
	namespaced: true,
	packageJson : packageJson,
	state: {
		// 로딩 상태
		loading: false,
		// 배출 폐기물 리스트 1
		wsteList1: [],
		// 배출 폐기물 리스트 2
		wsteList2: [],
		// 배출 폐기물 대구분 리스트
		wsteClassList: [],
		// 네비바 리스트
		menuItems: [],

		noteDetailsIds : {
			MEMBER_ID : null,
			SITE_ID : null,
			ORDER_ID : null,
			BIDDING_ID : null,
			TRANSACTION_ID : null,
			REPORT_ID : null,
			NOTE : null,
			SITE_CATEGORY : null,
		},
		notes : [],
		version : {
			fullVersion : null,
			majorVersion : 0,
			minorVersion : 0,
			patchVersion : 0
		},
		backgroundTheme : {
			month: null,
			imgPath: null
		},
		adminPageConfig: {},
		currentRoute: null,
		currentMenuId: null,
	},
	mutations: {
		// 로딩값 true
		setAdminPageConfig(state, payload){
			state.adminPageConfig= payload
		},
		setCurrentRoute(state, payload){
			state.currentRoute = payload
		},
		setCurrentMenuId(state, payload){
			state.currentMenuId = payload
		},
		setBackgroundTheme(state, payload) {
			console.log(payload)
			state.backgroundTheme.month = payload.MONTH;
			state.backgroundTheme.imgPath = payload.BACKGROUND_IMG;
		},
		setVersionInfo(state, payload) {
			state.version.fullVersion = payload.fullVersion;
			state.version.majorVersion = Number(payload.majorVersion);
			state.version.minorVersion = Number(payload.minorVersion);
			state.version.patchVersion = Number(payload.patchVersion);
		},
		changeVersionInfo(state, payload){
			let fullVersion = ''
			if (payload === 'major'){
				state.version.majorVersion = Number(state.version.majorVersion) + 1
				state.version.minorVersion = 0
				state.version.patchVersion = 0
				state.version.fullVersion = fullVersion.concat(fullVersion, state.version.majorVersion, '.', state.version.minorVersion, '.', state.version.patchVersion)
			}else if (payload === 'minor'){
				state.version.minorVersion = Number(state.version.minorVersion) + 1
				state.version.patchVersion = 0
				state.version.fullVersion = fullVersion.concat(fullVersion, state.version.majorVersion, '.', state.version.minorVersion, '.', state.version.patchVersion)
			}else if (payload === 'patch') {
				state.version.patchVersion = Number(state.version.patchVersion) + 1
				state.version.fullVersion = fullVersion.concat(fullVersion, state.version.majorVersion, '.', state.version.minorVersion, '.', state.version.patchVersion)
			}else {
				return
			}
		},
		getLoading(state) {
			state.loading = true;
		},
		// 로딩값 false
		endLoading(state) {
			state.loading = false;
		},
		// 폐기물 리스트 설정
		setWsteLists(state, payload) {
			state.wsteList1 = payload.wste1;
			state.wsteList2 = payload.wste2;
			state.wsteClassList = payload.wste3;
		},
		// 네비바 설정
		setMenuItems(state, isLogged) {
			// 로그인 되었다면 아래와 같이 설정
			if (isLogged) {
			state.menuItems = [
				{
					title: "회원목록",
					icon: "mdi-account-outline",
					route: "/account",
					routes: {
						'person-emitter-list':'', 
						'person-emitter-content':'', 
						'emitter-collector':'', 
						'site-info':'', 
						'not-member-list':'', 
						'not-member-content':''
					},
					location: "nav",
					menuId: 100,
					display: true,
					subNavs : [
						{
							title: "[ 개인 ] 배출자",
							icon: "mdi-account",
							route: "/admin/main/person-emitter/list",
							routes: {
								'person-emitter-list':'', 
								'person-emitter-content':''
							},
							menuId: 101,
							display: true
						},
						{
							title: "[ 사업자 ] 배출자 , 수거자 ",
							icon: "mdi-account",
							route: "/admin/main/emitter-collector",
							routes: {
								'emitter-collector':'', 
								'site-info':''
							},
							menuId: 102,
							display: true
						},
						{
							title: "[ 비회원 ] 수거자 ",
							icon: "mdi-account",
							route: "/admin/main/not-member/list",
							routes: {
								'not-member-list':'', 
								'not-member-content':''
							},
							menuId: 103,
							display: true
						},
					]
				},
				{
					title: "폐기물등록현황",
					icon: "mdi-new-box",
					route: "/admin/main/emissions/list",
					routes: {
						'emissions-list':'', 
						'emissions-content':''
					},
					location: "nav",
					menuId: 200,
					display: true
				},
				{
					title: "입찰정보",
					icon: "mdi-handshake-outline",
					route: "/admin/main/biddings/list",
					routes: {
						'biddings-list':'', 
						'biddings-content':''
					},
					location: "nav",
					menuId: 300,
					display: true
				},
				{ 
					title: "트랜잭션",
					icon: "mdi-vector-combine",
					route: "/admin/main/transaction/list",
					routes: {
						'transaction-list':'', 
						'transaction-content':''
					},
					location: "nav",
					menuId: 400,
					display: true
				},
				{ 
					title: "처리보고서",
					icon: "mdi-content-paste",
					route: "/admin/main/report/list",
					routes: {
						'report-list':'', 
						'report-content':''
					},
					location: "nav",
					menuId: 500,
					display: true
				},
				{
					title: "통계",
					icon: "mdi-chart-bar",
					route: "/admin/main/chart",
					routes: {
						'chart':''
					},
					location: "nav",
					menuId: 600,
					display: true
				},
				{ 
					title: "직원관리",
					icon: "mdi-account",
					route: "/admin/main/add-admin",
					routes: {
						'add-admin':''
					},
					location: "app-bar",
					menuId: 700,
					display: true
				},
				{ 
					title: "로그정보",
					icon: "mdi-math-log",
					route: "/admin/main/log/list",
					routes: {
						'log-list':''
					},
					location: "app-bar",
					menuId: 800,
					display: true
				},
				{ 
					title: "상담내역",
					icon: "mdi-face-agent",
					route: "/admin/main/note-list/list",
					routes: {
						'note-list-list':'', 
						'note-content':''
					},
					location: "app-bar",
					menuId: 900,
					display: true
				},
				{ 
					title: "고객문의",
					icon: "mdi-alert",
					route: "/admin/main/question/list",
					routes: {
						'question-list':''
					},
					location: "app-bar",
					menuId: 1000,
					display: false
				},
				{ 
					title: "개발관리",
					icon: "mdi-dev-to",
					route: "/admin/main/version/list",
					routes: {
						'version-list':''
					},
					location: "app-bar",
					menuId: 1100,
					display: true
				},
				{ 
					title: "MyPage",
					icon: "mdi-cog-outline",
					route: "/account/info",
					routes: {
						'account':'',
						'account-info':'',
						'account-update':'',
						'account-update-userName':'',	
						'account-update-birthDate':'',
						'account-update-gender':'',
						'account-email':'',
						'account-update-email-login':'',
						'account-update-email-recovery':'',
						'account-update-phone':'',
					},
					location: "app-bar",
					menuId: 1200,
					display: true
				},
				{ 
					title: "로그아웃",
					icon: "mdi-logout",
					route: "/logout",
					routes: {
						'logout':''
					},
					location: "app-bar",
					menuId: 1300,
					display: true
				},
			];
			// 아니라면 아래와 같이 설정
			} else {
			state.menuItems = [
				{ 
					title: "로그인", 
					icon: "mdi-account", 
					route: "/login" 
				},
			];
			}
		},
		setNoteDetailIds(state, {
			memberId,
			siteId,
			orderId,
			biddingId,
			transactionId,
			reportId,
			note,
			siteCategory
		})
		{
			state.noteDetailsIds.MEMBER_ID = memberId
			state.noteDetailsIds.SITE_ID = siteId
			state.noteDetailsIds.ORDER_ID = orderId
			state.noteDetailsIds.BIDDING_ID = biddingId
			state.noteDetailsIds.TRANSACTION_ID = transactionId
			state.noteDetailsIds.REPORT_ID = reportId
			state.noteDetailsIds.NOTE = note
			state.noteDetailsIds.SITE_CATEGORY = siteCategory
		},
		resetNoteDetailIds(state){
			state.noteDetailsIds.MEMBER_ID = null
			state.noteDetailsIds.SITE_ID = null
			state.noteDetailsIds.ORDER_ID = null
			state.noteDetailsIds.BIDDING_ID = null
			state.noteDetailsIds.TRANSACTION_ID = null
			state.noteDetailsIds.REPORT_ID = null
			state.noteDetailsIds.NOTE = null
			state.noteDetailsIds.SITE_CATEGORY = null
		},
		setNotes(state,payload){
			state.notes = payload
		},
		resetNotes(state){
			state.notes = []
		}
	},
	actions: {
		// 폐기물 리스트 받아오는 api
		async getWsteLists({ commit }) {
			const method = "post";
			const url = "api/admin/common/get_wste_lists";
			const url2 = "api/admin/common/get_wste_appearance";
			const url3 = "api/admin/common/sp_req_b_wste_class_code";
			let wste1
			let wste2
			let wste3
			try {
				wste1 = await myAxios(url, method);
				wste2 = await myAxios(url2, method);
				wste3 = await myAxios(url3, method);
			} catch (e) {
				console.log(e)
			}
			commit("setWsteLists", {
				wste1: wste1.data.data,
				wste2: wste2.data.data,
				wste3: wste3.data.data,
			});
		},
		// 로그인 여부에 따라 네비게이션 목록 바꿔줌
		checkIsLogged({ commit, rootGetters }) {
			commit("setMenuItems", rootGetters["auth/isLogged"]);
		},

		async sp_admin_insert_note({state, rootState,commit}){
			await commonApi.sp_admin_insert_note({rootState, noteDetails : state.noteDetailsIds})
			commit('resetNoteDetailIds')
			location.reload()
		},

		async sp_admin_get_current_background_theme({commit}){
			try {
				const res = await commonApi.sp_admin_get_current_background_theme()
				console.log('res', res)
					commit('setBackgroundTheme',res.data.data)
			} catch (e) {
				console.log(e)
			}
		},
	},
	getters: {
		// 현재 로딩 상태 나타냄
		getNowLoadingState(state) {
			return state.loading;
		},
		// 폐기물 리스트 나태냄
		showWsteLists(state) {
			return { wsteList1: state.wsteList1, wsteList2: state.wsteList2, wsteClassList: state.wsteClassList };
		},
		// 네비게이션 리스트 나타냄
		getMenuList(state) {
			return state.menuItems;
		},
		// 노트 리스트를 가지고옴
		getNotes(state){
			return state.notes
		},
		// 노트 리스트를 가지고옴
		getVersionInfo(state){
			return state.version
		},
		// 노트 리스트를 가지고옴
		getVersionStateChanged(state){
			if (packageJson.version != state.version.fullVersion){
				return packageJson.version + ' => ' + state.version.fullVersion

			} else {
				return packageJson.version
			}
		},

		getBackgroundTheme(state){
			return state.backgroundTheme
		},

		getCurrentRoute(state){
			return state.currentRoute
		},

		getCurrentMenuId(state){
			return state.currentMenuId
		},

		getAdminPageConfig(state){
			console.log('adminPageConfig>>>>', state.adminPageConfig)
			return state.adminPageConfig
		},
	},
};
