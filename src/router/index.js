import Vue from "vue";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: () => import("../views/defaultViews/DefaultView.vue"),
		redirect: "/login",
		children: [
			{
				path: "admin",
				name: "admin",
				component: () => import("../views/defaultViews/DefaultView.vue"),
				children: [
					{
						path: "main",
						name: "main",
						component: () =>
						import("../views/defaultViews/DefaultView.vue"),
						children: [
							{
								path: "person-emitter",
								name: "person-emitter",
								component: () => import("../views/defaultViews/DefaultView.vue"),
								children: [
									{
										path: "list",
										name: "person-emitter-list",
										component: () => import("../views/mainViews/PersonEmitterList.vue"),
									},
									{
										path: ":id",
										name: "person-emitter-content",
										component: () => import("../views/mainViews/PersonEmitterContent.vue"),
									},
								]
							},
							{
								path: "emitter-collector",
								name: "emitter-collector",
								component: () => import("../views/mainViews/EmitterCollectorList.vue"),
							},
							{
								path: "chart",
								name: "chart",
								component: () => import("../views/mainViews/ChartView.vue"),
							},
							{
								path: "emitter-collector/:id",
								name: "site-info",
								component: () =>
								import("../views/mainViews/EmitterCollectorContent.vue"),
							},
							{
								path: "add-admin",
								name: "add-admin",
								component: () => import("../views/mainViews/addAdmin.vue"),
								// 최고 권한자만 들어갈 수 있도록 표시
								meta: { adminKing: true },
							},
							{
								path: "geo",
								name: "geo",
								component: () => import("../views/defaultViews/DefaultView.vue"),
								children: [
									{
										path: "latlng",
										name: "latlng",
										component: () => import("../views/mainViews/LatLng.vue"),
									},
								]
							},
							{
								path: "emissions",
								name: "emissions",
								component: () =>
								import("../views/defaultViews/DefaultView.vue"),
								children: [
									{
										path: "list",
										name: "emissions-list",
										component: () => import("../views/mainViews/EmissionsList.vue"),
									},
									{
										path: ":id",
										name: "emissions-content",
										component: () => import("../views/mainViews/EmissionsContent.vue"),
									},
								]
							},
							{
								path: "biddings",
								name: "biddings",
								component: () =>
								import("../views/defaultViews/DefaultView.vue"),
								children: [
									{
										path: "list",
										name: "biddings-list",
										component: () => import("../views/mainViews/BiddingsList.vue"),
									},
									{
										path: ":id",
										name: "biddings-content",
										component: () => import("../views/mainViews/BiddingsContent.vue"),
									},
								]
							},
							{
								path: "transaction",
								name: "transaction",
								component: () =>
								import("../views/defaultViews/DefaultView.vue"),
								children: [
									{
										path: "list",
										name: "transaction-list",
										component: () => import("../views/mainViews/TransActionList.vue"),
									},
									{
										path: ":id",
										name: "transaction-content",
										component: () => import("../views/mainViews/TransActionContent.vue"),
									},
								]
							},
							{
								path: "report",
								name: "report",
								component: () =>
								import("../views/defaultViews/DefaultView.vue"),
								children: [
									{
										path: "list",
										name: "report-list",
										component: () => import("../views/mainViews/ReportList.vue"),
									},
									{
										path: ":id",
										name: "report-content",
										component: () => import("../views/mainViews/ReportContent.vue"),
									},
								]
							},
							{
								path: "log",
								name: "log",
								component: () =>
								import("../views/defaultViews/DefaultView.vue"),
								children: [
									{
										path: "list",
										name: "log-list",
										component: () => import("../views/mainViews/LogList.vue"),
									},
								]
							},
							{
								path: "not-member",
								name: "not-member",
								component: () =>
								import("../views/defaultViews/DefaultView.vue"),
								children: [
									{
										path: "list",
										name: "not-member-list",
										component: () => import("../views/mainViews/NotMemberList.vue"),
									},
									{
										path: ":id",
										name: "not-member-content",
										component: () => import("../views/mainViews/NotMemberContent.vue"),
									},
								]
							},
							{
								path: "note-list",
								name: "note-list",
								component: () =>
								import("../views/defaultViews/DefaultView.vue"),
								children: [
									{
										path: "list",
										name: "note-list-list",
										component: () => import("../views/mainViews/NoteList.vue"),
									},
									{
										path: ":id",
										name: "note-content",
										component: () => import("../views/mainViews/NoteContent.vue"),
									},
								]
							},
							{
								path: "question",
								name: "question",
								component: () =>
								import("../views/defaultViews/DefaultView.vue"),
								children: [
									{
										path: "list",
										name: "question-list",
										component: () => import("../views/mainViews/QuestionList.vue"),
									},
								]
							},
							{
								path: "version",
								name: "version",
								component: () =>
								import("../views/defaultViews/DefaultView.vue"),
								children: [
									{
										path: "list",
										name: "version-list",
										component: () => import("../views/mainViews/VersionList.vue"),
									},
								]
							},
						],
					},
				],
			},
			{
				path: "account",
				name: "account",
				component: () => import("../views/defaultViews/DefaultView.vue"),
				children: [
					{
						path: "info",
						name: "account-info",
						component: () => import("../views/mainViews/AccountDetailsView.vue"),
					},
					{
						path: "update",
						name: "account-update",
						component: () => import("../views/defaultViews/DefaultView.vue"),
						children: [
							{
								path: "userName",
								name: "account-update-userName",
								component: () => import("../views/mainViews/ChangeUserNameView.vue"),
							},
							{
								path: "birthDate",
								name: "account-update-birthDate",
								component: () => import("../views/mainViews/ChangeUserBirthDateView.vue"),
							},
							{
								path: "gender",
								name: "account-update-gender",
								component: () => import("../views/mainViews/ChangeUserGenderView.vue"),
							},
							{
								path: "email",
								name: "account-email",
								component: () => import("../views/mainViews/ChangeUserEmailView.vue"),
							},
							{
								path: "email",
								name: "account-update-email",
								component: () => import("../views/defaultViews/DefaultView.vue"),
								children: [
									{
										path: "login",
										name: "account-update-email-login",
										component: () => import("../views/mainViews/ChangeUserEmailLoginView.vue"),
									},
									{
										path: "recovery",
										name: "account-update-email-recovery",
										component: () => import("../views/mainViews/ChangeUserEmailRecoveryView.vue"),
									},
								]
							},
							{
								path: "phone",
								name: "account-update-phone",
								component: () => import("../views/mainViews/ChangeUserPhoneView.vue"),
							},
							{
								path: "uid",
								name: "account-update-uid",
								component: () => import("../views/mainViews/ChangeUserUidView.vue"),
							},
							{
								path: "resolution",
								name: "account-update-resolution",
								component: () => import("../views/mainViews/ChangeResolutionView.vue"),
							},
						]
					},
				]
			},
			{
				path: "login",
				name: "login",
				component: () => import("../views/LoginView.vue"),
				meta: { unauthorized: true },
			},
			{
				path: "logout",
				name: "logout",
				component: () => import("../views/LogoutView.vue"),
			},
		],
	},
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  // 모든 라우터에 접속할 때마다 이 함수를 거친다.
  // 로그인 한 상태에서 login 으로 이동하려고하면 다른 화면으로 이동시킴
  if (to.name == "login" && VueCookies.get("token")===null) {
    return next("/login");
  }
  if (to.matched.some((record) => record.meta.unauthorized)) {
    if (VueCookies.get("token")) {
      return next("/admin/main/emitter-collector");
    }
    return next();
  }
  //
  if (to.name == "login" && VueCookies.get("token")) {
    return next("/admin/main/emitter-collector");
  }
  // 최고 권한자인지 라우터에서 판별,
  if (to.matched.some((record) => record.meta.adminKing)) {
    // 최고 권한자라면 들어갈 수 있도록
    if (store.getters["auth/canYouComeHere1"]) {
      next();
    } else {
      alert("권한이 없습니다.");
      return next(from);
    }
  }

  return next();
});

export default router;