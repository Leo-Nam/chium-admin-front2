<template>
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
          v-for="note,idx in getNoteLists"
          :key="idx"
          style="cursor : pointer"
          @click="goToSomeWhere({key : 'ID', value : note.ID})"
        >
          <td>{{ note.ID }}</td>
          <td>{{ note.ADMIN_NAME }}</td>
          <td>
            {{ note.ORDER_CODE }}
          </td>
          <td>
            {{ note.BIDDING_ID }}
          </td>
          <td>{{ note.TRANSACTION_ID }}</td>
          <td>{{ note.REPORT_ID }}</td>
          <td> {{ note.SITE_ID != null ? note.SITE_INFO[0].SITE_NAME : '' }}</td>
          <td>
            {{ note.MEMBER_ID }}
          </td>
          <td>{{ getTime(note.CREATED_AT) }}</td>
          <td>{{ shortenContent(note.NOTE) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return {
      thArray : [
        'ID',
        '관리자이름',
        '폐기물등록번호',
        '입찰 번호',
        '트랜잭션 번호',
        '리포트 번호',
        '사이트 이름',
        '회원 아이디',
        '생성 일자',
        '상담내용',
        ]
    }
  },
  computed : {
    ...mapGetters('noteList',['getNoteLists'])
  },
  methods : {
    getTime(time){
      if (time){
        return time.slice(0,19)
      }
      return time
    },

    changeBoolToEmoji(bool){
      return bool ? '✅' : '❌'
    },

    shortenContent(content){
      if (content !== null && content.length > 35){
         return content.slice(0,35) + '...'
      }
      return content

    },



    goToSomeWhere({value,key}){

      if (key === 'ID'){
        this.$router.push(`./${value}`)
        return
      }
    },
  }



}
</script>
<style lang="">

</style>
