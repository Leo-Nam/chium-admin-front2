
<template lang="">
	<div>
		<QuestionListSearchBar /><br>
		<QuestionListTable /><br>
		<QuestionListNav />
	</div>
</template>
<script>
import QuestionListTable from "@/components/QuestionListC/QuestionListTable"
import QuestionListNav from "@/components/QuestionListC/QuestionListNav"
import QuestionListSearchBar from "@/components/QuestionListC/QuestionListSearchBar"
import {mapActions, mapMutations} from "vuex"
export default {
	data(){
		return{
			emoji : {
				type: 'questions',
				src: 'https://chium-admin.s3.ap-northeast-2.amazonaws.com/images/admin-1658041685.png',
				width: '24'
			},
			searchConfig: {
				type: 'questions',
				spec: {
					common: {
						background: '#FFFFFF',
						border: '1px solid #D4D4D4',
						borderRadius: '18px',
						height: '50'
					}
				}
			},
			tableConfig: {
				title: '고객문의',
				type: 'questions',
				titleColor: '#00B286',
				height: '700px',
				columns: {
					color: '#031849',
					title : [
						{
							name: '등록번호',
							binding: 'ID',
							color: '#000000',
							type: 'text',
						},
						{
							name: '전화번호',
							binding: 'PHONE',
							color: '#000000',
							type: 'text',
						},
						{
							name: '이메일',
							binding: 'EMAIL',
							color: '#000000',
							type: 'text',
						},
						{
							name: '분류',
							binding: 'QUEST_CLASS',
							color: '#000000',
							type: 'text',
						},
						{
							name: '내용',
							binding: 'CONTENTS',
							color: '#000000',
							type: 'text',
							shorten: {
								apply: true,
								maxLength: 50
							},
						},
						{
							name: '작성일자',
							binding: 'CREATED_AT',
							color: '#000000',
							type: 'datetime',
						},
					]
				}
			}
		}
	},
	components: {
		QuestionListTable,
		QuestionListNav,
		QuestionListSearchBar
	},
	
	watch: {
		$route(to) {
		// 네비게이션에서 버튼을 눌렀을 경우에 그 파라미터 값을 받아와서
		// 페이지번호 를 받아온 값으로 바꾸고 데이터들을 불러옴
		// 페이지 번호를 Number로 바꿔준다. 만약 아무 값이 없다면 NaN이 나오니까 아래에서 1로 바꿔주는 작업을 진행
		this.controlQuerySetAndGetQuestionList(to)
		}
	},

	created(){
		//created와 watch가 동시에 실행될 일은 없다.✅
		// 처음에 permit2로 들어오게되면 실행이 된다.
		// 처음엔 query params가 없기에 1로 지정해주는 작업을 하고,
		// 임의로 query params를 넣은 경우에 그 번호를 현재번호로 바꿔준 뒤에
		// 데이터를 불러온다.
		this.controlQuerySetAndGetQuestionList(this.$route)
		this.setTableConfig(this.tableConfig)
		this.setSearchConfig(this.searchConfig)
		this.setEmoji(this.emoji)

	},

	methods : {
		...mapMutations('questionList',[
			'setPageNum',
			'setSearch',
			'setTableConfig',
			'setEmoji',
			'setSearchConfig'
		]),
		...mapActions('questionList', ['sp_admin_get_question_lists']),

		async controlQuerySetAndGetQuestionList(querySet){
			let pageToGo = Number(querySet.query.page)

			let searchKeyword = querySet.query.keyword

			if (querySet.query.page == undefined){
				pageToGo = 1
			}
			// keyword가 없다면 null로 바꿔줌
			if (searchKeyword == undefined){
				searchKeyword = null
			}

			// 라우터 쿼리에 담긴 값으로 검색 시작
			this.setSearch(searchKeyword)
			this.setPageNum(pageToGo)
			this.sp_admin_get_question_lists()

		}
	},
}
</script>
<style lang="">
	
</style>