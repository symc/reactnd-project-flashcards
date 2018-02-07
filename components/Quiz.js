import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { getDeck } from '../utils/api';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';

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
    const currQuestion = (this.state.deck && (questionNo < this.state.deck.questions.length)) ?
      this.state.deck.questions[questionNo] : null;
    const deckTitle = this.props.navigation.state.params.deckTitle;
    const refresh = this.props.navigation.state.params.refresh;
    if (currQuestion) {
      const question = (currQuestion) ? currQuestion.question : '';
      const answer = (currQuestion) ? currQuestion.answer : '';
      return (
        <View style={{flex: 1}}>
          <Text>Question: {question}</Text>
          <Text>Answer: {answer}</Text>
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
      );
    } else {
      const correctAnswers = this.state.correctAnswers;
      const ratio = (this.state.deck) ? 100.0 * correctAnswers/(this.state.deck.questions.length) : 0.0;
      return (
        <View style={{flex: 1}}>
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