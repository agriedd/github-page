<script setup>

import { computed } from '@vue/reactivity';
import moment from 'moment';

const weekdays = [
	'Senin',
	'Selasa',
	'Rabu',
	'Kamis',
	'Jumat',
	'Sabtu',
	'Minggu',
]

const thismonth = moment().month()

const dates = computed(()=>{
	let items 	= []
	let start 	= moment().weekday(1).startOf('day').unix()

	for(let i = 0; i < 42; i++){
		let date = moment.unix(start).add(i, 'day')
		items.push({
			id: date.format('DDMMYY'),
			date
		})
	}
	return items
})

const substr = (val, len)=> val.substr(0, len)

</script>
<template>
	<div class="px-3 pt-1">
		<div class="bg-gray-800 p-3">
			{{ moment().format('MMMM') }}
			{{ moment().format('YYYY') }}
		</div>
	</div>
	<div class="grid calendar flex-1 p-1 px-3 text-gray-800">
		<div v-for="(hari,i) in weekdays" :key="`hari${i}`">
			<div class="bg-gray-700 p-3 h-full text-sm text-gray-200">
				{{ substr(hari, 3) }}
			</div>
		</div>
		<div v-for="item in dates" :key="item.id">
			<div class="bg-gray-700 p-3 h-full text-sm text-gray-50"
				:class="{
					'text-gray-500' : item.date.month() != thismonth
				}">
				{{ item.date.format('DD') }}
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>

	.calendar{
		grid-template-columns: repeat(7, 1fr);
		gap: 1px;
		grid-auto-rows: 1fr;
		grid-auto-flow: row;
	}

</style>