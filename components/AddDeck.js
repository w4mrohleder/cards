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

    if (this.state.title) {
      saveDeckTitle(this.state.title).then(() => {
        // dispatch(addEntry({ [this.state.title]: { ...this.state } }))
        getDecks().then(decks => dispatch(receiveDecks(decks)))
        this.props.navigation.goBack()
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
          placeholder='Deck title'
          placeholderTextColor='#A6A6A6'
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

export default connect(mapStateToProps)(AddDeck)
