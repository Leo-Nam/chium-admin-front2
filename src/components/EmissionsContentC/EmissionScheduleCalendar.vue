<template ref="refCalendar"> 
	<div>
		<v-sheet>
			<v-toolbar
				flat
			>
				<v-btn
					outlined
					class="mr-4"
					color="grey darken-2"
					@click="setToday"
				>
					Today
				</v-btn>
				<v-btn
					fab
					text
					small
					color="grey darken-2"
					@click="prev"
				>
					<v-icon small>
						mdi-chevron-left
					</v-icon>
				</v-btn>
				<v-btn
					fab
					text
					small
					color="grey darken-2"
					@click="next"
				>
					<v-icon small>
						mdi-chevron-right
					</v-icon>
				</v-btn>
				<v-toolbar-title v-if="$refs.calendar">
					{{ $refs.calendar.title }}
				</v-toolbar-title>
				<v-spacer />
				<v-menu
					bottom
					right
				>
					<template #activator="{ on, attrs }">
						<v-btn
							outlined
							color="grey darken-2"
							v-bind="attrs"
							v-on="on"
						>
							<span>{{ typeToLabel[type] }}</span>
							<v-icon right>
								mdi-menu-down
							</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item @click="type = 'day'">
							<v-list-item-title>Day</v-list-item-title>
						</v-list-item>
						<v-list-item @click="type = 'week'">
							<v-list-item-title>Week</v-list-item-title>
						</v-list-item>
						<v-list-item @click="type = 'month'">
							<v-list-item-title>Month</v-list-item-title>
						</v-list-item>
						<v-list-item @click="type = '4day'">
							<v-list-item-title>4 days</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-toolbar>
		</v-sheet>
		<v-sheet 
			:style="{'height': '600px'}"
		>
			<v-calendar
				ref="calendar"
				v-model="focus"
				color="primary"
				:events="events"
				:event-color="getEventColor"
				:type="type"
				@click:event="showEvent"
				@click:more="viewDay"
				@click:date="viewDay"
				@change="updateRange"
			/>
			<v-menu
				v-model="selectedOpen"
				:close-on-content-click="false"
				:activator="selectedElement"
				offset-x
			>
				<v-card
					color="grey lighten-4"
					min-width="350px"
					flat
				>
					<v-toolbar
						:color="selectedEvent.color"
						dark
					>
						<v-btn icon>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
						<v-toolbar-title v-html="selectedEvent.name" />
						<v-spacer />
						<v-btn icon>
							<v-icon>mdi-heart</v-icon>
						</v-btn>
						<v-btn icon>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</v-toolbar>
					<v-card-text>
						<span v-html="selectedEvent.details" />
					</v-card-text>
					<v-card-actions>
						<v-btn
							text
							color="secondary"
							@click="selectedOpen = false"
						>
							Cancel
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-menu>
		</v-sheet>
	</div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
  export default {
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['black', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1', 'red'],
      names: ['폐기물배출등록', '방문', '입찰', '폐기물수거요청일', '폐기물수거요청응답일', '방문조기마감일', '입찰조기마감일', '1순위자응답'],
    }),
	computed : {
		...mapGetters('emissions',['getOrderSchedule'])
	},
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
    ...mapActions('emissions',['sp_admin_get_disposer_schedule']),
		reloadPage(){
			console.log('components:EmissionContentC:EmissionScheduleCalendar.vue:reloadPage:','자식컴포넌트 리로드')
		},
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      async updateRange () {
		await this.sp_admin_get_disposer_schedule({orderId: this.$route.params.id})
        const events = []
        const eventCount = this.getOrderSchedule.length
		console.log('components:EmissionContentC:EmissionScheduleCalendar.vue:',eventCount, 'eventCount')

        for (let i = 0; i < eventCount; i++) {
			if(this.getOrderSchedule[i].START_AT != null && this.getOrderSchedule[i].END_AT != null){
				console.log('components:EmissionContentC:EmissionScheduleCalendar.vue:updateRange:',this.getOrderSchedule[i].NAME)
				console.log('components:EmissionContentC:EmissionScheduleCalendar.vue:updateRange:',this.getOrderSchedule[i].START_AT)
				console.log('components:EmissionContentC:EmissionScheduleCalendar.vue:updateRange:',this.getOrderSchedule[i].END_AT)
				events.push({
					name: this.getOrderSchedule[i].NAME,
					// start: (this.getOrderSchedule[i].START_AT !== null ? new Date(this.getOrderSchedule[i].START_AT) : null),
					// end: (this.getOrderSchedule[i].END_AT !== null ? new Date(this.getOrderSchedule[i].END_AT) : null),
					start: new Date(this.getOrderSchedule[i].START_AT),
					end: new Date(this.getOrderSchedule[i].END_AT),
					color: this.colors[this.getOrderSchedule[i].COLOR],
					timed: this.getOrderSchedule[i].TIMED,
				})
			}
        }

        this.events = events
        // this.events = this.getOrderSchedule1
		console.log('components:EmissionContentC:EmissionScheduleCalendar.vue:updateRange:',this.events, '===> events')
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>
<style>
</style>