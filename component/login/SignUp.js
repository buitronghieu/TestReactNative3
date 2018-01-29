/**
 * Created by HungDang on 8/15/2017.
 */
'use strict';
import React, {Component} from 'react';

import {
    Image,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    Alert,
    AsyncStorage
} from 'react-native';
import {
    DrawerNavigator,
    NavigationActions
} from 'react-navigation';
let ConfigUtil = require('../../common/ConfigUtil');
let AppUtil = require('../../common/AppUtil');
class SignUp extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        drawerLabel: 'Đăng xuất',
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('../../assets/dangxuat.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        Alert.alert(
            'Vietek',
            'Bạn có muốn đăng xuất?',
            [
                {text: 'Cancel', onPress: () => this.onCancel(), style: 'cancel'},
                {text: 'OK', onPress: () => this.onOK()},
            ]
        );
        return null;
    }

    onCancel() {
        this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Main'}));
    }

    onOK() {
        AsyncStorage.getItem('terminal-token').then((sessionKey) => {
            fetch(ConfigUtil._getTrackingServerURL() + '/rest/terminal/logout/' + sessionKey, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                if (response.status === 200) {
                    return AppUtil.toJson(response);
                }
            }).then((responseData) => {
                if (responseData.status) {
                    AsyncStorage.removeItem('terminal-token');
                    AsyncStorage.removeItem('user-name-login');
                    AsyncStorage.removeItem('last-login-token');
                    this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Login'}));
                }
            })
        })
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    }
});
module.exports = SignUp;