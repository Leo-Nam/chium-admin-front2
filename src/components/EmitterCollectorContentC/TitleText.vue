<template>
	<div class="title-site-name">
		<v-card
			:style="{
				'width': '100%',
				'font-size': '10px',
				'text-align': 'left',
				'background': '#00B286',
				'height': '50px',
			}"
			flat
		>
			<span
				class="text-h5"
				:style="{
					'padding-left': '20px',
					'line-height': '50px'
				}"
			>
				{{ getSeletedUser.userType == 3 ? '수거업체' : '배출업체' }}
			</span>
		</v-card>
	</div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  computed : {
    ...mapGetters('selectedUser',['getSeletedUser'])
  },
}
</script>
<style>
template {
	font-family: Verdana;
}
</style>
