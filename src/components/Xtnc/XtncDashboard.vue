<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import TypingAnimation from './TypingAnimation.vue'
import Application from './Application.vue'
import MessageBox from './MessageBox.vue'
import CalendarTodo from './CalendarTodo.vue'
import { useStore } from 'vuex'

defineProps({
	msg: String
})

const count = ref(0)
const typing = ref(true)
const updateTyping = e => typing.value = e
const messages = reactive([])
const daytoadd = ref(0)
const store = useStore()
const speed = computed({
	get(){
		return store.state.chat.speed
	},
	set(val){
		store.commit('chat/SET_SPEED', val)
	}
})
const applicationUpdate = e => {
	console.log("Hello", e);
	daytoadd.value = e.daytoadd
	/**
	 * 
	 * menyimpan state typing terakhir jika sebelumnya dicegat typingnya
	 * maka tidak perlu dinonaktifkan kalau sudah selesai
	 * 
	 */
	speed.value = .001

	let cont = false
	if(!typing.value)
		typing.value = true
	else
		cont = true
	
	setTimeout(e => {
		if(!cont)
			typing.value = false
		messages.push({
			id: Date.now(),
			text: "Tidak wajib loh ya//"
		})
	}, 500)
}
const giveUp = e =>{
	/**
	 * 
	 * menyimpan state typing terakhir jika sebelumnya dicegat typingnya
	 * maka tidak perlu dinonaktifkan kalau sudah selesai
	 * 
	 */
	let cont = false
	if(!typing.value)
		typing.value = true
	else
		cont = true
	
	let messages_giveup = [
		'Gpp dicoba lagi',
		'Parah.... 🤓',
		'Kena mental',
		'Bisa ga jangan nyerah 😅',
		'Bsa ga jan btl!',
		'mau berubah g sih 😅',
	]

setTimeout(e => {
		if(!cont)
			typing.value = false
		messages.push({
			id: Date.now(),
			text: messages_giveup[
				parseInt(Math.random() * messages_giveup.length)
			]
		})
	}, 500)
}

</script>

<template>
	<div style="min-height: 100vh" class="">
		<div class="relative">
			<div class="absolute top-10 text-4xl right-4 rotate-45 transform">
				🦋
			</div>
			<div class="dashboard-grid p-4" style="min-height: 100vh">
				<div class="flex flex-col h-full flex-wrap justify-end bg-gray-600 overflow-hidden rounded-lg" style="max-height: calc(100vh - 2rem);">
					<MessageBox 
						:typing="typing" 
						@update-typing="updateTyping" 
						:messages="messages"
						:active="dateactive"/>
				</div>
				<div>
					<Application @change="applicationUpdate" @giveup="giveUp"/>
				</div>
				<div>
					<div class="flex flex-col h-full w-full" style="max-height: calc(100vh - 2rem)">
						<div class="bg-gray-900 shadow-sm py-2 rounded-md flex-1 mb-5 overflow-auto">
							<CalendarTodo :daytoadd="daytoadd"/>
						</div>
						<div class="dashboard-grid rowspan-4">
							<div class="rounded-lg bg-gray-800 shadow-sm">
								<div class="divide-gray-900 divide-y">
									<div>
										<div class="p-3 flex justify-center items-center text-sm font-semibold text-gray-500">
											<a href="https://agriedd.github.io">
												Agri Edd.
											</a>
										</div>
									</div>
									<div class="flex-grow h-full">
										<div class="p-3 flex justify-center items-center text-gray-300 text-center text-sm">
											v.6.11.2021
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-auto-rows: auto;
		grid-gap: 2rem;
		& > div {
			grid-row-end: span 2;
		}
		@for $i from 1 to 12 {
			.rowspan-#{$i} {
				grid-row-end: span #{$i};
			}
		}
	}
</style>
