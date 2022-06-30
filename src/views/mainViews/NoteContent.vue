<template>
  <div>
    <v-card>
      <NoteDetail />
    </v-card>
  </div>
</template>
<script>
import NoteDetail from "@/components/NoteContentC/NoteDetail.vue"
import {mapActions} from "vuex"
export default {
  components : {
    NoteDetail
  },
  created(){
    const noteId = this.$route.params.id
    this.sp_admin_get_note_details({noteId})
  },
  methods : {
    ...mapActions('noteList',['sp_admin_get_note_details'])
  },

}
</script>
<style lang="">

</style>
