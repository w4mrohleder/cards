import React, { Component } from 'react'
import { AsyncStorage, Text, View, TextInput, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { addEntry } from '../actions'
import { addCardToDeck } from '../utils/api'
import styles from '../utils/styles'

import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  addCard = deckTitle => {
    const { dispatch } = this.props

    addCardToDeck(deckTitle, { ...this.state }).then(() => {
      // dispatch(addEntry({ [deckTitle]: { ...this.state } }))
      getDecks().then(decks => dispatch(receiveDecks(decks)))
      this.props.navigation.goBack()
    })
  }

  render () {
    const { deckTitle } = this.props.navigation.state.params

    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
          placeholder='Question'
        />

        <TextInput
          style={styles.input}
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
          placeholder='Answer'
        />

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#000' }]} onPress={() => this.addCard(deckTitle)}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(AddCard)
