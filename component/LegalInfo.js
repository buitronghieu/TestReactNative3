import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';


class LegalInfo extends React.Component {
	render() {
		return (
		<View style={styles.logoContainer}>
          <Image
            source={require('../assets/VietekLogo.jpg')}
			style={styles.logo}/>
        </View>
	);
	}
}

const styles = StyleSheet.create({
  logoContainer: {
	  height: 50
  },
  logo: {
	  position: 'absolute',
	  right: 0,
	  bottom: 0,
	  height: 50,
  }
});

module.exports = LegalInfo;