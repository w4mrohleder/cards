import React, { Component } from 'react'
import { AsyncStorage, Text, View, TextInput, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import styles from '../utils/styles'

class Card extends Component {
  // state = { flipped: false }

  render () {
    const { q, flipped } = this.props

    return (
      <View style={{ marginBottom: 20 }}>
        <Text>{flipped ? q.answer : q.question}</Text>
      </View>
    )
  }
}

const QuizComplete = <View>COMPLETE: %</View>

class Quiz extends Component {
  state = { currentIndex: 0, correctAnswers: 0, flipped: false }

  userAnswer = userAnswer => {
    this.setState(state => ({
      currentIndex: state.currentIndex + 1,
      correctAnswers: userAnswer ? state.correctAnswers + 1 : state.correctAnswers,
      flipped: false
    }))
  }

  startAgain = () => {
    this.setState({
      currentIndex: 0,
      correctAnswers: 0,
      flipped: false
    })
  }

  flipCard = () => {
    this.setState(state => ({ flipped: !state.flipped }))
  }

  render () {
    const { questions } = this.props.navigation.state.params
    const { currentIndex, correctAnswers, flipped } = this.state

    const currentQuestion = questions[currentIndex]

    return currentQuestion
      ? <View style={styles.container}>

        <Text style={{ marginBottom: 20, fontSize: 15 }}>{this.state.currentIndex + 1}/{questions.length}</Text>

        <View style={{ marginBottom: 30 }}>
          <Text style={[styles.center, { fontWeight: 'bold', fontSize: 30, marginBottom: 20 }]}>
            {flipped ? currentQuestion.answer : currentQuestion.question}
          </Text>
          <TouchableOpacity onPress={() => this.flipCard()}>
            <Text style={[styles.center, { color: '#C33929' }]}>{flipped ? 'Question' : 'Answer'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#377E22' }]} onPress={() => this.userAnswer(true)}>
          <Text style={styles.btnText}>Correct</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#C33929' }]} onPress={() => this.userAnswer(false)}>
          <Text style={styles.btnText}>Incorrect</Text>
        </TouchableOpacity>

      </View>
      : <View style={styles.container}>

        <View style={{ marginBottom: 30 }}>
          <Text style={styles.center}>
              Percentage correct
            </Text>
          <Text style={[styles.center, { fontSize: 30, fontWeight: 'bold' }]}>
            {(correctAnswers / questions.length * 100).toFixed(0)}%
            </Text>
        </View>

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#000' }]} onPress={() => this.startAgain()}>
          <Text style={styles.btnText}>Start again</Text>
        </TouchableOpacity>

      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
