<template>
	<div style="margin-bottom : 15px">
		<v-row>
			<v-col cols="auto">
				<div>
					<v-select
						outlined
						id="opt-select"
						:items="getOptList"
						:value="selectedOpt"
						hide-details=""
						@change="changeOpt"
						:style="{
							'width': '300px',
							'padding-left': '20px',
						}"
					/>
				</div>
			</v-col>
			<v-col>
				<div>
					<v-text-field
						outlined
						v-model="keyword"
						hide-details=""
						placeholder="검색어 🚀"
					/>
				</div>
			</v-col>
			<v-col
				align-self="center"
				cols="auto"
			>
				<div
					:style="{
						'padding-right': '20px',
					}"
				>
					<div
						@click="searchBtn"
						:style="{
							'padding': '0px',
							'margin': '0px',
							'height': '56px',
							'width': '300px',
							'border-radius': '6px',
							'display': 'table-cell',
							'vertical-align': 'middle',
							'align': 'center',
							'border': 'solid 1px',
							'cursor': 'pointer',
							'text-align': 'center',
							'border-color': '#8D8D8D'
						}"
					>
							검색하기
					</div>
				</div>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import { mapGetters, mapActions, mapMutations} from "vuex"
export default {
  data(){
    return {
      keyword : '',
      selectedOpt : '회원사 거리',
      selectedIsTransitOpt : null,
      selectedBCodeWithinOpt : null,
      isTransitOpt : ['모두','수집운반 가능'],
      bCodeWithinOpt : ['해당 시군구','전국'],
    }


  },
  computed : {
    ...mapGetters('emissions',['getOptList','getNowSelectedOpt'])
  },
  methods : {
    ...mapActions('emissions',['sp_get_site_list_inside_range','sp_get_prospective_site_list_inside_range']),
    ...mapMutations('emissions',['setCircleRange','setNowSelectedOpt','setNowSelectedIsTransitOpt','setNowSelectedBCodeWithinOpt']),
    changeOpt(v){
      this.selectedOpt = v
    },
    changeIsTransitOpt(v){
      console.log('components:EmissionContentC:EmissionCollectorListOpt.vue:changeIsTransitOpt:',v)
      this.setNowSelectedIsTransitOpt(v)
    },
    changeBCodeWithinOpt(v){
      this.setNowSelectedBCodeWithinOpt(v)
    },
    searchBtn(){

      if(this.selectedOpt == '회원사 거리'){
        this.setNowSelectedOpt(this.selectedOpt)
        if (this.keyword == ''){
          alert('거리를 입력해주세요. ex) 50km >>> 50 ')
        } else {
          this.setCircleRange(this.keyword)
          this.sp_get_site_list_inside_range()
        }
      } else if(this.selectedOpt == '비회원사 거리'){
        this.setNowSelectedOpt(this.selectedOpt)
        if (this.keyword == ''){
          alert('거리를 입력해주세요. ex) 50km >>> 50 ')
        } else {
          this.setCircleRange(this.keyword)
          this.sp_get_prospective_site_list_inside_range()
        }
      }

    }
  }
}
</script>
<style lang="">

</style>
