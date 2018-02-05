import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class Quiz extends Component {
  render() {
    const deckTitle = this.props.navigation.state.params.deckTitle;
    const refresh = this.props.navigation.state.params.refresh;
    return (
      <View style={{flex: 1}}>
        <Text>This is a view for a quiz.</Text>
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
  }
}