<template>
    <v-app-bar
      dense
      color="#01b286"
      app
    >
      <v-app-bar-nav-icon @click.stop="toggle" />
		<v-toolbar-title 
			style="color : white; font-size : 14px"
		>
		치움 관리자 페이지
		</v-toolbar-title>
    <!-- -->
    </v-app-bar>
</template>
<script>
export default {
	data(){
		return{
		}
	},
	methods : {
		toggle(){
			this.value = !this.value
		},
	},
}
</script>
<style >

html {

    height: 100%;
}
</style>