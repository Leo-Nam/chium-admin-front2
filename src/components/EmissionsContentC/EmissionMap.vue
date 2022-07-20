<template>
	<div 
		:style="{
			'padding': '30px',
			'margin-top' : '15px',
			'margin-bottom' : '15px',
		}" 
	>
		<div 
			id="map" 
			:style="{
				'height': '350px',
				'resize': 'both',
				'over-flow': 'auto',
				'max-width': '100%'
			}"
		/>
		<div 
			:style="{
				'display': `none`,
			}"
		>
			{{ getOrderInfo }}
		</div>
	</div>
</template>
<script>

import {mapGetters} from "vuex"
export default {
    data() {
        return {
        }
    },
	computed : {
		...mapGetters('emissions',['getOrderInfo']),
	},
	mounted() {
		if (window.kakao && window.kakao.maps) {
			this.initMap();
		} else {
			const script = document.createElement("script");
			/* global kakao */
			script.onload = () => kakao.maps.load(this.initMap);
			script.src =
				"//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=31da5401f6ff3888e0ebd955885faaf3&libraries=clusterer,services";
			document.head.appendChild(script);
		}
	},
	updated() {
		document.getElementById('map').innerHTML = "";
		this.initMap()
	},
	methods: {
		async initMap() {
			try {	
				const latLng = new kakao.maps.LatLng(this.getOrderInfo.LAT, this.getOrderInfo.LNG)
				const container = document.getElementById("map");
				const options = {
					center: latLng,
					level: 3,
				};
				const map = new kakao.maps.Map(container, options)
				new kakao.maps.Marker({
					position :latLng,
					title : this.getOrderInfo.DISPOSER_NAME ,
					map,
				});
			} catch (e) {
				return
			}
		},
	}
}
</script>
<style scoped>
#map {
  width:100%;
  height:300px;
}
</style>
