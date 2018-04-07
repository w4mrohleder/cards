import React, { Component } from 'react'
import { AsyncStorage, Text, View, TouchableOpacity, Platform, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { getDecks, saveDeckTitle, addCardToDeck, clear } from '../utils/api'
import styles from '../utils/styles'
import { receiveDecks } from '../actions'

class Decks extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props

    // clear() // clear all data
    getDecks().then(decks => dispatch(receiveDecks(decks)))

    // saveDeckTitle('react')
    // addCardToDeck('react', { question: 'react3', answer: 'maybe' })
  }

  render () {
    const { decks } = this.props

    return (
      <ScrollView contentContainerStyle={[{ alignItems: 'stretch', padding: 10 }]}>

        <TouchableOpacity
          style={[styles.btn, { borderWidth: 1, borderColor: '#000' }]}
          onPress={() => this.props.navigation.navigate('AddDeck')}
        >
          <Text style={[styles.btnText, { color: '#000' }]}>Add Deck</Text>
        </TouchableOpacity>

        {decks &&
          Object.values(decks).map(deck => (
            <View style={styles.deck} key={deck.title}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', { deck })}>
                <Text>{deck.title}</Text>
                <Text style={{ color: '#A6A6A6' }}>({Object.values(deck.questions).length} cards)</Text>
              </TouchableOpacity>
            </View>
          ))}

      </ScrollView>
    )
  }
}

function mapStateToProps (state) {
  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(Decks)
