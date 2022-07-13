import myAxios from "@/api";

const method = "post";

export default {
  // 로그인 할 시 인풋으로 받는 아이디 비밀번호 값
  initUser({ adminId, adminUid, adminPw }) {
    const url = "api/admin/common/sp_admin_init_user";
	console.log('userInit-url >>>>>', { adminId, adminUid, adminPw })
    let data = {
      params: JSON.stringify([
        {
			ADMIN_ID: adminId,
			ADMIN_UID: adminUid,
			PWD: adminPw,
        },
      ]),
    };
	console.log('data123>>>>', data)
    return myAxios(url, method, data);
  },
  login({ adminId, adminPw }) {
    const url = "api/admin/common/admin_login";
	console.log('login-url >>>>>', url)
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
};
