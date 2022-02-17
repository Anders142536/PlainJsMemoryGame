import { imgData } from "./imageData.js"	

let rCards = pickRandomCards()



function pickRandomCards() {
	randomize(imgData)

	// removing every entry after the 8th
	imgData.splice(8)

	// adding again all values of imgData, practically duplicating the array
	imgData.push(...imgData)

	randomize(imgData)

	console.log(imgData)
}

// sorts a given array randomly
function randomize(array) {
	array.sort(() => { return 0.5 - Math.random() } )
}
