<script setup>
import { computed, ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import moment from 'moment';
import countdown from 'countdown';
import { useStore } from 'vuex';

const props = defineProps({})

const emit = defineEmits(['change', 'delete', 'giveup'])

const difficult = ref(0)

const store = useStore()

const active_date = computed({
	get: () => {
  		return store.state.dateactive.active_date
	},
	set: val=>{
		store.commit('dateactive/SET_ACTIVE', val)
	}
})

watch(active_date, (e)=>{
	if(e.active){
		let date = e.date.startOf('day').toDate()
		const counter = countdown(date, function(ts) {
			if(active_date.value.active)
				active_date.value.counter = ts
			else
				window.clearInterval(counter);
		},
    	countdown.HOURS|countdown.MINUTES|countdown.SECONDS)
	}
})

const giveup = ()=>{
	active_date.value.active = false
	emit('giveup', Date.now())
}

const startApp = ()=>{
	let daytoadd = 0
	if(difficult.value == 0){
		let today = moment()
		/**
		 * 7 hari + up to 20%
		 * 
		 */
		let oneweek = moment().add(7 + (Math.random() * (7 * .2)), 'day')
		let timestamp_aweek = oneweek.unix() - today.unix()
		/**
		 * 3% dari (7 hari + up to 100%)
		 * 
		 */
		daytoadd = parseInt(Math.abs(timestamp_aweek) * ((100/3)/100))
		let dates = Array(3).fill(0).map((element, key) => {
			return {
				date: moment.unix(today.unix() + (daytoadd * (key + 1)))
			}
		});
		active_date.value = {
			date: dates[0].date,
			active: true,
			counter: null
		}
		emit('change', {
			active_date: active_date.value,
			dates, daytoadd
		})
	} else {
		alert(`Pilih yang noob bos, masih belum selesai`)
	}
}

</script>
<template>
	<div class="flex h-full flex-col justify-start">
		<div>
			<h3 class="text-lg mb-3 font-bold font-mono">
				Kesulitan
			</h3>
		</div>
		<transition name="fly-down-animation">
			<div class="filter-kesulitan grid" v-if="!active_date.active">
				<div class="rounded-md p-3 cursor-pointer border text-sm"
					:class="{ 'bg-gray-800 text-white border-gray-900': difficult == 0, 'hover:bg-gray-100': difficult != 0 }"
					@click="difficult = 0">
					Noob
				</div>
				<div class="rounded-md p-3 cursor-pointer border text-sm"
					:class="{ 'bg-gray-800 text-white border-gray-900': difficult == 1, 'hover:bg-gray-100': difficult != 1 }"
					@click="difficult = 1">
					Normal
				</div>
				<div class="rounded-md p-3 cursor-pointer border text-sm"
					:class="{ 'bg-gray-800 text-white border-gray-900': difficult == 2, 'hover:bg-gray-100': difficult != 2 }"
					@click="difficult = 2">
					Pro
				</div>
				<div class="rounded-md p-3 cursor-pointer border text-sm"
					:class="{ 'bg-gray-800 text-white border-gray-900': difficult == 3, 'hover:bg-gray-100': difficult != 3 }"
					@click="difficult = 3">
					Legend
				</div>
			</div>
		</transition>
		<div class="py-1">
			<div v-if="difficult == 0" class="p-3 bg-gray-100 rounded-lg border">
				<div class="flex">
					<div class="pr-6 py-2 pl-2 text-5xl">
						🤓
					</div>
					<div class="flex-1">
						<div class="flex flex-col justify-center h-full">
							<div>
								<div class="text-lg font-bold">
									Tingkat kesulitan Noob
								</div>
								<div class="text-sm">
									Tanggal yang ditentukan 3x dalam seminggu
								</div>
								<div class="text-sm">
									buat yang amatiran saja 🙏👌
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else-if="difficult == 1" class="p-3 bg-gray-100 rounded-lg border">
				<div class="flex">
					<div class="pr-6 py-2 pl-2 text-5xl">
						🙏
					</div>
					<div class="flex-1">
						<div class="flex flex-col justify-center h-full">
							<div>
								<div class="text-lg font-bold">
									Tingkat kesulitan Normal
								</div>
								<div class="text-sm">
									Tanggal yang ditentukan 1x dalam seminggu
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else-if="difficult == 2" class="p-3 bg-gray-100 rounded-lg border">
				<div class="flex">
					<div class="pr-6 py-2 pl-2 text-5xl">
						🔥
					</div>
					<div class="flex-1">
						<div class="flex flex-col justify-center h-full">
							<div>
								<div class="text-lg font-bold">
									Tingkat kesulitan Pro
								</div>
								<div class="text-sm">
									Tanggal yang ditentukan beberapa kali dalam sebulan
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else-if="difficult == 3" class="p-3 bg-gray-100 rounded-lg border">
				<div class="flex">
					<div class="pr-6 py-2 pl-2 text-5xl">
						🗿
					</div>
					<div class="flex-1">
						<div class="flex flex-col justify-center h-full">
							<div>
								<div class="text-lg font-bold">
									Tingkat kesulitan Legend
								</div>
								<div class="text-sm">
									Tanggal yang ditentukan beberapa kali dalam setahun
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="py-12" v-if="!active_date.active">
			<div class="px-5 py-6 text-xl rounded-lg text-center bg-indigo-800 text-white font-mono cursor-pointer hover:border-blue-500 hover:text-indigo-800 hover:shadow-lg hover:bg-indigo-300 transition-all" @click="startApp()">
				Mulai
			</div>
		</div>
		<transition name="fly-down-animation" mode="out-in">
			<div v-if="active_date.active" class="sticky bottom-0 bg-gray-50 rounded-md">
				<div class="flex p-3 flex-col justify-center">
					<div class="flex py-3">
						<div class="font-bold md:text-9xl text-7xl">
							{{ active_date.date.format('DD') }}
						</div>
						<div class="pl-3">
							<div class="h-full flex flex-col justify-center">
								<div class="text-sm">
									{{ active_date.counter }}
								</div>
								<div class="font-bold md:text-2xl text-gray-500">
									{{ active_date.date.format('MMM') }}
								</div>
								<div class="font-bold md:text-3xl text-gray-500">
									{{ active_date.date.format('YYYY') }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="p-3 text-sm mb-5">
					Kamu harus menunggu sampai tanggal {{ active_date.date.format('DD-MMM-YYYY') }} untuk mengunggah sesuatu di media sosial kamu, 
					tapi ini bukanlah kewajiban
				</div>
			</div>
		</transition>
		<transition name="fly-down-animation">
			<div class="aksi-app grid sticky bottom-3 bg-gray-50" v-if="active_date.active">
				<div class="bg-pink-800 rounded-md p-2 text-white cursor-pointer shadow-lg" @click="giveup()">
					<div class="flex flex-col justify-center h-full items-center text-sm">
						Menyerah
					</div>
				</div>
				<div class="bg-green-600 rounded-md p-2 text-white cursor-pointer" v-if="false">
					<div class="flex flex-col justify-center h-full items-center text-sm">
						Lanjut Harian
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<style lang="scss" scoped>
	.filter-kesulitan{
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		grid-auto-rows: 1fr;
		gap: .25rem;
	}
	.aksi-app{
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		grid-auto-rows: 80px;
		gap: 1px;
	}
	.fly-down-animation{
		&-enter{
			&-from{
				opacity: 0;
				transform: translateY(-1rem);
			}
			&-active{
				transition: all 0.25s ease-out;
			}
			&-to{
				opacity: 1;
				transform: translateY(0);
			}
		}
		&-leave{
			&-from{
				opacity: 1;
			}
			&-active{
				// transition: all .25s ease-out;
				// z-index: -1;
				overflow-y: hidden;
				position: absolute;
				opacity: 0;
			}
			&-to{
				opacity: 0;
			}
		}
	}
</style>