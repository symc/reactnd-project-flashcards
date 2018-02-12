import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getDeck } from '../utils/api';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';
import FlipCard from 'react-native-flip-card';
import { green, red, purple, black, white } from '../utils/colors';

/**
  * @description Represents a view for a quiz of a deck
  * @constructor
*/
export default class Quiz extends Component {
  /*
    Local state of a quiz has the following items
    1) questionNo: the question number which is currently being
    displayed in the quiz. Initially, it is zero, which designates
    the first question
    2) deck: The deck object on which this quiz is defined
    3) correctAnswers: number of correct answers so far
  */
  state = {
    questionNo: 0,
    deck: null,
    correctAnswers: 0
  };


  /**
  * @description refreshDeck
  * Refresh deck view by getting the data from AsyncStorage
  * @param {string} title - Title of the deck to be used to refresh the view
  */
  refreshDeck = (deckTitle) => {
    getDeck(deckTitle).then((result) => {
      this.setState({deck: result});
    });
  }

  /**
  * @description restartQuiz
  * Restarts the quiz. This function can only be called after a quiz is
  * completed. Therefore, the function resets the local notification so that
  * no notification will be displayed for today. After the notification is
  * handled, the state is reset so that quiz is in the first question again
  * and number of correct answers is zero
  */
  restartQuiz = () => clearLocalNotification()
    .then(setLocalNotification())
    .then(() => {
      const questionNo = this.state.questionNo;
      const correctAnswers = this.state.correctAnswers;
      this.setState({
        correctAnswers: 0,
        questionNo: 0
      })
    });

  /**
  * @description backToDeck
  * Navigates back to the deck view. This function can only be called after 
  * a quiz is completed. Therefore, the function resets the local notification
  * so that no notification will be displayed for today. After the notification
  * is handled, app navigates to the details page of the deck
  */
  backToDeck = (deckTitle, refresh) => clearLocalNotification()
    .then(setLocalNotification())
    .then(() => this.props.navigation.navigate(
      'DeckDetail', {
        deckTitle: deckTitle,
        refresh: refresh
      }
    ));

  /**
  * @description componentDidMount method of Quiz
  * Refresh the quiz using the deck title provided in the params
  */
  componentDidMount() {
    const deckTitle = this.props.navigation.state.params.deckTitle;
    this.refreshDeck(deckTitle);
    getDeck(deckTitle).then((result) => {
      this.setState({deck: result});
    });
  }

  /*
    Either renders a question or summary of the quiz.
    Question: Display the question number along with the total number of questions. Question
    is displayed on a flippable view. By clicking on the flippable panel, the user can 
    see the answer. The user self-grades her answer by clicking on Correct or Incorrect. 
    It is also possible for the user to abort the quiz.
    Summary: Number of correct questions and percentage of correct answers are displayed.
    The user can restart the quiz or go back to the detailed view of the deck. 
  */
  render() {
    // Get the current question if applicable
    const questionNo = this.state.questionNo;
    const totalNumberOfCards = (this.state.deck) ? this.state.deck.questions.length : 0;
    const currQuestion = (this.state.deck && (questionNo < totalNumberOfCards)) ?
      this.state.deck.questions[questionNo] : null;
    // Get the deck title and refresh function for the deck list view
    const deckTitle = this.props.navigation.state.params.deckTitle;
    const refresh = this.props.navigation.state.params.refresh;
    if (currQuestion) {
      /*
        Question view is rendered if we have a question to display
      */
      const question = (currQuestion) ? currQuestion.question : '';
      const answer = (currQuestion) ? currQuestion.answer : '';
      return (
        <View style={styles.container}>
          {/* Show question number and total number of questions */}
          <Text style={styles.remainingQuestions}>
            Question {questionNo+1} of {totalNumberOfCards}
          </Text>
          <FlipCard style={styles.flipCard}>
            {/* Face side shows the question */}
            <View style={styles.frontCard}>
              <Text style={styles.questionAnswer}>{question}</Text>
              <Text style={styles.flipToSee}>Click to see the answer</Text>
            </View>
            {/* Back side shows the answer*/}
            <View style={styles.backCard}>
              <Text style={styles.questionAnswer}>{answer}</Text>
              <Text style={styles.flipToSee}>Click to see the question</Text>
            </View>
          </FlipCard>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.correctButton}
              onPress={() => {
                const questionNo = this.state.questionNo;
                const correctAnswers = this.state.correctAnswers;
                this.setState({
                  correctAnswers: correctAnswers + 1,
                  questionNo: questionNo + 1
                }
              )}}
            >
              <View>
                <Text style={styles.buttonText}>Correct</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.incorrectButton}
              onPress={() => {
                const questionNo = this.state.questionNo;
                this.setState({
                  questionNo: questionNo + 1
                }
              )}}
            >
              <View>
                <Text style={styles.buttonText}>Incorrect</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.abortButton}
              onPress={() => this.props.navigation.navigate(
                'DeckDetail', {
                  deckTitle: deckTitle,
                  refresh: refresh
                }
              )}
            >
              <View>
                <Text style={styles.buttonText}>Abort Quiz</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      /*
        Otherwise, we display the summary
      */
      const correctAnswers = this.state.correctAnswers;
      const ratio = (this.state.deck) ? 100.0 * correctAnswers/(this.state.deck.questions.length) : 0.0;
      let percentageText = (this.state.deck && this.state.deck.questions.length > 0) ? 
        `Percentage of correct answers: ${Number.parseFloat(ratio).toPrecision(4)}%` : 
        `There is no point to compute the percentage. You did not add any cards yet :)`;
      return (
        <View style={styles.container}>
          <Text style={styles.explanationText}>
            Number of questions answered correctly: {correctAnswers}
          </Text>
          <Text style={styles.explanationText}>
            {percentageText}
          </Text>
          <Button 
            title={'Restart Quiz'}
            onPress={this.restartQuiz}
          />
          <Button 
            title={'Back to Deck'}
            onPress={() => this.backToDeck(deckTitle, refresh)}
          />
        </View>
      );
    }
  }
}

/*
  Styles used in this component
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  remainingQuestions: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
  },
  flipCard: {
    alignSelf: 'center',
    borderWidth: 0
  },
  frontCard: {
    backgroundColor: '#d3d3d3'
  },
  backCard: {
    backgroundColor: '#32ff32',
  },
  questionAnswer: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  flipToSee: {
    fontFamily: 'Courier',
    fontSize: 20
  },
  bottomContainer: {
    marginTop: 150
  },
  buttonText: {
    color: white,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Courier'
  },
  correctButton: {
    borderWidth: 1,
    alignSelf: 'center',
    width: 300,
    borderColor: black,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: green
  },
  incorrectButton: {
    borderWidth: 1,
    alignSelf: 'center',
    width: 300,
    borderColor: black,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: red
  },
  abortButton: {
    borderWidth: 1,
    alignSelf: 'center',
    width: 300,
    borderColor: black,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: purple
  },
  explanationText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: black,
    marginTop: 10,
    marginBottom: 10
  }
})