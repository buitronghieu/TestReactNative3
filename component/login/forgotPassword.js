'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Alert,
	View,
	Text,
	Image,
	TextInput,
	TouchableHighlight,
	BackAndroid,
	Modal
} from 'react-native';
import { NavigationActions} from 'react-navigation';
var commonStyles = require('../../common/common_style');
var ConfigUtil = require('../../common/ConfigUtil');

class ForgotPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: null,
			label: null,
			modalVisible: false,
			status: false

		}
	}

	doBack(){
        this.props.navigation.dispatch(NavigationActions.back());
	}

	doSentMessage(){
		try{
					fetch(ConfigUtil.VITY_PORTAL + '/rest/vityportal/app_authen', {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							method: 'm_reset_password',
							params : {
								authen: this.state.username
							}
						})	
						}).then((response) => {
						if(response.status == 200) {
							response.json()}
					}).then((responseData) => {
							if(responseData.status == true){
								this.setState({
									modalVisible: true,
									label: responseData.message,
									status: true

								})
							}else{
								this.setState({
									modalVisible: true,
									label: "Tài khoản không hợp lệ!"
								})
							}
								

						}).done();
			}catch(error){
				console.log(error)
			}
	}

	render(){
		return(
			<View style={styles.layout}>
			<Image source={require('../../Resources/logo.png')} style={styles.logo} />
			<TextInput style={styles.input}
			underlineColorAndroid='transparent'
			onChangeText={(value) => this.setState({username:value})}
			placeholder={'Email / Số điện thoại'}
			placeholderTextColor='#c6c6c6'/>
			<View style={{flexDirection:'row', margin: 10}}>
			<TouchableHighlight style={styles.button}
			underlayColor='transparent'
			onPress={() => this.doBack()}>
			<Text style={styles.buttonText}>Quay lại</Text>
			</TouchableHighlight>
			<TouchableHighlight style={styles.button}
			underlayColor='transparent'
			onPress={() => this.doSentMessage()}>
			<Text style={styles.buttonText}>Gửi yêu cầu</Text>
			</TouchableHighlight>
			</View>
			<View style={styles.copyright}>
			<Text style={styles.copyrightText}>
			Copyright © 2014-2016 VIET TECHNOLOGY AND SOFTWARE DEVELOPMENT JSC
			</Text>
			</View>
			<Modal transparent={true} position={"center"} 
			visible={this.state.modalVisible}
			animationType={"slide"}
			onRequestClose={() => {alert("Modal has been closed.")}}>
			<View style={commonStyles.modalbox}>
			<View style={commonStyles.innerContainer}>
			<Text style={commonStyles.modalTitle}>{this.state.label}</Text>
			<View style={{flexDirection:'row'}}>
			<TouchableHighlight
			style={commonStyles.button}
			onPress={() => {
				this.setState({
					modalVisible: false
				})
				if(this.state.status == true){
                    this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Login'}));

				}
			}}>
			<Text style={commonStyles.buttonText}>Đồng ý</Text>
			</TouchableHighlight>
			</View>
			</View>
			</View>
			</Modal>
			</View>
			);
	}
}

var styles = StyleSheet.create({
	layout : {
		flex:1,
		alignSelf:'stretch',
		backgroundColor:'#ffffff',
		alignItems:'center',
		paddingLeft:20,
		paddingRight:20
	},
	copyright : {
		position:'absolute',
		bottom:10,
		justifyContent:'center',
		alignItems:'center',
	},
	copyrightText : {
		fontSize:8
	},
	logo : {
		width:200,
		height:83,
		marginTop:50,
		marginBottom:30
	},
	input : {
		height:36,
		alignSelf:'stretch',
		backgroundColor:'transparent',
		borderWidth:0.5,
		borderColor:'#c6c6c6',
		borderRadius:8,
		paddingLeft:5,
		paddingRight:5
	},
	checkbox : {
		borderRadius:5,
		borderWidth:1,
		borderColor:'#6d6b6b',
		marginTop:10
	},
	button : {
		flex:1,
		height: 40,
		backgroundColor:'#c64e4f',
		borderRadius:10,
		alignSelf:'stretch',
		justifyContent:'center',
		alignItems:'center',
		marginLeft: 5,
		marginRight: 5
	},
	buttonText : {
		color:'#ffffff',
		fontSize:18,
	}
});

module.exports = ForgotPassword;