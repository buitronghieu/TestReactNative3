import React from 'react';
import {View, Image, Text, StyleSheet, AsyncStorage} from 'react-native';

const uri = 'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-9/18740815_1616855888325796_2016274761961264881_n.jpg?oh=64b7a973d913aee3d4bfdc9946a23741&oe=59CB1C29';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('user-name-login').then((username) => {
            this.setState({
                username: username
            });

        })
    }

    render() {
        return (
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={require('../assets/account.png')} />
                <Text style={styles.name}>{this.state.username}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    avatarContainer: {
        backgroundColor: '#c20b3b',
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
});

module.exports = UserInfo;