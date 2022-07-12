import myAxios from "@/api";

const method = "post";

export default {

	sp_req_b_department() {
		const url = "api/admin/common/sp_req_b_department";
		return myAxios(url, method);
	},

	sp_req_b_title() {
		const url = "api/admin/common/sp_req_b_title";
		return myAxios(url, method);
	},

	sp_admin_insert_manager(state) {
		const url = "api/admin/common/sp_admin_insert_manager";
		const name = state.adminDetails.name
		const classCode = state.adminDetails.classCode
		const department = state.adminDetails.department
		const userId = state.adminDetails.userId
		const phone = state.adminDetails.phone
		const data = {
			params: JSON.stringify([
				{
					NAME: name,
					CLASS: classCode,
					DEPARTMENT: department,
					USER_ID: userId,
					PASSWORD: '1234',
					PHONE: phone
				},
			]),
		}
		return myAxios(url, method, data);
	},

  // 유저의 인덱스의 값

};
