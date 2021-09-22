<template>
	<div>
		<div class="rounded-md bg-gray-100 p-3 caret-yellow-300 mb-5">
			<textarea
				v-model="text"
				class="w-full p-3 bg-gray-100 outline-none text-gray-700"
				rows="4"
				placeholder="Teks mu.."></textarea>
		</div>
		<div class="text-2xl font-serif font-extrabold text-gray-700 p-3 rounded-md mb-4 py-10">{{ text_nr2br }}</div>
		<div class="rounded-md bg-white rounded-md shadow-sm">
			<div class="flex divide-x divide-gray-100">
				<a :href="`whatsapp://send?text=${text_nr2br}`" class="p-3 py-5 flex-1">
					<div class="flex justify-center text-green-800 hover:text-green-500">
						<div>
							<div class="flex items-center flex-col justify-center h-full">
								<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
									<path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
								</svg>
							</div>
						</div>
						<div class="pl-3">
							Bagikan ke whatsapp
						</div>
					</div>
				</a>
				<div class="p-3 py-5 cursor-pointer" @click="copytext()">
					<div class="flex text-gray-800">
						<div>
							<div class="flex items-center flex-col justify-center h-full">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
									<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
									<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
								</svg>
							</div>
						</div>
						<div class="pl-3">
							Salin
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { computed, ref } from "@vue/reactivity";
	import { watch } from "@vue/runtime-core";

	const text = ref("")
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

	text.value = "Mengapa otak bisa membaca tulisan yang tersusun acak ?"

	const copytext = ()=>{
		var input = document.createElement('textarea');
		input.innerHTML = text_nr2br.value;
		document.body.appendChild(input);
		input.select();
		var result = document.execCommand('copy');
		document.body.removeChild(input);
		alert("Disalin 👌")
		return result;
	}
</script>
<style>
</style>