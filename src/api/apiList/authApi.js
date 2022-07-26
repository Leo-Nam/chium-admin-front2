import myAxios from "@/api";

const method = "post";

export default {
  // 로그인 할 시 인풋으로 받는 아이디 비밀번호 값
  sp_admin_init_user({ adminId, adminUid, adminPw }) {
    const url = "api/admin/common/sp_admin_init_user";
    let data = {
      params: JSON.stringify([
        {
			ADMIN_ID: adminId,
			ADMIN_UID: adminUid,
			PWD: adminPw,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  login({ adminId, adminPw }) {
    const url = "api/admin/common/admin_login";
    let data = {
      params: JSON.stringify([
        {
          ID: adminId,
          PW: adminPw,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  // 유저의 인덱스의 값
  chatRooms({ userId }) {
    const url = `${process.env.VUE_APP_CHAT_API}/get_chat_rooms`;
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_admin_update_admin_info({state,rootState}){
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_update_admin_info";
    let data = {
      params: JSON.stringify([
        {
          ID: userId,
          USER_NAME: state.userName,
          NICK_NAME: state.nickName,
          USED_NAME: state.usedName,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_admin_update_admin_birthday({state,rootState}){
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_update_admin_birthday";
    let data = {
      params: JSON.stringify([
        {
          ID: userId,
          BIRTH_DAY: state.birthDay,
        },
      ]),
    };
    return myAxios(url, method, data);
  },

	sp_req_b_genders() {
		const url = "api/admin/common/sp_req_b_genders";
		return myAxios(url, method);
	},
	sp_admin_update_admin_gender({state,rootState}){
		const userId = rootState.auth.userId;
		const url = "api/admin/common/sp_admin_update_admin_gender";
		let data = {
		params: JSON.stringify([
			{
				ID: userId,
				GENDER: state.gender,
			},
		]),
		};
		return myAxios(url, method, data);
	},
	sp_admin_update_admin_email({state,rootState}){
		const userId = rootState.auth.userId;
		const url = "api/admin/common/sp_admin_update_admin_email";
		let data = {
		params: JSON.stringify([
			{
				ID: userId,
				EMAIL: state.email,
			},
		]),
		};
		return myAxios(url, method, data);
	},
	sp_admin_update_admin_phone({state,rootState}){
		const userId = rootState.auth.userId;
		const url = "api/admin/common/sp_admin_update_admin_phone";
		let data = {
		params: JSON.stringify([
			{
				ID: userId,
				PHONE: state.phone,
			},
		]),
		};
		return myAxios(url, method, data);
	},
	sp_admin_update_admin_loginid({state,rootState}){
		const userId = rootState.auth.userId;
		const url = "api/admin/common/sp_admin_update_admin_loginid";
		let data = {
		params: JSON.stringify([
			{
				ID: userId,
				UID: state.loginInfo.adminId,
			},
		]),
		};
		return myAxios(url, method, data);
	},
	sp_admin_get_updated_at({rootState, keyword}){
		const userId = rootState.auth.userId;
		const url = "api/admin/common/sp_admin_get_updated_at";
		let data = {
		params: JSON.stringify([
			{
				ID: userId,
				KEYWORD: keyword,
			},
		]),
		};
		return myAxios(url, method, data);
	},

	sp_req_b_resolution() {
		const url = "api/admin/common/sp_req_b_resolution";
		return myAxios(url, method);
	},
	sp_admin_update_resolution({state,rootState}){
		const userId = rootState.auth.userId;
		const url = "api/admin/common/sp_admin_update_resolution";
		let data = {
		params: JSON.stringify([
			{
				ID: userId,
				RESOLUTION: state.resolution,
			},
		]),
		};
		return myAxios(url, method, data);
	},
	sp_admin_update_admin_avatar({state,rootState}){
		const userId = rootState.auth.userId;
		const url = "api/admin/common/sp_admin_update_admin_avatar";
		let data = {
		params: JSON.stringify([
			{
				ID: userId,
				AVATAR_PATH: state.avatarPath,
			},
		]),
		};
		return myAxios(url, method, data);
	},
};
