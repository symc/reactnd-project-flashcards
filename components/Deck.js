import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { getDeck } from '../utils/api';
import {lightGray } from '../utils/colors';

export default class Deck extends Component {
  state = {
    deck: {
      title: '',
      questions: []
    }
  }

  refreshDeck = (deckTitle) => {
    getDeck(deckTitle).then((result) => {
      this.setState({deck: result});
    });
  }

  componentDidMount() {
    const deckTitle = this.props.navigation.state.params.deckTitle;
    this.refreshDeck(deckTitle);
  }

  componentWillReceiveProps() {
    const deckTitle = this.props.navigation.state.params.deckTitle;
    this.refreshDeck(deckTitle);
  }

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
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>
          {deck.title}
        </Text>
        <Text style={styles.deckNumber}>
          {this.numberOfCardsText(deck.questions.length)}
        </Text>
        <Button 
            title={'Add Card'}
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
    fontFamily: 'Courier',
    textAlign: 'center',
    fontSize: 30,
    color: lightGray,
    marginTop: 10,
    marginBottom: 30
  }
})