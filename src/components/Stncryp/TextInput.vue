<template>
	<div>
		<div class="rounded-md bg-gray-100 p-3 caret-yellow-300 mb-5">
			<textarea
				v-model="text"
				class="w-full p-3 bg-gray-100 outline-none text-gray-700"
				rows="4"
				placeholder="Teks mu.."></textarea>
		</div>
		<div class="text-2xl font-serif font-extrabold text-gray-700 p-3 rounded-md">{{ text_nr2br }}</div>
	</div>
</template>
<script setup>
	import { computed, ref } from "@vue/reactivity";
	import { watch } from "@vue/runtime-core";

	const text = ref("Mengapa otak bisa membaca tulisan yang tersusun acak ?")
	const text_nr2br = ref(text.value)

	const shuffle_middle_letter = (word)=>{
		if(word.length < 2) return word
		let trimmed = word.match(/^.(.*).$/i)[1]

		let listpos = trimmed.split("")
		let posavailable = new Array(trimmed.length).fill(0).map((e, i) => i)
		console.log(posavailable);
		let randomtrimmed = new Array(trimmed.length).fill(0)

		listpos.forEach((letter, i) => {
			let sameplace = true;
			let counter = 0, maxcounter = 10
			while(sameplace){
				let pos = Math.ceil(Math.random() * posavailable.length) - 1
				let posletter = posavailable[pos]

				if(i != posletter || counter >= maxcounter){
					posavailable.splice(pos, 1)
					randomtrimmed[posletter] = listpos[i]
					sameplace = false
				}
				counter++
			}
		});
		word = word.replace(/^(.)(.*)(.)$/i, `$1${randomtrimmed.join("")}$3`)
		return word
	}

	watch(text, (newValue, oldValue) => {
		/**
		 * pisahkan tiap kata menjadi list
		 * 
		 * looping per kata
		 * 		> cek apakah huruf pada kata > 2
		 * 			jika ya, ambil huruf selain index ke-0 dan index ke-n
		 * 				acak posisi
		 * 			jika tidak
		 * 			masukan kata yang sudah di ubah sesuai posisi
		 * 
		 * 
		 */
		let splited = newValue.split(" ")
		splited.forEach((word, i) => {
			splited[i] = shuffle_middle_letter(word)
		});
		text_nr2br.value = splited.join(" ")
	})
</script>
<style>
</style>