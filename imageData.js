export const imgData = []

// all images are 48 x 48 px
const imgEdgeLength = 48

for (let i = 0; i < 25; i++) {
	imgData.push({
		// Index, necessary for comparisons later
		id: i,

		// random number, necessary for picking 8 random cards to fill the
		// board with later
		random: Math.random(),

		// the offsets on the sprite sheet file. this steps over the whole
		// file with steps of 48 px, so the index can later be assigned the
		// right part of the image
		xOffset: imgEdgeLength * (i % 5),
		yOffset: imgEdgeLength * (Math.floor(i / 5) % 5)
	})
}
