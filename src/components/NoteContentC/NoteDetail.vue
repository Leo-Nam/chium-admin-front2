<template>
  <div>
    <v-sheet>
      <v-card style="padding : 40px">
        <v-card-title>
          상담내역상세
        </v-card-title>
        <v-row justify="end">
          <v-col
            cols="auto"
          >
            <v-btn @click="sp_admin_update_note">
              수정하기
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="value, key in getNoteDetail"
            :key="key"
            cols="12"
            md="6"
            lg="4"
          >
            <v-row>
              <v-col cols="auto">
                {{ englishToKorean(key) }} :
              </v-col>
              <v-col cols="auto">
                <div v-if="key === 'NOTE'">
                  <v-textarea
                    :id="key+value"
                    dense
                    :value="value"
                    hide-details=""
                    solo
                    readonly
                    style="width:500px"
                    append-icon="mdi-pencil"
                    @click:append="changeContent(key+value)"
                    @input="MyVmodel(key,$event)"
                  />
                </div>
                <div v-else-if="key === 'ORDER_ID' || key === 'SITE_ID' || key === 'BIDDING_ID' || key === 'TRANSACTION_ID' || key === 'REPORT_ID'">
                  <a :href="returnUrl(value,key)">
                    {{ changeValue(value, key) }}
                  </a>
                </div>
                <div v-else>
                  {{ changeValue(value, key) }}
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet>
    <!-- <v-card style="margin-top : 50px;">
      <v-card-title>
        노트
      </v-card-title>
      <NoteInput
        :order-id="orderId"
        :bidding-id="biddingId"
      />
      <NoteList
        v-if="getNotes"
        :note-list="getNotes"
      />
    </v-card> -->
  </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from "vuex"
export default {
  data(){
    return {
      englishToKoreanObj : {
        ID: '등록번호',
        ADMIN_ID: '관리자번호',
        ADMIN_NAME: '관리자이름',
        MEMBER_ID: '회원등록번호',
        SITE_ID: '사이트등록번호',
        ORDER_ID: '폐기물등록번호',
        BIDDING_ID: '입찰등록번호',
        TRANSACTION_ID: '트랜잭션등록번호',
        REPORT_ID: '보고서등록번호' ,
        NOTE: '상담내용',
        CREATED_AT: '생성일자',
        UPDATED_AT: '수정일자',
      },
    }
  },
  
  computed : {
    ...mapGetters('noteList',['getNoteDetail']),
  },

  methods : {	
	...mapMutations('noteList', ['changeSelectedNote']),
	...mapActions('noteList', ['sp_admin_update_note']),
    englishToKorean(key){
      return this.englishToKoreanObj[key]
    },

    changeValue(value,key){
		if (key === 'CREATED_AT' || key === 'UPDATED_AT' ){
			return this.getTime(value)
		}
		return value
    },	

    getTime(time){
		if (time){
			return time.slice(0,19)
		}
		return time
    },

    changeContent(e){
      const el = document.getElementById(e)
       if (el.readOnly){
        el.readOnly = false
      } else {
        el.readOnly = true
      }
       el.focus()
    },
	
    MyVmodel(key,value){
		this.changeSelectedNote({key,value})
    },

    returnUrl(value,key){
      if (key === 'ORDER_ID'){
        return `/admin/main/emissions/${value}`
      } else if (key === 'SITE_ID') {
        return `/admin/main/emitter-collector/${value}`
      } else if (key === 'BIDDING_ID') {
        return `/admin/main/biddings/${value}`
      } else if (key === 'TRANSACTION_ID') {
        return `/admin/main/transaction/${value}`
      } else if (key === 'REPORT_ID') {
        return `/admin/main/report/${value}`
      } else {
		return value
		}
    },
  }

	
}
</script>
<style lang="">
	
</style>