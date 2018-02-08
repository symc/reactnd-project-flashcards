import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { getDeck } from '../utils/api';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';
import FlipCard from 'react-native-flip-card';
import { green } from '../utils/colors';

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
            <Button
              title={'Correct'}
              onPress={() => {
                const questionNo = this.state.questionNo;
                const correctAnswers = this.state.correctAnswers;
                this.setState({
                  correctAnswers: correctAnswers + 1,
                  questionNo: questionNo + 1
                }
              )}}
            />
            <Button
              title={'Incorrect'}
              onPress={() => {
                const questionNo = this.state.questionNo;
                this.setState({
                  questionNo: questionNo + 1
                }
              )}}
            />
            <Button 
              title={'Abort Quiz'}
              onPress={() => this.props.navigation.navigate(
                'DeckDetail', {
                  deckTitle: deckTitle,
                  refresh: refresh
                }
              )}
            />
          </View>
        </View>
      );
    } else {
      const correctAnswers = this.state.correctAnswers;
      const ratio = (this.state.deck) ? 100.0 * correctAnswers/(this.state.deck.questions.length) : 0.0;
      return (
        <View style={styles.container}>
          <Text>Number of questions answered correctly: {correctAnswers}</Text>
          <Text>Percentage of correct answers: {ratio}%</Text>
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
  }
})