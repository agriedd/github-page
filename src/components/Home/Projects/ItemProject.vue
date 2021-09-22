<template>
	<div class="border-solid border-gray-900 rounded-lg bg-gray-800 mb-2 text-white shadow-sm h-full overflow-hidden">
		<div class="flex flex-col justify-between h-full divide-y divide-gray-700">
			<div>
				<div class="bg-gray-700 min-h-0 h-60 rounded-t-lg image-cover" 
					:style="{
						backgroundImage: item.image ? `url('${item.image}')` : null,
					}"></div>
				<div class="p-3 flex-grow">
					<div class="text-sm truncate text-lg">{{ item.title }}</div>
					<div class="text-sm truncate text-gray-400">{{ item.subtitle }}</div>
				</div>
			</div>
			<div class="flex divide-x divide-gray-700">
				<a :href="item.repo.url" :disabled="!item.repo || item.repo.private" class="p-3 flex-1 hover:bg-gray-900 transition-all cursor-pointer">
					<div class="flex flex-col justify-center items-center text-sm">Repository</div>
				</a>
				<a :href="item.url" class="p-3 flex-1 hover:bg-gray-900 transition-all cursor-pointer">
					<div class="flex flex-col justify-center items-center text-sm">Url</div>
				</a>
			</div>
		</div>
	</div>
</template>
<script setup>
	defineProps({
		item: Object
	})
</script>
<style lang="scss" scoped>
	.image-cover{
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>