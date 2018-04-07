import React, { Component } from 'react'
import { AsyncStorage, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'

import { getDecks } from '../utils/api'
import styles from '../utils/styles'
import { receiveDecks } from '../actions'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck: { title } } = navigation.state.params

    return {
      title: `Deck: ${title}`
    }
  }

  render () {
    const { decks } = this.props
    const { deck: { title, questions } } = this.props.navigation.state.params

    const currentDeck = decks[title]
    const currentQuestions = currentDeck.questions

    return (
      <View style={styles.container}>

        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>{title}</Text>
          <Text>{currentQuestions.length} cards</Text>
        </View>

        <View>
          <TouchableOpacity
            style={[styles.btn, { borderWidth: 1, borderColor: '#000' }]}
            onPress={() => this.props.navigation.navigate('AddCard', { deckTitle: title })}
          >
            <Text style={[styles.btnText, { color: '#000' }]}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#000' }]}
            onPress={() => this.props.navigation.navigate('Quiz', { questions: currentQuestions })}
          >
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    decks: state.decks
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { deck } = navigation.state.params

  return {
    // remove: () =>
    //   dispatch(
    //     addEntry({
    //       [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
    //     })
    //   ),
    // goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
