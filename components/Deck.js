import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { getDeck } from '../utils/api';
import {lightGray } from '../utils/colors';

/**
* @description Represents a deck object
* @constructor
*/
export default class Deck extends Component {
  /*
    Local state of the class holds the title of the deck and an array of 
    questions representing the questions of the deck.
  */
  state = {
    deck: {
      title: '',
      questions: []
    }
  }

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
  * @description componentDidMount method of Deck
  * Refresh the deck using the deck title provided in the params
  */
  componentDidMount() {
    const deckTitle = this.props.navigation.state.params.deckTitle;
    this.refreshDeck(deckTitle);
  }

  /**
  * @description componentWillReceiveProps method of Deck
  * Refresh the deck using the deck title provided in the params
  */
  componentWillReceiveProps() {
    const deckTitle = this.props.navigation.state.params.deckTitle;
    this.refreshDeck(deckTitle);
  }

  /**
  * @description numberOfCardsText
  * Given a number, returns a text to be displayed that tells the user
  * the number of cards the deck has
  * @param {int} number - Number of cards
  * @returns {string} - String that has the information about number of cards
  */
  numberOfCardsText = (number) => {
    if (number === 0) {
      return `No cards`
    }
    let text = `${number} card`;
    if (number > 1) text += 's';
    return text;
  }

  render() {
    const deck = this.state.deck;
    /*
      Each deck object renders a view where the title of the deck and 
      the number of the cards in the deck is displayed. There are also 
      three buttons, one for creating a new question, one for starting
      the quiz and a final one for going back to the deck list
    */
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>
          {deck.title}
        </Text>
        <Text style={styles.deckNumber}>
          {this.numberOfCardsText(deck.questions.length)}
        </Text>
        <Button
            title={'Create New Question'}
            onPress={() => this.props.navigation.navigate('NewCard', {
              deckTitle: deck.title,
              refresh: this.props.navigation.state.params.refresh,
              refreshDeck: this.refreshDeck
            })}
        />
        <Button
            title={'Start Quiz'}
            onPress={() => this.props.navigation.navigate('Quiz', {
              deckTitle: deck.title,
              refresh: this.props.navigation.state.params.refresh
            })}
        />
        <Button
            title={'Show Deck List'}
            onPress={() => this.props.navigation.navigate('Home')}
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
    justifyContent: 'flex-start'
  },
  deckTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  deckNumber: {
    textAlign: 'center',
    fontSize: 30,
    color: lightGray,
    marginTop: 10,
    marginBottom: 30
  }
})