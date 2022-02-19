/*  
 * This file takes care of all the game logic.
 */

import * as deck from './imageData.js'
import * as board from './boardRenderer.js'
import { states } from './enums.js'

let cards
let failedAttempts
let firstPick
let secondPick

board.loadImgFiles()
waitForLoadingToComplete()

function waitForLoadingToComplete() {
	if (board.isDoneLoading()) {
		console.log('done loading')
		startNewGame()
	} else {
		console.log('not done loading')
		setTimeout(waitForLoadingToComplete, 100)
	}
}

function startNewGame() {
	cards = deck.get8ShuffledRandomPairs()
	firstPick = null
	secondPick = null
	failedAttempts = 0

	board.addCardsToBoard(cards)
}

export function cardClicked(card) {
	let cardId = card.getAttribute('cardId')
	let state = card.getAttribute('state')
	console.log('clicked card #' + cardId + ' with state ' + state)
	
	// if a card that is already done or the first selected card is clicked 
	// we ignore it
	if (state === states.correct || state === states.up) return
	if (state === states.down) {
		// new first pick
		if (secondPick) {
			if (secondPick.getAttribute('state') === states.incorrect) {
				board.veilCard(firstPick)
				board.veilCard(secondPick)
			}

			board.unveilCard(card)
			setState(card, states.up)

			firstPick = card
			secondPick = null
		} else if (firstPick) {
			board.unveilCard(card)
			secondPick = card

			if (areSame(firstPick, card)) {
				setState(firstPick, states.correct)
				setState(secondPick, states.correct)
			} else {
				setState(firstPick, states.incorrect)
				setState(secondPick, states.incorrect)

				failedAttempts++
			}
		} else {
			// happens at the very first pick, as otherwise there is always at
			// least one pick that happened
			firstPick = card
			board.unveilCard(card)

			setState(card, states.up)
		}
	} else {
		// state is states.incorrect, which can only happen after the second
		// pick was done, starting again at the first pick.
		board.veilCard(firstPick)
		board.veilCard(secondPick)

		board.unveilCard(card)
		setState(card, states.up)

		firstPick = card
		secondPick = null
	}
}

function areSame(one, other) {
	let oneId = cards[one.getAttribute('cardId')].id
	let otherId = cards[other.getAttribute('cardId')].id

	return oneId === otherId
}

// QoL function
function setState(card, state) {
	card.setAttribute('state', state)
}




