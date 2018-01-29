import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, Button} from 'react-native';

import {TabNavigator} from 'react-navigation';

var ListVehicle = require('./ListVehicle');
var MapVehicle = require('./MapVehicle');

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});

const OnlineView = TabNavigator({
    ListView: {
        screen: ListVehicle,
    },
    MapView: {
        screen: MapVehicle,
    },
}, {
    tabBarOptions: {
        showIcon: false,
        activeTintColor:  '#c20b3b',
        inactiveTintColor:'#2b2b2b',
        labelStyle: {
            fontSize: 15,
            fontWeight:'bold'
        },
        style: {
            backgroundColor: 'lightgrey',
        },
    },
    tabBarPosition: 'bottom',
});

module.exports = OnlineView;