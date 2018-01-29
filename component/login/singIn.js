'use strict';
import React, {Component} from 'react';
import {
    Alert,
    StyleSheet,
    AsyncStorage,
    Text,
    View,
    Image,
    TextInput,
    StatusBar,
    TouchableHighlight,
    Button,
    ActivityIndicator
} from 'react-native';
import {DrawerNavigator, DrawerItems, StackNavigator, NavigationActions} from 'react-navigation';
var commonStyles = require('../../common/common_style');
var ConfigUtil = require('../../common/ConfigUtil');
var AppUtil = require('../../common/AppUtil');
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logging: true,
            disabled: false,
            username: null,
            colorUserName: '#6d6b6b',
            pass: null,
            colorPassword: '#6d6b6b',
            strError: "",
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('app-client-id').then((client_id) => {
            AsyncStorage.getItem('last-login-token').then((lastToken) => {
                fetch((ConfigUtil._getVityPortalURL() + '/rest/vityportal/app_authen'), {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        method: 'm_login',
                        params: {
                            clientid: client_id,
                            token: lastToken
                        }
                    })
                }).then((response) => {
                    if (response.status === 200) {
                        return AppUtil.toJson(response);
                    }
                }).then(responseData => {
                    if (responseData !== undefined && responseData.status) {
                        let token = responseData.token;
                        this.loginTrackingModule(client_id, token);
                    } else {
                        this.loggingDone();
                    }
                }).catch((ex) => {
                    this.loggingDone()
                });
            });

        })
    }

    loggingDone() {
        this.setState((state) => {
            state.logging = false;
            return state;
        });
    }

    doLogin() {
        this.setState({
            disabled: true,
            strError: ''
        });
        if (this.state.username !== null && this.state.pass !== null) {
            try {
                AsyncStorage.getItem('app-client-id').then((client) => {
                    AsyncStorage.getItem('app-id').then((appUuid) => {
                        fetch((ConfigUtil._getVityPortalURL() + '/rest/vityportal/app_authen'), {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                method: 'm_login',
                                params: {
                                    username: this.state.username,
                                    password: this.state.pass,
                                    clientid: client,
                                    appid: appUuid,
                                    product: ConfigUtil._getModuleName(),
                                }
                            })
                        }).then((response) => {
                            if (response.status === 200) {
                                return AppUtil.toJson(response);
                            }
                        }).then((responseData) => {
                            if (responseData !== undefined && responseData.status) {
                                let token = responseData.token;
                                AsyncStorage.setItem('user-name-login', responseData.user);
                                this.loginTrackingModule(client, token)
                            } else {
                                this.setState({
                                    strError: "Tài khoản không hợp lệ!",
                                    disabled: false
                                })
                            }
                        }).catch((ex) => {
                            this.setState({
                                strError: "Kiểm tra lại kết nối mạng!",
                                disabled: false
                            })
                        })
                    });
                }).catch((ex) => {
                });
            } catch (error) {
                console.log(error)
            }
        } else {
            this.setState({
                strError: "Phải nhập tài khoản và mật khẩu!"
            });
            if (this.state.username === null) {
                this.setState({
                    colorUserName: '#c64e4f'
                })
            }

            if (this.state.pass === null) {
                this.setState({
                    colorPassword: '#c64e4f'
                })
            }
        }
    }

    loginTrackingModule(client, token) {
        fetch(ConfigUtil._getTrackingServerURL() + '/rest/terminal/login/' + client + '/' + token, {
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
            let sessionKey = responseData.sessionKey;
            if (sessionKey !== null) {
                AsyncStorage.setItem('terminal-token', sessionKey);
                AsyncStorage.setItem('last-login-token', responseData.token);
                // this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Main'}));
                this.props.navigation.navigate('Main');
            }
        }).catch((ex) => {
            this.loggingDone();
            this.setState({
                strError: "Không thể kết nối module Tracking!",
                disabled: false
            })
        });
    }

    forgotPassword() {
        this.props.navigation.navigate('FogotPassword');
    }

    register() {
        this.props.navigation.navigate('Register');
    }

    render() {
        if (this.state.logging) {
            return this.renderWaitingUI();
        } else {
            return this.renderLoginUI();
        }
    }

    renderWaitingUI() {
        return (
            <View style={[this.props.style, styles.waitingContainer]}>
                <ActivityIndicator
                    color='#0D0CCD'
                    animating={this.state.logging}
                    size="large"
                />
            </View>
        );
    }

    renderLoginUI() {
        return (
            <View style={styles.layout}>
                <StatusBar
                    backgroundColor="black"
                    barStyle="dark-content"
                />
                <Image source={require('../../Resources/logo.png')} style={styles.logo}/>
                <Text>Đăng nhập với tài khoản Vietek</Text>
                <Text style={{color: '#c64e4f', marginTop: 10}}>{this.state.strError}</Text>
                <View style={styles.controls}>
                    <View style={styles.rowInput}>
                        <Image source={require('../../Resources/user.png')} style={styles.image}/>
                        <View style={styles.inputControl}>
                            <TextInput style={styles.input}
                                       placeholder={'Email / Số điện thoại'}
                                       onChangeText={(value) => this.setState({username: value})}
                                       placeholderTextColor='#c6c6c6'

                                       underlineColorAndroid='transparent'/>
                        </View>
                    </View>
                    <View style={styles.sperator}/>
                    <View style={styles.rowInput}>
                        <Image source={require('../../Resources/pass.png')} style={styles.image}/>
                        <View style={styles.inputControl}>
                            <TextInput style={styles.input}
                                       placeholder={'Mật khẩu'}
                                       secureTextEntry={true}
                                       onChangeText={(value) => this.setState({pass: value})}
                                       placeholderTextColor='#c6c6c6'
                                       underlineColorAndroid='transparent'/>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <TouchableHighlight style={commonStyles.button}
                                        disabled={this.state.disabled}
                                        underlayColor='#d3bfc6'
                                        onPress={ this.doLogin.bind(this)  }>
                        <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight style={styles.forgotButton}
                                    underlayColor='transparent'
                                    onPress={this.forgotPassword.bind(this)}>
                    <Text style={{color: '#30afda', fontSize: 18}}>Quên mật khẩu?</Text>
                </TouchableHighlight>
                <View style={{flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center'}}>
                    <Text style={{fontSize: 18}}>Bạn chưa có tài khoản?</Text>
                    <TouchableHighlight style={{marginLeft: 5}}
                                        underlayColor='transparent'
                                        onPress={this.register.bind(this)}>
                        <Text style={{color: '#c64e4f', fontSize: 18}}>Đăng ký</Text>
                    </TouchableHighlight>
                </View>
                <View style={commonStyles.copyright}>
                    <Text style={commonStyles.copyrightText}>
                        Copyright © 2014-2016 VIET TECHNOLOGY AND SOFTWARE DEVELOPMENT JSC
                    </Text>
                </View>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    layout: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    waitingContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 83,
        marginTop: 50,
        marginBottom: 30
    },
    copyright: {
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyrightText: {
        fontSize: 8
    },
    controls: {
        //flex:1,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginTop: 20,

    },
    rowInput: {
        //flex:1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        padding: 10
    },
    image: {
        width: 20,
        height: 20,
        marginTop: 6,
        justifyContent: 'center'
    },
    inputControl: {
        flex: 1,
        height: 36
    },
    input: {
        flex: 1,
        marginLeft: 10,
        height: 36,
        paddingLeft: 5,
        paddingRight: 5
    },
    sperator: {
        height: 1,
        backgroundColor: '#e5e5e5'
    },
    button: {
        height: 40,
        backgroundColor: '#c64e4f',
        borderRadius: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    forgotButton: {
        height: 30,
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    socialButton: {
        height: 40,
        borderRadius: 10,
        alignSelf: 'stretch',
        marginTop: 5,
    },
    fbButton: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 8,
        //textAlign: 'center',
        backgroundColor: '#4f86bf'
    },
    ggButton: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 8,
        //textAlign: 'center',
        backgroundColor: '#e05341'
    },
    imgSocial: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 8,
        left: 8,
        justifyContent: 'center'
    },
    textSocial: {
        flex: 1,
        alignSelf: 'stretch',
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
        //backgroundColor:'grey'
    }
});

module.exports = SignIn;