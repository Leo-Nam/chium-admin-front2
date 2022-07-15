<template>
  <div>Accout Details{{ getUserInfo }}
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
	components : {
	},
	data(){
		return{
			
		}
	},
	computed : {
		...mapGetters('auth',['getUserInfo'])
	},
	mounted(){
	},
}
</script>
<style >
.container-box {
  height: 700px !important;
  justify-content: center;
  align-items: center;
  display: flex;

}
</style>
