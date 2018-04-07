import { AsyncStorage } from 'react-native'

export const CARDS_STORAGE_KEY = 'cards:storage'

export function getDecks () {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
}

export function getDeck (id) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results)
    return data[id]
  })
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(
    CARDS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: []
      }
    })
  )
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results)
    const deckData = data[title]

    return AsyncStorage.mergeItem(
      CARDS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deckData.questions, { ...card }]
        }
      })
    )
  })
}

export function clear () {
  return AsyncStorage.removeItem(CARDS_STORAGE_KEY)
}
