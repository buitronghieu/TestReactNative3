/**
 * Created by HungDang on 8/30/2017.
 */
'use strict';
import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
const MainScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c20b3b',
        // backgroundColor:'lightgrey',
    },
    header: {
        marginTop: (Platform.OS === 'ios') ? 20 : 30,
        height: 42,
        borderWidth: 1,
        borderColor: '#c20b3b',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 2,
        backgroundColor: 'white',
        paddingLeft: 5,
        // paddingTop:3
    },
    button: {
        // justifyContent: 'center',
        marginRight: 10,
        marginTop:4
    },
    iconfunction: {
        width: 24,
        height: 24,
    },
    iconmenu:{
        width:32,
        height:32,
    }

});
module.exports = MainScreenStyle;