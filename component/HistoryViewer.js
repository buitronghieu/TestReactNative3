/**
 * Created by HungDang on 8/28/2017.
 */
import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, Button} from 'react-native';

import {TabNavigator} from 'react-navigation';

var ListViewHistory = require('./ListViewHistory');
var MapViewHistory = require('./MapViewHistory');
var GenaralHistory= require('./GenaralHistory');

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});

const HistoryViewer = TabNavigator({
    ListView: {
        screen: ListViewHistory,
    },
    MapView: {
        screen: MapViewHistory,
    },
    Genaral:{
        screen:GenaralHistory
    }
}, {
    tabBarOptions: {
        showIcon: false,
        activeTintColor:  '#600202',
        inactiveTintColor:'#2b2b2b',
        labelStyle: {
            fontSize: 15,
            fontWeight:'bold'
        },
        style: {
            backgroundColor: '#808080',
        },
    },
    tabBarPosition: 'bottom',
});

module.exports = HistoryViewer;
