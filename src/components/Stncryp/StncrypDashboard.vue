<script setup>
import { ref } from 'vue'
import TextInput from './TextInput.vue';

defineProps({
	msg: String
})

const count = ref(0)
</script>

<template>
	<div style="min-height: 100vh" class="">
		<div class="relative">
			<div class="absolute top-10 text-4xl right-4 rotate-45 transform">
				🦋
			</div>
			<div class="dashboard-grid p-4" style="min-height: 100vh">
				<div></div>
				<div>
					<TextInput/>
				</div>
				<div class="flex flex-col h-full">
					<div class="bg-gray-100 shadow-sm py-2 rounded-md flex-1 mb-5">
						<div class="flex flex-col h-full items-center justify-center text-gray-300">
							Coming... 🛠️
						</div>
					</div>
					<div class="dashboard-grid rowspan-4 sticky bottom-4">
						<div class="rounded-lg bg-gray-100 shadow-sm">
							<div class="divide-gray-200 divide-y">
								<div>
									<div class="p-3 flex justify-center items-center text-sm font-semibold text-gray-500">
										<a href="https://agriedd.github.io">
											Agri Edd.
										</a>
									</div>
								</div>
								<div class="flex-grow h-full">
									<div class="p-3 flex justify-center items-center text-gray-300 text-center text-sm">
										v.21.9.22
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
