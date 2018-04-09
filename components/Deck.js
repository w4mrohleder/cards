import React, { Component } from 'react'
import { AsyncStorage, Text, View, TextInput, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'

import { getDecks } from '../utils/api'
import styles from '../utils/styles'
import { receiveDecks } from '../actions'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params

    return {
      title: `Deck: ${deckTitle}`
    }
  }

  state = { opacity: new Animated.Value(0) }

  componentDidMount () {
    const { opacity } = this.state

    Animated.timing(opacity, { duration: 1500, toValue: 1 }).start()
  }

  render () {
    const { decks } = this.props
    const { deckTitle } = this.props.navigation.state.params
    const { opacity } = this.state

    const currentDeck = decks && decks[deckTitle]
    if (!currentDeck) return <Text>loading</Text>
    const currentQuestions = currentDeck.questions

    return (
      <Animated.View style={[styles.container, { opacity }]}>

        <View style={{ marginBottom: 30 }}>
          <Text style={[styles.center, { fontWeight: 'bold', fontSize: 20, marginBottom: 20 }]}>{deckTitle}</Text>
          <Text style={styles.center}>{currentQuestions.length} cards</Text>
        </View>

        <View>
          <TouchableOpacity
            style={[styles.btn, { borderWidth: 1, borderColor: '#000' }]}
            onPress={() => this.props.navigation.navigate('AddCard', { deckTitle })}
          >
            <Text style={[styles.btnText, { color: '#000' }]}>Add Card</Text>
          </TouchableOpacity>

          {currentQuestions.length &&
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#000' }]}
              onPress={() => this.props.navigation.navigate('Quiz', { questions: currentQuestions })}
            >
              <Text style={styles.btnText}>Start Quiz</Text>
            </TouchableOpacity>}

        </View>

      </Animated.View>
    )
  }
}

function mapStateToProps (state) {
  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(Deck)
