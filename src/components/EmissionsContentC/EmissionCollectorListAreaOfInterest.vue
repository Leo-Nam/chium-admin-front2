<template>
  <v-card>
    <v-card-title>
      관심지역 수거자 리스트
    </v-card-title>

    <v-simple-table
      fixed-header
      dense
      height="200"
    >
      <template #default>
        <thead>
          <tr>
            <th
              v-for="th,idx in collectorTh"
              :key="th+idx"
              class="text-left"
            >
              {{ th }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="collector,idx in getCollectorListAreaOfInterest"
            :key="idx+collector"
          >
            <td
              style="cursor : pointer"
              @click="goToContent(collector.ID)"
            >
              {{ collector.SITE_NAME }}
            </td>
            <td>{{ collector.PHONE }}</td>
            <td>{{ collector.SI_DO }}</td>
            <td>{{ collector.SI_GUN_GU }}</td>
            <td>{{ collector.TRMT_BIZ_NM }}</td>
            <td>
              <a
                style="cursor : pointer"
                color="primary"
                @click="showNoteCreatePopup(collector.ID)"
              >
                노트추가
              </a>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <NoteCreatePopup
      :dialog="dialog"
      :orderid="orderid"
      :siteid="siteID"
      :sitecategory="1"
      @closeDialog="closeDialog"
    />
  </v-card>
</template>
<script>
import NoteCreatePopup from "../CommonC/NoteCreate.vue"
import {mapGetters} from "vuex"
export default {
  components : {
    NoteCreatePopup
  },
  props: {
    orderid: {
        type: Number,
        default: 0
    },
    siteid: {
        type: Number,
        default: 0
    },
  },
  data(){
    return {
      collectorTh : [
        '수거자 이름',
        '핸드폰',
        '시, 도',
        '시, 군, 구',
        '업종',
        '노트추가'
      ],
	dialog: false,
	siteID: 0,
    }
  },
  computed : {
    ...mapGetters('emissions',['getCollectorListAreaOfInterest'])
  },
  methods : {
    getTime(time){
      return time.slice(0,19)
    },
    goToContent(siteId){
       this.$router.push({ path: `/admin/main/emitter-collector/${siteId}`})
    },
    showNoteCreatePopup(siteId){
		this.dialog = true
		this.siteID = siteId
    },
    closeDialog(){
      this.dialog = false
    },
  },
}
</script>
<style lang="">
</style>
