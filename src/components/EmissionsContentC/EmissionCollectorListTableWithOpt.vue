<template>
  <v-card>
    <v-simple-table
      fixed-header
      height="350"
    >
      <template #default>
        <thead>
          <tr v-if="getNowSelectedOpt === '회원사 거리'">
            <th
              v-for="th in memberTh"
              :key="th"
              class="text-left"
            >
              {{ th }}
            </th>
          </tr>
          <tr v-else-if="getNowSelectedOpt === '비회원사 거리'">
            <th
              v-for="th in notMemberTh"
              :key="th"
              class="text-left"
            >
              {{ th }}
            </th>
          </tr>
        </thead>
        <tbody v-if="getNowSelectedOpt === '회원사 거리'">
          <tr
            v-for="site,idx in getCollectorListWithin"
            :key="idx"
          >
            <td
              style="cursor : pointer"
              @click="goToContent(site.ID)"
            >
              {{ site.SITE_NAME }}
            </td>
            <td>{{ site.PHONE }}</td>
            <td>{{ changeToString(site.DIST) }}</td>
            <td>
              <v-btn
                style="cursor : pointer"
                rounded
                color="primary"
                dark
                @click="showNoteCreatePopup(site.ID, 1)"
              >
                노트추가
              </v-btn>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="getNowSelectedOpt === '비회원사 거리'">
          <tr
            v-for="site,idx in getCollectorListWithin"
            :key="idx"
            style="cursor : pointer"
          >
            <td>{{ site.SITE_NAME }}</td>
            <td>{{ site.PHONE }}</td>
            <td>{{ changeToString(site.DIST) }}</td>
            <td>{{ changeToIsTransit(site.IS_TRANSIT) }}</td>
            <td>
              <v-btn
                style="cursor : pointer"
                rounded
                color="primary"
                dark
                @click="showNoteCreatePopup(site.ID, 0)"
              >
                노트추가
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card>
      <NoteCreatePopup
        :dialog="dialog"
        :orderid="orderid"
        :siteid="siteID"
        :sitecategory="siteCategory"
        @closeDialog="closeDialog"
      />
    </v-card>
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
    return{
      memberTh : [
        '사업자명',
        '연락처',
        '거리',
        '노트추가',
      ],
      notMemberTh : [
        '사업자명',
        '연락처',
        '거리',
        '수집운반',
        '노트추가2',
      ],
	dialog: false,
	siteID: 0,
	siteCategory: 0,
    }
  },
  computed : {
    ...mapGetters('emissions',['getCollectorListWithin','getNowSelectedOpt'])
  },
  methods : {
    changeToString(value){
      if(value){
        return String(value).slice(0,4) + 'KM'
      }
      return value
    },
    changeToIsTransit(value){
      if(value == 1){
        return '가능'
      }
      return '불가능'
    },
     goToContent(siteId){
       this.$router.push({ path: `/admin/main/emitter-collector/${siteId}`})
    },
    showNoteCreatePopup(siteId, siteCategory){
		this.dialog = true
		this.siteID = siteId
		this.siteCategory = siteCategory
    },
    closeDialog(){
      this.dialog = false
    },
  }
}
</script>
<style lang="">

</style>
