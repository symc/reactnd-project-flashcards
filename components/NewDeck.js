import React, { Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import DismissKeyboard from 'dismissKeyboard';
import { white, black } from '../utils/colors';
import { saveDeckTitle } from '../utils/api';

export default class NewDeck extends Component {
  state = {
    input: ''
  };

  handleTextChange = (value) => {
    this.setState({input: value});
  }

  submit = () => {
    const deckTitle = this.state.input;
    saveDeckTitle(deckTitle).then(() => {
        DismissKeyboard();
        this.setState({input: ''})
        this.props.navigation.navigate('DeckDetail', {
          deckTitle: deckTitle,
          refresh: () => {}
        })
      }
    );
  }

  render() {
    const input = this.state.input;

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
          title='Submit'
          onPress={this.submit}
        />
      </View>
    );
  }
}

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