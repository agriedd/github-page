<script setup>
import { computed, reactive, ref } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import TypingAnimation from './TypingAnimation.vue';

const props = defineProps({
	typing: Boolean,
	messages: Array,
	active: Boolean
})

const store = useStore()

const speed = computed({
	get(){
		return store.state.chat.speed
	},
	set(val){
		store.commit('chat/SET_SPEED', val)
	}
})

const emit = defineEmits([
	'update-typing'
])

const running_message = ()=>{
	
	if(counter_problem.value >= problems.length)
		return emit('update-typing', false)

	let message = problems[counter_problem.value]
	if(message.text)
		emit('update-typing', true)
	setTimeout(() => {
		emit('update-typing', false)
		setTimeout(()=>{
			if(message.text){
				props.messages.push({id: counter_problem.value + 1, ...message})
			}
			counter_problem.value++
			running_message()
		}, 250 * speed.value)
	}, message.time * speed.value)
}

onMounted(()=>{
	running_message()
})

const problems = [
	{ text: `p`, time: 1000 },
	{ text: `p`, time: 250 },
	{ text: `p`, time: 500 },
	{ text: `Masih pengembangan 👌`, time: 2000 },
	{ text: `Terlalu sering exist di media sosial?`, time: 5000 },
	{ time: 2000 },
	{ text: `yakin nih ga kecanduan media sosial?`, time: 6000 },
	{ time: 2000 },
	{ text: `yakin ni ... 🗿🗿🗿`, time: 5000 },
	{ time: 2000 },
	{ text: `Boleh dong ikut tantangan ini`, time: 5000 },
	{ text: `Tantangannya kami yang menentukan kapan kamu memposting sesuatu di media sosial`, time: 6000 },
	{ time: 5000 },
	{ text: `berani...`, time: 6000 },
	{ time: 5000 },
	{ text: `silahkan pilih level dan klik mulai di bawah/sebelah kanan...`, time: 6000 },
	{ time: 5000 },
	{ text: `@Todo`, time: 1000 },
	{ text: `1. Level yang lainnya`, time: 1000 },
	{ text: `2. Simpan data -> localStorage`, time: 1000 },
	{ text: `3. dll`, time: 1000 },
]
let counter_problem = ref(0)

</script>
<template>
	<div class="py-2 rounded-md flex-1">
		<div class="flex flex-col h-full p-3">
			<transition-group name="chat-pop-up">
				<div v-for="(item) in props.messages" :key="item.id" class="flex">
					<div class="rounded-t-xl rounded-br-xl shadow-sm bg-gray-900 px-5 py-2 max-w-9/12 mb-2 text-white">
						<div class="font-mono">
							{{ item.text }}
						</div>
					</div>
				</div>
			</transition-group>
			<TypingAnimation v-if="typing"/>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.chat-pop-up{
		&-enter{
			&-from{
				opacity: 0;
				transform: translateY(1rem);
			}
			&-active{
				transition: all 0.3s ease-out;
			}
			&-to{
				opacity: 1;
				transform: translateX(0);
			}
		}
		&-leave{
			&-from{
				opacity: 1;
			}
			&-active{
				transition: all 0.3s ease-out;
			}
			&-to{
				opacity: 0;
			}
		}
	}
</style>