import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View, Text} from 'react-native';
class NotificationScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Thông báo',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/thongbao.png')}
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
		<Text>Notification Screen</Text>
		</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
	  flex: 1
  },
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

module.exports = NotificationScreen;