import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'

import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

function MyStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        title: 'Decks'
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        title: 'Add Deck'
      }
    },
    Deck: {
      screen: Deck
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        title: 'Add Card'
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        title: 'Quiz'
      }
    }
  },
  {
    navigationOptions: {
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#000'
      }
    }
  }
)

export default class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }

  render () {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MyStatusBar backgroundColor='black' barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
