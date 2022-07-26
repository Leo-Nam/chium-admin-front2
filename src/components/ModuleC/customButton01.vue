<template>
	<v-row
		justify="end"
		style="margin-bottom : 30px"
	>
		<v-col
			cols="auto"
		>
			<v-btn 
				:style="{
					'width': '300px',
					'height': '40px',
					'background': '#00B286',
					'font-color': '#FFFFFF'
				}"
				text
				@click="btnClick"
			>
				<span
					:style="{
						'color': '#FFFFFF',
						'font-size': '15px',
						'font-weight': 'bold',
					}"
				>
					수정하기
				</span>
			</v-btn>
		</v-col>
	</v-row>	
</template>
<script>
export default {
	methods: {
		btnClick() {
			this.$emit('btnClick')
		}
	}
}
</script>