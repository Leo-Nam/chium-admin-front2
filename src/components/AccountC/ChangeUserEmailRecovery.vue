<template>
	<div>
		222
	</div>
</template>
<script>
import {mapMutations, mapGetters} from "vuex"
export default {
	data(){
		return {
		}
	},
	created(){
		this.setCurrentRoute(this.$route.name)
	},
	computed: {
		...mapGetters('auth',['getUserEmails']),
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),

		returnUrl(url){
			if (url !== null){
				return `${url}`
			} else {
				return
			}
		},
	}
}
</script>
<style scoped>
	a:link { 
		text-decoration: none; 
		color: black
	}
	a:visited { 
		text-decoration: none; 
		color: black
	}
	a:hover { 
		text-decoration: none; 
		color: black
	}
	a:active { 
		text-decoration: none; 
		color: black
	}
</style>
