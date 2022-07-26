<template>
  <v-container>
    <v-card style="padding : 40px ; margin-bottom : 50px">
      <BarChart :title="getTitle" />
    </v-card>
    <v-card style="padding : 40px ; margin-bottom : 50px">
      <SidoBarChart :title="getSidoTitle" />
    </v-card>
  </v-container>
</template>
<script>
import BarChart from "@/components/ChartC/BarChart.vue"
import SidoBarChart from "@/components/ChartC/SidoBarChart.vue"
import {mapActions,mapGetters,mapMutations} from "vuex"
export default {
	components : {
		BarChart,SidoBarChart
	},

	computed : {
		...mapGetters('chart',['getTitle','getSidoTitle'])
	},
	created(){
		this.sp_admin_retrieve_stat_registeration()
		this.setCurrentRoute(this.$route.name)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
		...mapActions('chart',['sp_admin_retrieve_stat_registeration'])
	}
}
</script>
<style lang="">

</style>
