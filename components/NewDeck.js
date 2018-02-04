import React, { Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
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
    saveDeckTitle(this.state.input).then(() => {
        this.setState({input: ''})
        this.props.navigation.navigate('DeckList')
      }
    );
  }

  render() {
    const input = this.state.input;

    return (
      <View style={{flex: 1}}>
        <Text>What is the title of your new deck?</Text>
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
  input: {
    backgroundColor: white,
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: black
  }
})