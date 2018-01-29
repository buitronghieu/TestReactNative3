/**
 * Created by HungDang on 8/24/2017.
 */
import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View, Text} from 'react-native';
class AccountManager extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Tài khoản',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../../assets/thongtintaikhona.png')}
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
module.exports = AccountManager;
