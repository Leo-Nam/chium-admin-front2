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
			birthDate : null,
			gender : null,
			email : null,
			phone: null,
			lockBirthDate: null,
			lockGender: null,
			lockEmail: null,
			lockPhone: null,
			nickName: null,
			usedName: null,
			loginInfo: {
				adminId : null,
				adminPw : null,
				adminPw2 : null
			},
			nameList: {
				usedNameIndex: null,
				list: ['이름', '닉네임']
			}
		},
	mutations: {
		setNameList(state){
			state.nameList.list[0] = '이름'
			state.nameList.list[1] = '닉네임'
		},
		changeUserInfo(state, payload){
			state[payload.key] = payload.value
			console.log('payload.key>>>', payload.key, 'state[payload.key]>>>', state[payload.key], )
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
			state.birthDate = payload.userInfo.birthDate
			state.gender = payload.userInfo.gender
			state.email = payload.userInfo.email
			state.phone = payload.userInfo.phone
			state.lockBirthDate = payload.userInfo.lockBirthDate
			state.lockGender = payload.userInfo.lockGender
			state.lockEmail = payload.userInfo.lockEmail
			state.lockPhone = payload.userInfo.lockPhone
			state.nickName = payload.userInfo.nickName
			state.usedName = payload.userInfo.usedName

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
					birthDate : getData.BIRTH_DATE,
					gender : getData.GENDER,
					email : getData.EMAIL,
					phone : getData.PHONE,
					lockBirthDate : getData.LOCK_BIRTH_DATE,
					lockGender : getData.LOCK_GENDER,
					lockEmail : getData.LOCK_EMAIL,
					lockPhone : getData.LOCK_PHONE,
					nickName : getData.NICK_NAME,
					usedName : getData.USED_NAME,
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
				console.log('store:modules:auth.js:login:','6')
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
				console.log( e)
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
				console.log('sp_admin_update_admin_info>>>>', state)
				await authApi.sp_admin_update_admin_info({state, rootState})
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
				birthDate : state.birthDate,
				gender : state.gender,
				email : state.email,
				phone : state.phone,
				lockBirthDate : state.lockBirthDate,
				lockGender : state.lockGender,
				lockEmail : state.lockEmail,
				lockPhone : state.lockPhone,
				nickName : state.nickName,
				usedName : state.usedName,
			}
		},
		getNameList(state){
			return state.nameList
		}
	},
};