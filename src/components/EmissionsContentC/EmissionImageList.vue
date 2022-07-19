<template>
	<div>
		<v-carousel>
			<v-carousel-item
				v-for="(img,i) in getOrderInfo.IMG_INFO"
				:key="i"
				:src="img.IMG_PATH"
				reverse-transition="fade-transition"
				transition="fade-transition"
				@click="openImg(img.IMG_PATH)"
				flat
				v-resize="onResize"
			/>
		</v-carousel>
	</div>
</template>
<script>
import {mapGetters} from "vuex"
 export default {
	data: () => ({
		windowSize: {
			x: 0,
			y: 0,
		},
	}),

	mounted () {
		this.onResize()
	},
	computed : {
		...mapGetters('emissions',['getOrderInfo'])
	},
	methods : {
		openImg(url){
			window.open(url, '_blank');
		},
		onResize () {
			this.windowSize = { x: window.innerWidth, y: window.innerHeight }
		},
	}
  }
</script>
<style lang="">

</style>
