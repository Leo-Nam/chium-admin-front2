import myAxios from "@/api";
const method = "post";

export default {
	sp_req_b_sys_policy() {
		const url = "api/admin/common/sp_req_b_sys_policy";
		return myAxios(url, method);
	},
	sp_admin_change_policy({state}){
		const url = "api/admin/common/sp_admin_change_policy";
		let data = {
		params: JSON.stringify([
			{
				POLICY: state.policyToChange.policy,
				DIRECTION: state.policyToChange.direction,
			},
		]),
		};
		return myAxios(url, method, data);
	},
};
