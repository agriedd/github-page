<script setup>
import { onMounted, ref } from 'vue';

const counter = ref(0)
const max = 3

const animate = ()=>{
	counter.value++
	if(counter.value > max - 1)
		counter.value = 0
	setTimeout(()=>{
		animate()
	}, 250 + (Math.random() * 500))
}

onMounted(()=>{
	animate()
})

</script>
<template>
	<div class="flex">
		<div class="rounded-full bg-gray-800 px-5 py-2 max-w-9/12 mb-2 text-gray-400">
			<transition-group class="font-mono text-sm flex flex-row" tag="div" name="dot-animation" mode="out-in">
				<div key="label">
					mengetik
				</div>
				<div v-for="i in counter+1" :key="i">.</div>
			</transition-group>
		</div>
	</div>
</template>
<style lang="scss" scoped>

	.dot-animation{
		&-enter{
			&-from{
				opacity: 0;
				transform: translateY(-.5rem);
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
				transition: all 0.25s ease-out;
			}
			&-to{
				opacity: 0;
			}
		}
	}

</style>