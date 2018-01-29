const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} = require('react-native');
const { Component } = React;

const window = Dimensions.get('window');
const uri = 'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-9/18740815_1616855888325796_2016274761961264881_n.jpg?oh=64b7a973d913aee3d4bfdc9946a23741&oe=59CB1C29';

const styles = StyleSheet.create({
  menu: {
    width: window.width,
    height: window.height,
    backgroundColor: '#961c1d',
  },
  avatarContainer: {
	backgroundColor: '#5b1011',
	paddingTop: 40,
	paddingBottom: 20,
	paddingLeft: 20,
	height: 120
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
	borderWidth: 1,
	borderColor: 'white',
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 90,
    top: 55,
	color: 'white',
	fontSize: 20,
	fontWeight: 'bold'
  },
  item: {
    fontSize: 18,
    fontWeight: '300',
    paddingTop: 30,
	color: 'white',
	fontWeight: 'bold',
	paddingLeft: 20
  },
  legal: {
	position: 'absolute',
	bottom: 10,
	left: 20,
	color: '#A9A9A9',
	fontStyle: 'italic'
  }
});

module.exports = class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri, }}/>
          <Text style={styles.name}>TuanPA</Text>
        </View>
		<TouchableOpacity onPress={() => this.props.onItemSelected('Online')}>
			<Text
			  style={styles.item}>
			  Online
			</Text>
		</TouchableOpacity>

		<TouchableOpacity onPress={() => this.props.onItemSelected('History')}>
        <Text
          style={styles.item}>
          History
        </Text>
		</TouchableOpacity>
		
		<TouchableOpacity onPress={() => this.props.onItemSelected('Notification')}>
		<Text
          style={styles.item}>
          Notification
        </Text>
		</TouchableOpacity>
		
		<Text
          onPress={() => this.props.onItemSelected('Vity')}
          style={styles.legal}>
          Vietek JSC - Vity Solution
        </Text>
		
      </View>
    );
  }
};