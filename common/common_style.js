'use strict';
import {
	StyleSheet,
	Dimensions
} from 'react-native';

export const commonStyles = StyleSheet.create({
	navbar : {
		height:60,
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#c64e4f'
	},
	text:{
		flex: 1,
		fontSize:18,
		color:'#ffffff',
		textAlign: 'center',
	},
	layout : {
		flex:1,
		backgroundColor:'#ffffff'
	},
	layoutModal:{
		flex:1,
		flexDirection:'row',
		alignItems:'center',
	},
	button : {
		flex:1,
		height: 40,
		backgroundColor:'#c64e4f',
		borderRadius:10,
		alignSelf:'stretch',
		justifyContent:'center',
		alignItems:'center',
		// backgroundColor:'#d3bfc6',
		margin: 5
	},
	buttonText : {
		color: 'white',
		fontWeight:'bold',
		fontSize:16
	},
	copyright : {
		flex:1,
		alignSelf:'stretch',
		position:'absolute',
		left:0,
		bottom:10,
		justifyContent:'center',
		alignItems:'center',
	},
	copyrightText : {
		fontSize:9
	},
	modalbox : {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	innerContainer:{
		borderRadius: 10,
		backgroundColor: '#fff', 
		padding: 20
	},
});
module.exports = commonStyles;
