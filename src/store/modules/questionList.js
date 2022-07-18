import QuestionListApi from "@/api/apiList/questionListApi"

export default {
	namespaced: true,
	state: {
		search : null,
		offsetSize : 0,
		pageSize : 15,
		lastPage : 10,
		QuestionList : [],
		pageNum: 1,
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
		// state값을 변경하기 위해서는 mutations를 거쳐야 함
		setQuestionLists(state, payload){
			state.QuestionList = payload
		},
		setLastPage(state, payload){
			state.lastPage = payload
		},
		setSearch(state, payload){
			state.search = payload
		},
		setPageNum(state, payload){
			state.pageNum = payload,
			state.offsetSize = (state.pageNum - 1) * state.pageSize
		},
	},
	actions: {
		async sp_admin_get_question_lists({rootState, state, commit}){
			const res = await QuestionListApi.sp_admin_get_question_lists({rootState, state})
			
			commit("setQuestionLists", res.data.data[0].QUESTION_LIST)	
			commit("setLastPage", res.data.data[0].LAST_PAGE)	
			console.log('store:modules:questionList.js:sp_admin_get_question_lists:',"QuestionList ====>", res.data.data[0].QUESTION_LIST)
		},
		
	},
	getters: {
		getQuestionLists(state){
			return state.QuestionList
		}, 
		getPageNum(state){
			return state.pageNum
		}, 
		getLastPageNum(state){
			return state.lastPage
		}, 
		getSearch(state){
			return state.search
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

