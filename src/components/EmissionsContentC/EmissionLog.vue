<template>
  <div>
    <v-card-title>
      로그 정보
    </v-card-title>

    <v-simple-table

      fixed-header
      height="300px"
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
          >
            <td> {{ log.ID }} </td>
            <td> 
              <a
                v-if="log.USER_ID !== null"
                :href="returnUrl7(log.USER_ID)"
              >
                {{ log.USER_ID }} 
              </a>
            </td>
            <td> 
              <a
                v-if="log.USER_NAME !== null"
                :href="returnUrl7(log.USER_ID)"
              >
                {{ log.USER_NAME }}
              </a>
            </td>
            <td> 
              <a
                v-if="log.BIDDING_ID !== null"
                :href="returnUrl3(log.BIDDING_ID)"
              >
                {{ log.BIDDING_ID }} 
              </a>
            </td>
            <td> 
              <a
                v-if="log.ORDER_ID !== null"
                :href="returnUrl1(log.ORDER_ID)"
              >
                {{ log.ORDER_CODE }} 
              </a>
            </td>
            <td> 
              <a
                v-if="log.ORDER_ID !== null"
                :href="returnUrl1(log.ORDER_ID)"
              >
                {{ log.ORDER_ID }} 
              </a>
            </td>
            <td
              style="cursor : pointer"
              @click="showMeLog(idx)"
            > 
              {{ shortenContent(log.JOB_NAME) }} 
            </td>
            <td> 
              <a
                v-if="log.REPORT_ID !== null"
                :href="returnUrl5(log.REPORT_ID)"
              >
                {{ log.REPORT_ID }} 
              </a>
            </td>
            <td> 
              <a
                v-if="log.SITE_ID !== null"
                :href="returnUrl6(log.SITE_ID)"
              >
                {{ log.SITE_ID }} 
              </a>
            </td>
            <td> 
              <a
                v-if="log.SITE_ID !== null"
                :href="returnUrl6(log.SITE_ID)"
              >
                {{ log.SITE_NAME }} 
              </a>
            </td>
            <td> 
              <a
                v-if="log.TRANSACTION_ID !== null"
                :href="returnUrl4(log.TRANSACTION_ID)"
              >
                {{ log.TRANSACTION_ID }} 
              </a>
            </td>
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
import LogPopup from "./EmissionLogPopup.vue"
import {mapGetters} from "vuex"
export default {
  components : {
    LogPopup
  },
  data(){
    return {
      thArray : [
        'ID',
        '사용자 등록 번호',
        '사용자 이름',
        '투찰 번호',
        '오더 코드',
        '오더 아이디',
        '내용',
        '리포트 아이디',
        '사이트 아이디',
        '사이트 이름',
        '트랜잭션 아이디',
        '생성 일자',
        'Table'
        ],
      dialog : false,
      content : null,
    }
  },
  computed : {
    ...mapGetters('emissions',['getLogList'])
  },
  methods : {
    getTime(time){
      if (time){
        return time.slice(0,19)
      }
      return time
    },
    shortenContent(content){
      if (content==null ||content==undefined){
        return
      }
      if (content.length > 35){
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
    returnUrl1(orderId){
		if (orderId !== null){
			return `/admin/main/emissions/${orderId}`
		} else {
			return
		}
    },
    returnUrl2(noteId){
		if (noteId !== null){
			return `/admin/main/note-list/${noteId}`
		} else {
			return
		}
    },
    returnUrl3(biddingId){
		if (biddingId !== null){
			return `/admin/main/biddings/${biddingId}`
		} else {
			return
		}
    },
    returnUrl4(transactionId){
		if (transactionId !== null){
			return `/admin/main/transaction/${transactionId}`
		} else {
			return
		}
    },
    returnUrl5(reportId){
		if (reportId !== null){
			return `/admin/main/report/${reportId}`
		} else {
			return
		}
    },
    returnUrl6(siteId){
		if (siteId !== null){
			return `/admin/main/emitter-collector/${siteId}`
		} else {
			return
		}
    },
    returnUrl7(memberId){
		if (memberId !== null){
			return `/admin/main/person-emitter/${memberId}`
		} else {
			return
		}
    },

  }



}
</script>
<style lang="">

</style>
