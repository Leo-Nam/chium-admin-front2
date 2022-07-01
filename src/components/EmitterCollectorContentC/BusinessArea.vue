<template>
  <v-chip-group
    active-class="primary--text"
    column
  >
    <v-chip
      v-for="area in getBusinessAreaList"
      :key="area"
    >
      {{ area }}
    </v-chip>
  </v-chip-group>
</template>
<script>
import { mapGetters, mapActions, mapMutations} from "vuex"
export default {
  data(){
    return {
      keyword : ''
    }

  },
  computed : {
    ...mapGetters('selectedUser',['getOptList','getSeletedUser','getBusinessAreaList'])
  },
  methods : {
    ...mapActions('selectedUser',['sp_admin_retrieve_site_info']),
    ...mapMutations('selectedUser',['setCircleRange','setTypeIndex']),
    changeSelect(v){
      const el = document.getElementById('search-input')
      if(v == '거리'){
        el.style.display = ''
        this.setTypeIndex(0)
      } else {
        this.keyword = ''
        el.style.display = 'none'
      }
    },
    searchBtn(){

      if (this.keyword == ''){
        alert('거리를 입력해주세요. ex) 50km >>> 50 ')
      } else {
        this.setCircleRange(this.keyword)
        this.sp_admin_retrieve_site_info({siteId : this.getSeletedUser.siteId})
      }
    }
  }
}
</script>
<style lang="">

</style>
