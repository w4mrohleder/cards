import React, { Component } from 'react'
import { AsyncStorage, Text, View, TextInput, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { addEntry } from '../actions'
import { saveDeckTitle } from '../utils/api'
import styles from '../utils/styles'

import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'

class AddDeck extends Component {
  state = {
    title: ''
  }

  addDeck = () => {
    const { dispatch } = this.props

    saveDeckTitle(this.state.title).then(() => {
      // dispatch(addEntry({ [this.state.title]: { ...this.state } }))
      getDecks().then(decks => dispatch(receiveDecks(decks)))
      this.props.navigation.goBack()
    })
  }

  render () {
    return (
      <View style={styles.container}>

        {/* <Text>Create new deck</Text> */}

        <TextInput
          style={styles.input}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
          placeholder='Deck title'
        />

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#000' }]} onPress={() => this.addDeck()}>
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

// function mapDispatchToProps (dispatch, { navigation }) {
//   const { deck } = navigation.state.params

//   return {
//     // remove: () =>
//     //   dispatch(
//     //     addEntry({
//     //       [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
//     //     })
//     //   ),
//     // goBack: () => navigation.goBack()
//   }
// }

export default connect(mapStateToProps)(AddDeck)
