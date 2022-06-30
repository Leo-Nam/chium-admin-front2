<template>
  <div>
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
            v-for="log,idx in getLogList"
            :key="idx"
            style="cursor : pointer"
            @click="showMeLog(idx)"
          >
            <td> {{ log.ID }} </td>
            <td> {{ log.USER_ID }} </td>
            <td> {{ log.USER_NAME }} </td>
            <td> {{ log.BIDDING_ID }} </td>
            <td> {{ log.ORDER_CODE }} </td>
            <td> {{ log.ORDER_ID }} </td>
            <td> {{ shortenContent(log.JOB_NAME) }} </td>
            <td> {{ log.REPORT_ID }} </td>
            <td> {{ log.SITE_ID }} </td>
            <td> {{ log.SITE_NAME }} </td>
            <td> {{ log.TRANSACTION_ID }} </td>
            <td> {{ getTime(log.CREATED_AT) }} </td>
            <td> {{ log.JOB_TABLE }} </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <LogPopup
      :dialog="dialog"
      :content="content"
      @closeDialog="closeDialog"
    />
  </div>
</template>
<script>
import LogPopup from "./LogPopup.vue"
import {mapGetters} from "vuex"
export default {
  components : {
    LogPopup
  },
  data(){
    return {
      thArray : [
        'ID',
        '회원등록번호',
        '이름',
        '투찰등록번호',
        '폐기물등록코드',
        '배출자등록번호',
        '내용',
        '보고서등록번호',
        '사이트등록번호',
        '사이트이름',
        '트랜잭션등록번호',
        '생성일자',
        '테이블'
        ],
      dialog : false,
      content : null,
    }
  },
  computed : {
    ...mapGetters('log',['getLogList'])
  },
  methods : {
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
    showMeLog(logIdx){
      const newArr = this.getLogList[logIdx].JOB_NAME.split('/n')
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
