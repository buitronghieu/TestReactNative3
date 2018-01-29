import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage, Platform} from 'react-native';
import {DrawerNavigator, DrawerItems, StackNavigator, NavigationActions} from 'react-navigation';
var OnlineScreen = require('./component/OnlineScreen');
var HistoryScreen = require('./component/HistoryScreen');
var SummaryScreen = require('./component/SummaryScreen');
var NotificationScreen = require('./component/NotificationScreen');
var UserInfo = require('./component/UserInfo');
var LegalInfo = require('./component/LegalInfo');
const SignIn = require('./component/login/singIn');
var SignUp = require('./component/login/SignUp')
var fogotPassword = require('./component/login/forgotPassword');
var register = require('./component/login/register');
var AccountManager = require('./component/login/AccountManager');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

const CustomDrawerContentComponent = (props) => (
    <View style={styles.container}>
        <UserInfo/>
        <DrawerItems {...props} />
    </View>
);

const MainScreen = DrawerNavigator({
        Home: {
            screen: OnlineScreen,
        },
        History: {
            screen: HistoryScreen,
        },
        // Summary: {
        //     screen: SummaryScreen,
        // },
        // Notifications: {
        //     screen: NotificationScreen,
        // },
        // AccountManager: {
        //     screen: AccountManager,
        // },
        SignUp: {
            screen: SignUp,
        },
    }, {
        drawerWidth: 300,
        contentComponent: CustomDrawerContentComponent,
        contentOptions: {
            activeTintColor: '#600202',
            inactiveTintColor: '#1c0d19',
            style: {
                // backgroundColor: '#c20b3b',
                backgroundColor: 'white',
                flex: 1
            }
        }
    }
);
class Logout extends Component {
    render() {
        return <view>Log out</view>
    }
}
class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <SignIn navigation={this.props.navigation}/>;
    }

}

const AppScreen = StackNavigator({
    Login: {screen: LoginScreen},
    FogotPassword: {screen: fogotPassword},
    Register: {screen: register},
    Main: {screen: MainScreen},
}, {
    headerMode: 'none',
});
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AsyncStorage.getItem('app-client-id').then((clientId) => {
            if (clientId == null) {
                clientId = this.randomUUID(32);
                AsyncStorage.setItem('app-client-id', clientId);
            }
        }).catch((error) => {
            console.log(error);
        });
        AsyncStorage.getItem('app-id').then((appId) => {
            if (appId == null) {
                if (Platform.OS === 'ios') {
                    appId = "1:1033751381614:ios:fa890c48570e769a";
                } else {
                    appId = "1:1033751381614:android:8fa798c3d3eca09d";
                }
                AsyncStorage.setItem('app-id', appId);
            }
        });

    }

    render() {
        return (
            <AppScreen/>
        );
    }

    componentWillUnmount(){
        console.log('dadsdsadada')
    }

    randomUUID(number) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < number; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
}