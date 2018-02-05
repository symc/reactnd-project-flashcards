import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Picker } from 'react-native';
import { white, black } from '../utils/colors';
import { addCardToDeck } from '../utils/api';
import DismissKeyboard from 'dismissKeyboard';

export default class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  handleQuestionChange = (value) => {
    this.setState({question: value});
  }

  handleAnswerChange = (value) => {
    this.setState({answer: value});
  }

  submit = (deckTitle) => {
    const card = {
      question: this.state.question,
      answer: this.state.answer
    };
    addCardToDeck(deckTitle, card).then(() => {
        DismissKeyboard();
        this.setState({question: '', answer: ''});
        this.props.navigation.state.params.refresh();
        this.props.navigation.state.params.refreshDeck(deckTitle);
        this.props.navigation.navigate('DeckDetail', { deckTitle: deckTitle })
      }
    );
  }

  render() {
    const deckTitle = this.props.navigation.state.params.deckTitle;
    const question = this.state.question;
    const answer = this.state.answer;
    return (
      <View style={{flex: 1}}>
        <Text>Add card to {deckTitle}</Text>
        <Text>Enter the question:</Text>
        <TextInput
          value={question}
          style={styles.input}
          onChangeText={this.handleQuestionChange}
        />
        <Text>Enter the answer:</Text>
        <TextInput
          value={answer}
          style={styles.input}
          onChangeText={this.handleAnswerChange}
        />
        <Button
          title='Submit'
          onPress={()=>this.submit(deckTitle)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: white,
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: black
  }
})