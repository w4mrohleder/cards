export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_ENTRY = 'ADD_ENTRY'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    payload: {
      decks: JSON.parse(decks)
    }
  }
}
export function addEntry (entry) {
  return {
    type: ADD_ENTRY,
    payload: {
      entry
    }
  }
}
