<template>
  <div>
    <v-card>
      <NotMemberDetail />
    </v-card>
  </div>
</template>
<script>
import NotMemberDetail from "@/components/NotMemberContentC/NotMemberDetail.vue"
import {mapActions} from "vuex"
export default {
  components : {
    NotMemberDetail
  },
  created(){
    const notMemberId = this.$route.params.id
    this.sp_admin_retrieve_prospective_site_info({siteId : notMemberId})
  },
  methods : {
    ...mapActions('notMember',['sp_admin_retrieve_prospective_site_info'])
  },

}
</script>
<style lang="">

</style>
