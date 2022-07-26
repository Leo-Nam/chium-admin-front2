import myAxios from "@/api";

const method = "post";

export default {

	sp_admin_get_question_lists({rootState, state}) {
		const userId = rootState.auth.userId;
		const search = state.search;
		const offsetSize = state.offsetSize;
		const pageSize = state.pageSize;
		const url = "api/admin/common/sp_admin_get_question_lists";
		let data = {
			params: JSON.stringify([
				{
					USER_ID: userId,
					SEARCH: search,
					OFFSET_SIZE: offsetSize,
					PAGE_SIZE: pageSize,
				},
			]),
		};
		return myAxios(url, method, data);
	},

	sp_admin_get_question_details({rootState, payload}) {
		const userId = rootState.auth.userId;
		const QuestionId = payload.QuestionId;
		const url = "api/admin/common/sp_admin_get_question_details";
		let data = {
			params: JSON.stringify([
				{
					USER_ID: userId,
					QUESTION_ID: QuestionId
				},
			]),
		};
		return myAxios(url, method, data);
	},

	sp_admin_update_question({rootState, state}) {
		const userId = rootState.auth.userId;
		const QuestionDetails = state.selectedQuestion;
		const url = "api/admin/common/sp_admin_update_question";
		let data = {
			params: JSON.stringify([
				{
					USER_ID: userId,
					QUESTION_DETAILS: [{
						ID: QuestionDetails.ID,
						QUESTION: QuestionDetails.QUESTION
					}]
				},
			]),
		};
		return myAxios(url, method, data);
	},

  // 유저의 인덱스의 값

};
