import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { getDeck } from '../utils/api'; 

export default class Deck extends Component {
  state = {
    deck: {
      title: '',
      questions: []
    }
  }

  componentDidMount() {
    const deckTitle = this.props.navigation.state.params.deckTitle;
    getDeck(deckTitle).then((result) => {
      this.setState({deck: result});
    });
  }

  componentWillReceiveProps() {
      const deckTitle = this.props.navigation.state.params.deckTitle;
      getDeck(deckTitle).then((result) => {
        this.setState({deck: result});
      });
  }

  render() {
    const deck = this.state.deck;
    return (
      <View style={{flex: 1}}>
        <Text>Deck name: {deck.title}</Text>
        <Text>Number of cards: {deck.questions.length}</Text>
        <Button 
            title={'Add Card'}
            onPress={() => this.props.navigation.navigate('NewCard', {deckTitle: deck.title})}
        />
        <Button 
            title={'Start Quiz'}
            onPress={() => this.props.navigation.navigate('Quiz')}
        />
      </View>
    );
  }
}