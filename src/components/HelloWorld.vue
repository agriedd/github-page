<script setup>
import { ref } from 'vue'
import ProjectsTimeLine from './Home/ProjectsTimeLine.vue';
import Navbar from './Home/Navbar.vue';
import ContactSide from './Home/ContactSide.vue';

defineProps({
	msg: String
})

const count = ref(0)
</script>

<template>
	<div style="min-height: 100vh" class="flex flex-col">
		<Navbar />
		<div class="flex flex-grow">
			<div class="px-2" style="max-width: calc(100vw - 60px);">
				<div class="h-full flex py-2 flex-col justify-start sticky md:top-16 top-0" style="max-height: calc(100vh - 64px);">
					<div class="p-3 rounded-full bg-pink-100 text-pink-600">
						<div class="flex flex-col justify-center h-6 w-6 items-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
								<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<div class="flex-1 bg-gray-50 rounded-l-lg">
				<div class="dashboard-grid p-4">
					<div>
						<div class="dashboard-grid rowspan-4 sticky" style="top: calc(16px + 64px)">
							<div class="rounded-lg bg-white shadow-sm">
								<div class="divide-gray-200">
									<div class="border-b">
										<div class="p-3 flex justify-center items-center">
											<!-- make avatar -->
											<div class="flex items-center justify-center h-16 w-16 rounded-full overflow-hidden border-gray-200 bg-indigo-50">
												<!-- <img src="" alt="avatar" class="w-full h-full"> -->
											</div>
										</div>
										<div class="p-3 flex justify-center items-center text-xl font-semibold text-gray-500">
											Agri Edd. Oematan
										</div>
										<div class="p-3 pt-0 flex justify-center items-center text-gray-300">
											Front-end Developer | Back-end Developer |  
											<span class="p-1 pr-0">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette-fill" viewBox="0 0 16 16">
													<path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
												</svg>
											</span>
											<span class="p-1">
												Art
											</span>
										</div>
									</div>
									<div class="flex-grow h-full">
										<div class="p-3 flex justify-center items-center text-gray-300 text-center text-sm">
											"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptas sit culpa rem provident quod quidem? Consequuntur culpa minima excepturi."
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<projects-time-line />
					<div>
						<div class="bg-white mb-2 shadow-sm py-2 rounded-md md:sticky" style="top: calc(16px + 64px);">
							<ContactSide/>
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
		grid-gap: 1rem;
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
