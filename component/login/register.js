'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Alert,
    View,
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    BackAndroid,
    Modal
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import CheckBox from 'react-native-checkbox';
var ConfigUtil = require('../../common/ConfigUtil');
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            fullname: null,
            colorUserName: '#6d6b6b',
            colorfullName: '#6d6b6b',
            password: null,
            colorPassword: '#6d6b6b',
            rePass: null,
            colorRePass: '#6d6b6b',
            checked: true,
            strError: "",
            msg: ""
        }
    }

    doLogin() {
        this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Login'}));
    }

    doRegister() {
        var strError = "";
        if (this.state.checked) {
            strError = "Bạn chưa đồng ý với điều kiện và điều khoản của chúng tôi. ";
        }

        if (this.state.username == null || this.state.password == null || this.state.rePass == null) {
            strError = "Bạn không được nhập trống những ô đỏ";
            if (this.state.username == null) {
                this.setState({
                    colorUserName: '#c64e4f'
                })
            }
            if (this.state.password == null) {
                this.setState({
                    colorPassword: '#c64e4f'
                })
            }
            if (this.state.password == null) {
                this.setState({
                    colorRePass: '#c64e4f'
                })
            }

        } else {
            if (this.state.password != this.state.rePass) {
                strError = "Mật khẩu không đúng!";
                this.setState({
                    colorPassword: '#c64e4f',
                    colorRePass: '#c64e4f'
                })
            }
        }
        this.setState({
            strError: strError
        })
        console.log(strError);
        if (strError == "") {
            try {
                fetch(ConfigUtil._getVityPortalURL() + '/rest/vityportal/app_authen', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        method: 'm_register',
                        params: {
                            username: this.state.username,
                            password: this.state.password,
                            fullname: this.state.fullname,
                            product: "GPS",
                        }
                    })
                }).then((response) => {
                    if (response.status == 200) {
                        return response.json()
                    }
                })
                    .then((responseData) => {
                        this.setState({
                            msg: responseData.message
                        });
                    }).done();
            } catch (error) {
                console.log(error)
            }
        }

    }

    render() {
        return (
            <View style={styles.layout}>
                <Image source={require('../../Resources/logo.png')} style={styles.logo}/>
                <TextInput style={[styles.input, {borderColor: this.state.colorUserName}]}
                           underlineColorAndroid='transparent'
                           onChangeText={(value) => this.setState({username: value})}
                           placeholder={'Email / Số điện thoại'}
                           placeholderTextColor='#c6c6c6'/>
                <TextInput style={[styles.input, {borderColor: this.state.colorfullName}]}
                           underlineColorAndroid='transparent'
                           onChangeText={(value) => this.setState({fullname: value})}
                           placeholder={'Tên đầy đủ'}
                           placeholderTextColor='#c6c6c6'/>
                <TextInput style={[styles.input, {borderColor: this.state.colorPassword}]}
                           underlineColorAndroid='transparent'
                           secureTextEntry={true}
                           onChangeText={(value) => this.setState({password: value})}
                           placeholder={'Mật khẩu'}
                           placeholderTextColor='#c6c6c6'/>
                <TextInput style={[styles.input, {borderColor: this.state.colorRePass}]}
                           underlineColorAndroid='transparent'
                           secureTextEntry={true}
                           onChangeText={(value) => this.setState({rePass: value})}
                           placeholder={'Nhập lại mật khẩu'}
                           placeholderTextColor='#c6c6c6'/>
                <CheckBox
                    label='Tôi đồng ý với các điều khoản và điều kiện'
                    checkboxStyle={styles.checkbox}
                    labelStyle={{color: '#36b7de', alignItems: 'center', textAlign: 'center', top: 5}}
                    underlayColor='transparent'
                    onChange={(checked) => this.setState({checked: checked})}
                />
                <TouchableHighlight style={styles.button}
                                    underlayColor='#d37878'
                                    onPress={() => this.doRegister() }>
                    <Text style={styles.buttonText}>Đăng ký</Text>
                </TouchableHighlight>
                <View style={{flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', marginTop: 20}}>
                    <Text style={{fontSize: 18}}>Bạn đã có tài khoản?</Text>
                    <TouchableHighlight style={{marginLeft: 5}}
                                        underlayColor='transparent'
                                        onPress={() => this.doLogin()}>
                        <Text style={{color: '#c64e4f', fontSize: 18}}>Đăng nhập</Text>
                    </TouchableHighlight>
                </View>
                <Text style={{color: '#c64e4f', marginTop: 10}}>{this.state.strError}</Text>
                <View style={styles.copyright}>
                    <Text style={styles.copyrightText}>
                        Copyright © 2014-2016 VIET TECHNOLOGY AND SOFTWARE DEVELOPMENT JSC
                    </Text>
                </View>
            </View>
        );
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
    copyright: {
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyrightText: {
        fontSize: 8
    },
    logo: {
        width: 200,
        height: 83,
        marginTop: 50,
        marginBottom: 30
    },
    input: {
        height: 50,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 8,
        paddingLeft: 10
    },
    checkbox: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#6d6b6b',
        marginTop: 10
    },
    button: {
        height: 40,
        backgroundColor: '#c64e4f',
        borderRadius: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    modalbox: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 20
    },
    button1: {
        height: 36,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#c64e4f',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10
    },
});

module.exports = Register;