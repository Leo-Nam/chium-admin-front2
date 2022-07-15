<template>
  <div>
	<v-card-title>
		고객문의사항
	</v-card-title>
	<v-simple-table

		fixed-header
		height="700px"
	>
		<template #default>
		<thead>
			<tr>
			<th
				v-for="th,idx in thArray"
				:key="idx"
			>
				{{ th }}
			</th>
			</tr>
		</thead>
		<tbody>
			<tr
			v-for="list,idx in getQuestionLists"
			:key="idx"
			style="cursor : pointer"
			>
			<td>{{ list.ID }}</td>
			<td>{{ list.PHONE }}</td>
			<td>{{ list.EMAIL }}</td>
			<td>{{ list.CLASS_NM }}</td>
			<td
              style="cursor : pointer"
              @click="showMeQuestion(idx)"
            >{{ shortenContent(list.CONTENTS) }}</td>
			<td>{{ getTime(list.CREATED_AT) }}</td>
			</tr>
		</tbody>
		</template>
	</v-simple-table>
	<QuestionPopup
		:dialog="dialog"
		:content="content"
		@closeDialog="closeDialog"
	/>
</div>
</template>
<script>
import QuestionPopup from "./QuestionPopup.vue"
import {mapGetters, mapMutations} from "vuex"
export default {
  components : {
    QuestionPopup
  },
  data(){
    return {
      thArray : [
        'ID',
        '전화번호',
        '이메일',
        '분류',
        '내용',
        '작성일자'
        ],
      dialog : false,
      content : null,
    }
  },
  computed : {
    ...mapGetters('questionList',['getQuestionLists'])
  },
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
  methods : {
	...mapMutations('common',['setCurrentRoute']),
    getTime(time){
      if (time){
        return time.slice(0,19)
      }
      return time
    },

    shortenContent(content){
      if (content !== null && content.length > 35){
         return content.slice(0,35) + '...'
      }
      return content

    },
    showMeQuestion(idx){
      const newArr = this.getQuestionLists[idx].CONTENTS.split('/n')
      this.content = newArr
      this.dialog = true
    },
    closeDialog(){
      this.dialog = false
    },
  }
}
</script>
<style lang="">

</style>
