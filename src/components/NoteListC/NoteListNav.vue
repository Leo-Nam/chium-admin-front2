<template lang="">
  <div class="text-center">
    <v-pagination
      :length="getLastPageNum"
      :value="getPageNum"
      :total-visible="7"
      @input="changePage"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
	computed: {		
		...mapGetters('noteList', ['getPageNum', 'getLastPageNum', 'getSearch'])
	},

	methods: {
		changePage(pageToGo){
			this.$router.push({path: 'list', query: {page: pageToGo, keywork: this.getSearch}})
		}
	}
	
}
</script>
<style lang="">
	
</style>