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
  },
  mutations: {
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
		console.log("QuestionList ====>", res.data.data[0].QUESTION_LIST)
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
  },
};

