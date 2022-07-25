import myAxios from "@/api";

const method = "post";

export default {

	sp_admin_insert_note({ rootState , noteDetails}) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_insert_note";
    let data = {
      params: JSON.stringify([
        {
          ADMIN_ID : userId,
          NOTE_DETAILS : [noteDetails]
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_admin_get_current_background_theme() {
    const url = "api/admin/common/sp_admin_get_current_background_theme";
    return myAxios(url, method, null);
  },

	uploadImageToS3({ payload }) {
		const url = "api/admin/common/uploadImageToS3";
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		return myAxios(url, method, payload, config);
	},



  // 유저의 인덱스의 값

};









