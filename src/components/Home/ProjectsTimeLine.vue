<template>
	<div class="dashboard-grid">
		<div class="rowspan-1">
			<div class="p-3 rounded-md backdrop-blur-lg bg-white h-full shadow-sm">
				<div class="flex h-full">
					<div class="text-sm text-gray-500 flex-1">
						<div class="h-full flex flex-col justify-center">
							<div>
								<div>
									<span class="text-green-500">Update: </span>
									<span class="text-yellow-500">On Maintenance</span>
								</div>
								<div class>
									last updated:
									<span class="text-gray-300">{{ last_updated }}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="pl-3">
						<div class="h-full flex flex-col justify-center items-center">
							<div class="p-3 rounded-full bg-indigo-50 hover:bg-indigo-900 text-indigo-600 hover:text-indigo-50 transition-colors">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1.2rem"
									height="1.2rem"
									fill="currentColor"
									class="bi bi-pin-angle-fill"
									viewBox="0 0 16 16"
								>
									<path
										d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<template v-if="items.length">
			<div v-for="(item, i) in items" :key="i">
				<ItemProject :item="item"/>
			</div>
		</template>
		<template v-else>
			<div class="p-5 rounded-md bg-gray-500 text-white flex flex-col items-center justify-center">
				Kosong 😥
			</div>
		</template>
	</div>
</template>
<script setup>
import axios from 'axios'
import { ref } from "@vue/reactivity";
import ItemProject from './Projects/ItemProject.vue';

const items = ref([

]);

const last_updated = ref("9/22/2021")

/**
 * @todo remove when on production
 * 
 */
items.value = [
	{
		"title": "Website Profil & Database Jemaat",
		"subtitle": "Website Profil & Database Jemaat GMIT Diaspora Danau Ina Oesapa Timur",
		"url": "http://www.gmitdiaspora.org/",
		"repo": {
			"private": true
		}
	},
	{
		"title": "Website Profil Pengacara",
		"subtitle": "Website Profil Pengacara Kota Kupang Bernard Anin",
		"url": "http://www.gmitdiaspora.org/",
		"image": "/sc_bernard_anin_official.jpg",
		"repo": {
			"url": "https://github.com/agriedd/website-profil-pengacara"
		}
	}
]

/**
 * @todo ganti waktu di production
 * 
 */
axios.get('https://agriedd.github.io/api/ae_p001.json').then(e => {
	items.value = e?.data
}).catch(e => {
	console.log("Gagal");
})

</script>
<style lang="scss" scoped>
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