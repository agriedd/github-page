<script setup>
import { computed, watch } from '@vue/runtime-core';
import moment from 'moment';
import { useStore } from 'vuex';
import CalendarActivity from './CalendarActivity.vue';

const props = defineProps({
	daytoadd: Number
})

const today = moment()
const last_day = moment().add(30, 'days')

const dates = computed(()=>{
	let items = []

	let pointer = today.startOf('day').unix()
	let last_pointer = last_day.startOf('day').unix()
	let last_active = moment().unix();

	while(pointer <= last_pointer){
		let date = moment.unix(
			pointer = moment.unix(pointer).add(1, 'days').unix()
		)
		date.locale('id')
		let active = false
		/**
		 * cek apakah tanggal adalah tanggal yang aktif
		 * 
		 */
		let last_active_date = moment.unix(last_active + props.daytoadd)
		if(last_active_date.startOf('day').unix() == date.startOf('day').unix()){
			last_active = date.startOf('day').unix()
			active = true
			console.log(date.format('DD MMM YYYY'));
		}
		items.push({
			id: date.startOf('day').unix(),
			date: date,
			active
		})
	}

	return items
})

const store = useStore()

watch(()=>props.daytoadd, e => {

})

const dayFormat = (date, locale)=>{
	return Intl.DateTimeFormat(locale, {
		weekday: 'short'
	}).format(date.toDate())
}
</script>
<template>
	<div class="flex flex-col h-full items-center justify-start text-gray-500">
		<div class="calendar flex w-full p-2 flex-nowrap flex-row overflow-hidden">
			<div class="p-1" v-for="item in dates" :key="item.id">
				<div class="flex flex-col justify-center items-center p-2 bg-gray-700 shadow-sm rounded-3xl transition-all"
					:class="{ 'bg-gray-600 text-white shadow-sm': item.active }"
					style="width: 56px">
					<div class="text-sm">
						{{ dayFormat(item.date, 'id-ID') }}
					</div>
					<div class="text-2xl font-bold">
						{{ item.date.format('DD') }}
					</div>
					<!-- <div class="text-sm">
						{{ item.date.format('YYYY') }}
					</div> -->
					<div class="text-sm">
						{{ item.date.format('MMM') }}
					</div>
				</div>
			</div>
		</div>
		<div class="w-full flex-1">
			<div class="h-full flex flex-col">
				<CalendarActivity/>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.calendar{
		// grid-template-columns:56px;
		// grid-auto-rows: 1fr;
		// gap: 1rem;
	}
</style>