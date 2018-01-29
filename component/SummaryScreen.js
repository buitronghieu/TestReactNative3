import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View, Text} from 'react-native';
class SummaryScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'B/C Tổng hợp',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/baocao.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  
  toggle() {
	  this.props.navigation.navigate('DrawerOpen');
  }

  render() {
    return (
       <View style={styles.container}>
		<TouchableOpacity style={styles.button} onPress={() => this.toggle()}>
          <Image
            source={require('../assets/menu.png')} style={{width: 32, height: 32}} />

        </TouchableOpacity>
		<Text>History Screen</Text>
		</View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10
  },
  icon: {
    width: 24,
    height: 24,
  },
});

module.exports = SummaryScreen;