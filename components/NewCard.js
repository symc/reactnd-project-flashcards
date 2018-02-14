import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Picker, TouchableOpacity } from 'react-native';
import { white, black } from '../utils/colors';
import { addCardToDeck } from '../utils/api';
import DismissKeyboard from 'dismissKeyboard';
import { gray } from '../utils/colors';

/**
* @description Represents a view for creating a new card
* @constructor
*/
export default class NewCard extends Component {
  /*
    Each new card (a.k.a. question) is an object with two strings: 
    question and answer; and each of these strings are tied to one 
    of the TextInput components in the view. Local state of the 
    component holds the values of these TextInput components in two
    strings, named question and answer;
  */
  state = {
    question: '',
    answer: ''
  };

  /**
  * @description handleQuestionChange
  * Updates the state whenever the TextInput for question changes
  * @param {string} value - TextInput value representing the question
  */
  handleQuestionChange = (value) => {
    this.setState({question: value});
  }

  /**
  * @description handleAnswerChange
  * Updates the state whenever the TextInput for answer changes
  * @param {string} value - TextInput value representing the answer
  */
  handleAnswerChange = (value) => {
    this.setState({answer: value});
  }

  /**
  * @description submit
  * Submits the question by adding it to a deck
  * @param {string} deckTitle - Title of the deck to which the new question
  * will be submitted.
  */
  submit = (deckTitle) => {
    // Construct the card object
    const card = {
      question: this.state.question,
      answer: this.state.answer
    };
    // Use AsyncStorage API call to add the card to the deck
    addCardToDeck(deckTitle, card).then(() => {
        DismissKeyboard();
        this.setState({question: '', answer: ''});
        // Refresh the deck and deck list views after submission
        this.props.navigation.state.params.refresh();
        this.props.navigation.state.params.refreshDeck(deckTitle);
        // Navigate to the details page of the deck
        this.props.navigation.navigate('DeckDetail', {
          deckTitle: deckTitle,
          refresh: this.props.navigation.state.params.refresh
        })
      }
    );
  }

  render() {
    const deckTitle = this.props.navigation.state.params.deckTitle;
    const question = this.state.question;
    const answer = this.state.answer;
    /*
      Render a view with two input text fields: one for the question and one 
      for the answer. User can submit the question by clicking a button
    */
    return (
      <View style={{flex: 1}}>
        <Text style={styles.questionText}>
          What is the question?
        </Text>
        <TextInput
          value={question}
          style={styles.input}
          onChangeText={this.handleQuestionChange}
        />
        <Text style={styles.questionText}>
          What is the answer?
        </Text>
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

/*
  Styles used in this component
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    backgroundColor: white,
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: black,
    borderRadius: 15,
    alignSelf: 'center',
    fontSize: 20
  },
  questionText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: black,
    marginTop: 10,
    marginBottom: 10
  }
})