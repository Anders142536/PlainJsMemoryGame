/*  
 * This file takes care of all the game logic.
 */

import * as deck from './imageData.js'
import * as board from './boardRenderer.js'
import { states } from './enums.js'


board.loadImgFiles()

waitForLoadingToComplete()

function waitForLoadingToComplete() {
	if (board.isDoneLoading()) {
		console.log("done loading")
		startGame()
	} else {
		console.log("not done loading")
		setTimeout(waitForLoadingToComplete, 100)
	}
}

function startGame() {
	let cards = deck.get8ShuffledRandomPairs()

	board.addCardsToBoard(cards)
}

export function cardClicked(card) {
	let cardId = card.getAttribute('cardId')
	console.log("clicked card #" + cardId)
	
	// if a card that is already revealed is clicked we ignore it
	if (card.getAttribute('state') !== states.down) return
	
	board.revealCard(card)
	
}




