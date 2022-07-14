<template>
  <div style="padding : 30px">
    <v-row>
      <v-col>
        <v-textarea
          id="noteInput"
          v-model="note"
          outlined
          label="노트"
        />
      </v-col>
      <v-col
        cols="auto"
      >
        <v-btn @click="beforeInsertNote">
          입력하기
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {mapActions, mapMutations} from "vuex"
export default {
  props : ['memberId','site-id','orderId','biddingId','transactionId','reportId','siteCategory'],
  data(){
    return {
      note : null,
      propsList : ['memberId','siteId','orderId','biddingId','transactionId','reportId','siteCategory'],
    }
  },
  methods : {
    ...mapActions('common',['sp_admin_insert_note']),
    ...mapMutations('common',['setNoteDetailIds']),
    beforeInsertNote(){
      const emptyObj = {}
      this.propsList.forEach( v => {
        if (this[v] !== undefined){
          emptyObj[v] = this[v]
        } else {
          emptyObj[v] = null
        }
		console.log('components:commonC:NoteInput.vue:beforeInsertNote:',v)
		console.log('components:commonC:NoteInput.vue:beforeInsertNote:',this[v])
      });
      emptyObj.note = this.note
      console.log('components:commonC:NoteInput.vue:beforeInsertNote:',emptyObj,'ddd')
      this.setNoteDetailIds(emptyObj)
      this.sp_admin_insert_note()
    }
  },


}
</script>
<style lang="">

</style>
