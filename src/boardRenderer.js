/*  
 * This file handles all the rendering of images, takes care of the canvas
 * objects and is the only file to deal with the image files directly
 */

import { states } from './enums.js'
import { cardClicked } from './game.js'

let rear = new Image()
let front = new Image()
let loadedCounter = 0

let cards = []

/* * * * * * * * * * * *
 * LOADING IMAGE FILES *
 * * * * * * * * * * * */
export function loadImgFiles() {
	rear.onload = () => { loadedCounter++ }
	front.onload = () => { loadedCounter++ }

	rear.src = 'assets/rear.png'
	front.src = 'assets/cards.png'
}

export function isDoneLoading() {
	return loadedCounter === 2
}



/* * * * * * *
 * RENDERING *
 * * * * * * */
export function addCardsToBoard(toAdd) {
	console.log("adding cards to board")
	cards = toAdd

	const board = document.getElementById('board')

	// deleting all existing canvases
	while (board.firstChild) {
		board.removeChild(board.firstChild)
	}

	// add all necessary canvases
	for (let i = 0; i < cards.length; i++) {
		let c = document.createElement('canvas')
		c.setAttribute('cardId', i)
		c.setAttribute('class', 'card')
		c.setAttribute('state', states.down)
		c.setAttribute('width', '96')
		c.setAttribute('height', '96')
		c.addEventListener('click', (event) => {
			cardClicked(event.target)
		})
		board.appendChild(c)
		
		veilCard(c)
	}
	console.log("done adding cards to board")
}

export function unveilCard(card) {
	let cardInfo = cards[card.getAttribute('cardId')]
	card.getContext('2d').drawImage(front,
		cardInfo.xOffset,
		cardInfo.yOffset,
		48,	48,	// how much of the source image should be cut out
		0, 0,	// where on the canvas we want to draw
		96, 96	// how big we want to draw, in this case 2x scaling
	)
}

export function veilCard(card) {
	card.setAttribute('state', states.down)
	card.getContext('2d').drawImage(rear, 0, 0)
}

