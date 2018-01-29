import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class VehicleSummary extends React.Component {
	render() {
		return (
		  <View style={[this.props.style, styles.container]}>
				<Text>Tổng số xe: 100</Text>
				<Text>Xe chạy: 20</Text>
				<Text>Vượt tốc: 20</Text>
				<Text>Dừng: 20</Text>
				<Text>Tắt máy: 20</Text>
				<Text>Mất tín hiệu: 20</Text>
		  </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'red',
		margin: 10,
	}
});

module.exports = VehicleSummary;