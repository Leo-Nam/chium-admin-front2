<template>
	<div>
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
				:style="{
					'padding-left': '20px',
					'line-height': '50px',
					'color': '#FFFFFF',
					'font-size': `${fontSize}`+'px',
					'font-weight': 'bold',
				}"
			>
				{{ title }}
			</span>
		</v-card>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			default: null
		},
		fontSize: {
			type: Number,
			default: 20
		}
	},
}
</script>