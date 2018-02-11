import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getDeck } from '../utils/api';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';
import FlipCard from 'react-native-flip-card';
import { green, red, purple, black, white } from '../utils/colors';

export default class Quiz extends Component {
  state = {
    questionNo: 0,
    deck: null,
    correctAnswers: 0,
    isCompleted: false
  };

  refreshDeck = (deckTitle) => {
    getDeck(deckTitle).then((result) => {
      this.setState({deck: result});
    });
  }

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

  backToDeck = (deckTitle, refresh) => clearLocalNotification()
    .then(setLocalNotification())
    .then(() => this.props.navigation.navigate(
      'DeckDetail', {
        deckTitle: deckTitle,
        refresh: refresh
      }
    ));

  componentDidMount() {
    const deckTitle = this.props.navigation.state.params.deckTitle;
    this.refreshDeck(deckTitle);
    getDeck(deckTitle).then((result) => {
      this.setState({deck: result});
    });
  }

  render() {
    const questionNo = this.state.questionNo;
    const totalNumberOfCards = (this.state.deck) ? this.state.deck.questions.length : 0;
    const currQuestion = (this.state.deck && (questionNo < totalNumberOfCards)) ?
      this.state.deck.questions[questionNo] : null;
    const deckTitle = this.props.navigation.state.params.deckTitle;
    const refresh = this.props.navigation.state.params.refresh;
    if (currQuestion) {
      const question = (currQuestion) ? currQuestion.question : '';
      const answer = (currQuestion) ? currQuestion.answer : '';
      return (
        <View style={styles.container}>
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