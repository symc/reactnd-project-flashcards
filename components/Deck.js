import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class Deck extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>This is a view for an individual deck.</Text>
        <Text>This is a view for an individual deck.</Text>
        <Text>This is a view for an individual deck.</Text>
        <Text>This is a view for an individual deck.</Text>
        <Text>This is a view for an individual deck.</Text>
        <Button 
            title={'Add Card'}
            onPress={() => this.props.navigation.navigate('NewCard')}
        />
        <Button 
            title={'Start Quiz'}
            onPress={() => this.props.navigation.navigate('Quiz')}
        />
      </View>
    );
  }
}