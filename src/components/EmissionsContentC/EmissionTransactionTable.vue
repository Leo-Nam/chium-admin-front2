<template>
  <div>
    <v-card-title>
      트랜잭션 정보
    </v-card-title>
    <v-simple-table

      fixed-header
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
            v-for="transaction,idx in getTransactionList"
            :key="idx"
            style="cursor : pointer"
          >
            <td>
              <a
                v-if="transaction.ID !== null"
                :href="returnUrl4(transaction.ID)"
              >
                {{ transaction.ID }}
              </a>
            </td>
            <td>
              <a
                v-if="transaction.DISPOSAL_ORDER_ID !== null"
                :href="returnUrl1(transaction.DISPOSAL_ORDER_ID)"
              >
                {{ transaction.ORDER_CODE }}
              </a>
            </td>
            <td>{{ transaction.TRANSACTION_TYPE }}</td>

            <td> 
              <a
                v-if="transaction.COLLECTOR_SITE_ID !== null"
                :href="returnUrl6(transaction.COLLECTOR_SITE_ID)"
              >
                {{ transaction.COLLECTOR_NAME }}
              </a>
            </td>
            <td>
              <a
                v-if="transaction.COLLECTOR_SITE_ID !== null"
                :href="returnUrl6(transaction.COLLECTOR_SITE_ID)"
              >
                {{ transaction.COLLECTOR_SITE_ID }}
              </a>
            </td>
            <td>{{ getTime(transaction.COLLECT_ASK_END_AT) }}</td>

            <td>
              <a
                v-if="transaction.DISPOSER_SITE_ID !== null"
                :href="returnUrl6(transaction.DISPOSER_SITE_ID)"
              >
                ({{ transaction.DISPOSER_TYPE }}) {{ transaction.DISPOSER_NAME }}
              </a>
            </td> 
            <td> {{ changeBoolToEmoji(transaction.CHECK_STATE) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return {
      thArray : [
        '번호',
        '오더 코드',
        '거래 유형',

        '수거자 이름',
        '수거자 번호',
        '수거자 요청 기한',

        '배출자 이름',
        '확인상태'
        ]
    }
  },
  computed : {
    ...mapGetters('emissions',['getTransactionList'])
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
    changeNumToRegNum(num){
      if (num == null){
        return
      }
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'원'
    },
    goToContent(siteId){
       this.$router.push({ path: `/admin/main/transaction/${siteId}`})
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
