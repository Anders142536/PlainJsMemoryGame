/*  
 * This file serves the necessary data blobs for rendering the images
 */

export const imgData = []

// all images are 48 x 48 px
const imgEdgeLength = 48

for (let i = 0; i < 25; i++) {
	imgData.push({
		// Index, necessary for comparisons later
		id: i,

		// the offsets on the sprite sheet file. this steps over the whole
		// file with steps of 48 px, so the index can later be assigned the
		// right part of the image
		xOffset: imgEdgeLength * (i % 5),
		yOffset: imgEdgeLength * (Math.floor(i / 5) % 5)
	})
}



export function get8ShuffledRandomPairs() {
	// create copy of imgdata array
	let cards = [...imgData]
	randomize(cards)

	// removing every entry after the 8th
	cards.splice(8)

	// adding again all values of cards, practically duplicating the array
	cards.push(...cards)

	randomize(cards)

	console.log(cards)
	return cards
}

// sorts a given array randomly
function randomize(array) {
	array.sort(() => { return 0.5 - Math.random() } )
}


console.log("done initializing imgData")

