import { RECEIVE_DECKS, ADD_ENTRY } from '../actions'

function decks (state = {}, { type, payload }) {
  switch (type) {
    case RECEIVE_DECKS:
      return { ...state, ...payload }

    case ADD_ENTRY:
      console.log('payload.entry:', payload.entry)
      return { ...state, ...payload.entry }

    default:
      return state
  }
}

export default decks
