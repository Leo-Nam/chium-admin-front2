import VueCookies from "vue-cookies";
import router from "@/router";
import cloneDeep from "lodash/cloneDeep";
import authApi from "@/api/apiList/authApi"

// 기본 어드민 유저의 정보
const INITIAL_STATE = {
  // 인덱스 아이디값
  userId: null,
  // 권한 클래스 값
  class: null,
  userInit : false
};

export default {
	namespaced: true,
	//   state: cloneDeep(INITIAL_STATE),
		state: {
			// 인덱스 아이디값
			userId: null,
			// 권한 클래스 값
			class: null,
			userInit : false,
			userName : null,
			depId : null,
			depName : null,
			avatarPath : null,
			createdAt : null,
			updatedAt : null,
			deletedAt : null,
			active : null,
			config : null,
			birthDay : null,
			gender : null,
			email : null,
			recoveryEmails : null,
			phone: null,
			lockBirthDate: null,
			lockGender: null,
			lockEmail: null,
			lockPhone: null,
			nickName: null,
			usedName: null,
			resolution: null,
			loginInfo: {
				adminId : null,
				adminPw : null,
				adminPw2 : null
			},
			birthYear: null,
			birthMonth: null,
			birthDate: null,
			showBirthYearOnly: null,
			nameList: {
				usedNameIndex: null,
				list: ['이름', '닉네임']
			},
			GenderList: {
				show: null,
				list: {}
			},
			resolutionList: {},
			updatedAtList: {},
		},
	mutations: {
		setAvatarImage(state, payload) {
			state.avatarPath = payload;
		},
		setUpdatedAtList(state, payload){
			if (payload !== null){
				state.updatedAtList[payload.INFO_TYPE] = payload.UPDATED_AT
			}
		},
		setGenderList(state, payload){
			state.GenderList.list = payload
		},
		setResolutionList(state, payload){
			state.resolutionList = payload
		},
		setNameList(state){
			state.nameList.list[0] = '이름'
			state.nameList.list[1] = '닉네임'
		},
		changeUserInfo(state, payload){
			if (payload.key === 'birthYear' || payload.key === 'birthMonth' || payload.key === 'birthDate'){
				let by = null
				let bm = null
				let bd = null

				state[payload.key] = Number(payload.value)
				by = state['birthYear']
				bm = state['birthMonth']
				bd = state['birthDate']
				if (Number(by) < 10){
					by = '0' + by
				}
				if (Number(bm) < 10){
					bm = '0' + bm
				}
				if (Number(bd) < 10){
					bd = '0' + bd
				}
				state['birthDay'] = by + '-' + bm + '-' + bd
			} else {
				state[payload.key] = payload.value
			}
			if (payload.key === 'usedName'){
				state.nameList.usedNameIndex = payload.value
			}
		},
		// 로그인 한 어드민 유저 설정
		setUser(state, payload) {
			state.userId = payload.userInfo.userId
			state.class = payload.userInfo.classNum
			state.userInit = payload.userInit
			state.userName = payload.userInfo.userName
			state.depId = payload.userInfo.depId
			state.depName = payload.userInfo.depName
			state.avatarPath = payload.userInfo.avatarPath
			state.createdAt = payload.userInfo.createdAt
			state.updatedAt = payload.userInfo.updatedAt
			state.deletedAt = payload.userInfo.deletedAt
			state.active = payload.userInfo.active
			state.config = payload.userInfo.config
			state.birthDay = payload.userInfo.birthDay
			state.gender = payload.userInfo.gender
			state.email = payload.userInfo.email
			state.recoveryEmails = payload.userInfo.recoveryEmails
			state.phone = payload.userInfo.phone
			state.lockBirthDay = payload.userInfo.lockBirthDay
			state.lockGender = payload.userInfo.lockGender
			state.lockEmail = payload.userInfo.lockEmail
			state.lockPhone = payload.userInfo.lockPhone
			state.showBirthYearOnly = payload.userInfo.showBirthYearOnly
			state.nickName = payload.userInfo.nickName
			state.usedName = payload.userInfo.usedName
			state.resolution = payload.userInfo.resolution
			
			if (payload.userInfo.birthDay != null){
				const dateTemp = new Date(payload.userInfo.birthDay)
				state.birthYear = dateTemp.getFullYear()
				state.birthMonth = dateTemp.getMonth() + 1
				state.birthDate = dateTemp.getDate()
			} else {
				const dateTemp = new Date()
				state.birthYear = dateTemp.getFullYear()
				state.birthMonth = dateTemp.getMonth() + 1
				state.birthDate = dateTemp.getDate()
			}			

			state.nameList.usedNameIndex = payload.userInfo.usedName
		},
		// 로그아웃
		logout(state) {
		// 쿠키에서 토큰제거 후 vuex의 userId, class 초기화
			VueCookies.remove("token");
			//   location.reload()
			Object.assign(state, cloneDeep(INITIAL_STATE));
		},
		setUserItem(state, { key, payload }){
			state.loginInfo[key] = payload
		},
		setUserInitSucess(state){
			state.userInit = true
		},
		changeUserGender(state, payload){
			state.gender = payload
		},
		changeResolution(state, payload){
			state.resolution = payload
		},
		chageUserPhone(state, payload){
			state.phone = payload
		},
		changeUserUid(state, payload){
			state.loginInfo.adminId = payload
		}

	},
	actions: {
		// 로그인
		async login({ commit }, { adminId, adminPw }) {
			let res
			let userInfo = {}
			try{
				res = await authApi.login({adminId,adminPw});
			}catch(e){
				console.log(e)
			}
			const state = res.data.state;
			let userInit = false;
			if (state == 100001) {
				alert("아이디가 존재하지 않습니다.");
				return;
			}else if (res.data.message == 'password not match') {
				alert("비밀번호가 일치하지 않습니다.");
				return;
			}else {
				const getData = JSON.parse(res.data.data);
				userInfo = {
					userId : getData.ID,
					classNum : getData.CLASS,
					userName : getData.NAME,
					depId : getData.DEPARTMENT_ID,
					depName : getData.DEPARTMENT_NAME,
					avatarPath : getData.AVATAR_PATH,
					createdAt : getData.CREATED_AT,
					updatedAt : getData.UPDATED_AT,
					deletedAt : getData.DELETED_AT,
					active : getData.ACTIVE,
					config : getData.CONFIG,
					birthDay : getData.BIRTH_DAY,
					gender : getData.GENDER,
					email : getData.EMAIL,
					recoveryEmails : getData.RECOVERY_EMAILS,
					phone : getData.PHONE,
					lockBirthDay : getData.LOCK_BIRTH_DAY,
					lockGender : getData.LOCK_GENDER,
					lockEmail : getData.LOCK_EMAIL,
					lockPhone : getData.LOCK_PHONE,
					showBirthYearOnly : getData.SHOW_BIRTH_YEAR_ONLY,
					nickName : getData.NICK_NAME,
					usedName : getData.USED_NAME,
					resolution : getData.RESOLUTION,
				}
				// const userId = getData.ID;
				// const classNum = getData.CLASS;
				// const userName = getData.NAME;
				// const depId = getData.DEPARTMENT_ID;
				// const depName = getData.DEPARTMENT_NAME;
				// const avatarPath = getData.AVATAR_PATH;
				if (state == 0 && adminPw =='1234'){
					userInit = true		
					commit("setUser", {userInfo, userInit});
				}
				// 로그인 성공시 받아온 토큰 값을 쿠키에 저장
				const token = res.data.token.token;
				VueCookies.set("token", token, "6h");
				// 아이디 값과 권한 클래스값 저장
				if(userInit === false){
					commit("setUser", {userInfo, userInit});
					// 화면 이동
					router.push({ path: "/account/info" });
				}
			}
		},

		async sp_admin_init_user({state, commit}) {
			let res
			try{
				res = await authApi.sp_admin_init_user({
					adminId: state.userId, 
					adminUid: state.loginInfo.adminId, 
					adminPw: state.loginInfo.adminPw, 
				});
			}catch(e){
				console.log(e)
			}
			const status = res.data.state;
			if (status > 0) {
				alert("사용자정보수정에 실패하였습니다. 관리자에게 문의하시기 바랍니다.");
				return;
			} else {
				// 로그인 성공시 받아온 토큰 값을 쿠키에 저장
				const token = res.data.token.token;
				VueCookies.set("token", token, "6h");
				// 아이디 값과 권한 클래스값 저장
				commit("setUserInitSucess");
				// 화면 이동
				router.push({ path: "/admin/main/emitter-collector" });
			}
		},
		async sp_admin_update_admin_info({state, rootState}){
			try {
				await authApi.sp_admin_update_admin_info({state, rootState})
				// location.reload()
			} catch (e) {
				console.log(e)
			}
		},
		async sp_admin_update_admin_birthday({state, rootState}){
			try {
				await authApi.sp_admin_update_admin_birthday({state, rootState})
				// location.reload()
			} catch (e) {
				console.log(e)
			}
		},
		async sp_req_b_genders({commit}){
			try {
				const res = await authApi.sp_req_b_genders()
				commit('setGenderList', res.data.data)
			} catch(e) {
				console.log(e)
			}
		},
		async sp_admin_update_admin_gender({state, rootState}){
			try {
				await authApi.sp_admin_update_admin_gender({state, rootState})
				// location.reload()
			} catch (e) {
				console.log(e)
			}
		},
		async sp_admin_update_admin_email({state, rootState}){
			try {
				await authApi.sp_admin_update_admin_email({state, rootState})
				// location.reload()
			} catch (e) {
				console.log(e)
			}
		},
		async sp_admin_update_admin_phone({state, rootState}){
			try {
				await authApi.sp_admin_update_admin_phone({state, rootState})
				// location.reload()
			} catch (e) {
				console.log(e)
			}
		},
		async sp_admin_update_admin_loginid({state, rootState}){
			try {
				await authApi.sp_admin_update_admin_loginid({state, rootState})
				// location.reload()
			} catch (e) {
				console.log(e)
			}
		},
		async sp_admin_get_updated_at({commit, rootState}, {keyword}){
			try {
				const res = await authApi.sp_admin_get_updated_at({rootState, keyword})
				// location.reload()
				commit("setUpdatedAtList", res.data.data);
			} catch (e) {
				console.log(e)
			}
		},
		async sp_req_b_resolution({commit}){
			try {
				const res = await authApi.sp_req_b_resolution()
				commit('setResolutionList', res.data.data)
			} catch(e) {
				console.log(e)
			}
		},
		async sp_admin_update_resolution({state, rootState}){
			try {
				await authApi.sp_admin_update_resolution({state, rootState})
				// location.reload()
			} catch (e) {
				console.log(e)
			}
		},
		async sp_admin_update_admin_avatar({state, rootState}){
			try {
				await authApi.sp_admin_update_resolution({state, rootState})
				// location.reload()
			} catch (e) {
				console.log(e)
			}
		},
	},
	getters: {
		getUserClass(state) {
			// 현재의 유저 클래스에 따라 관리자의 이름이 다르게 보이도록 설정
			if (state.class == null) {
				return "로그인을 해주세요.";
			} else if (state.class == 101) {
				return "총괄 관리자";
			}
			return "일반 관리자";
		},
		// 로그인 했는지 여부를 userId값으로 판단
		isLogged(state) {
			if (state.userId) {
				return true;
			}
			return false;
		},
		// 클래스 권한 값을 통하여 권한 판단
		canYouComeHere1(state) {
			if (state.class == 101) {
				return true;
			}
			return false;
		},
		getUserId(state){
			return state.userId
		},
		getUserClassId(state) {
			return state.class
		},
		getUserInit(state) {
			return state.userInit
		},
		getUserInfo(state){
			return {
				id: state.userId, 
				class:state.class, 
				userName:state.userName, 
				userInit: state.userInit, 
				uid: state.loginInfo.adminId, 
				depId: state.depId, 
				depName: state.depName, 
				avatarPath: state.avatarPath,
				createdAt : state.createdAt,
				updatedAt : state.updatedAt,
				deletedAt : state.deletedAt,
				active : state.active,
				config : state.config,
				birthDay : state.birthDay,
				gender : state.gender,
				email : state.email,
				recoveryEmails : state.recoveryEmails,
				phone : state.phone,
				lockBirthDate : state.lockBirthDate,
				lockGender : state.lockGender,
				lockEmail : state.lockEmail,
				lockPhone : state.lockPhone,
				showBirthYearOnly : state.showBirthYearOnly,
				nickName : state.nickName,
				usedName : state.usedName,
				resolution : state.resolution,
				
				birthYear : state.birthYear,
				birthMonth : state.birthMonth,
				birthDate : state.birthDate,
			}
		},
		getNameList(state){
			return state.nameList
		},
		getGenderList(state){
			return state.GenderList
		},
		getUserGender(state){
			return state.gender
		},
		getUserEmails(state){
			return {
				loginEmail: state.email,
				recoveryEmails: state.recoveryEmails
			}
		},
		getUserPhone(state){
			return state.phone
		},
		getUserUid(state){
			return state.loginInfo.adminId
		},
		getPwdUpdatedAt(state){
			if (state.updatedAtList.PWD !== undefined){
				return { 
					subject : '최종변경일', 
					updatedAt : state.updatedAtList['PWD'],
				}
			} else {
				return { 
					subject : '최초생성일', 
					updatedAt : state.createdAt 
				}
			}
		},
		getUidUpdatedAt(state){
			if (state.updatedAtList.UID !== undefined){
				return { 
					subject : '최종변경일', 
					updatedAt : state.updatedAtList['UID'],
				}
			} else {
				return { 
					subject : '최초생성일', 
					updatedAt : state.createdAt 
				}
			}
		},
		getResolutionUpdatedAt(state){
			if (state.updatedAtList.RESOLUTION !== undefined){
				return { 
					subject : '최종변경일', 
					updatedAt : state.updatedAtList['RESOLUTION'],
				}
			} else {
				return { 
					subject : '최초생성일', 
					updatedAt : state.createdAt 
				}
			}
		},
		getResolution(state){
			return state.resolution
		},
		getResolutionList(state){
			return state.resolutionList
		},
		getUserAvatar(state){
			return state.avatarPath
		},
	},
};