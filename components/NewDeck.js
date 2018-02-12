import React, { Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import DismissKeyboard from 'dismissKeyboard';
import { white, black } from '../utils/colors';
import { saveDeckTitle } from '../utils/api';

/**
  * @description Represents a view for creating a new deck
  * @constructor
*/
export default class NewDeck extends Component {
  /*
    Local state captures the contents of the input text field
  */
  state = {
    input: ''
  };

  /**
  * @description handleTextChange
  * Updates the state whenever the TextInput for deck title changes
  * @param {string} value - TextInput value representing the deck title
  */
  handleTextChange = (value) => {
    this.setState({input: value});
  }

  /**
  * @description submit
  * Submits the deck by adding it to AsyncStorage
  */
  submit = () => {
    const deckTitle = this.state.input;
    saveDeckTitle(deckTitle).then(() => {
        // Dismiss the keyboard after the deck is saved
        DismissKeyboard();
        // Clear the text input field state
        this.setState({input: ''})
        // Navigate to the details page of the created deck
        this.props.navigation.navigate('DeckDetail', {
          deckTitle: deckTitle,
          refresh: () => {}
        })
      }
    );
  }

  render() {
    const input = this.state.input;
    /*
      Render a view that has an input text field. The user can enter the 
      title of the new deck here and press a button to create a deck with
      that title.
    */
    return (
      <View onPress={()=>{DismissKeyboard()}} style={styles.container}>
        <Text style={styles.questionText}
          >What is the title of your new deck?
        </Text>
        <TextInput
          value={input}
          style={styles.input}
          onChangeText={this.handleTextChange}
        />
        <Button
          title='Create Deck'
          onPress={this.submit}
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
    fontFamily: 'Courier',
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