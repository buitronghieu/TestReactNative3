import React from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity, ListItem} from 'react-native';
var AppUtil = require('../common/AppUtil');
var moment = require('moment');

class ListViewHistory extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'DANH SÁCH',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../assets/flag.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    constructor(props) {
        super(props);
        this.props.screenProps.tabView = this.props.navigation;
    };

    componentWillReceiveProps(nextProps) {

    };

    renderFooter = () => {
        if (!this.props.screenProps.isLoading)
            return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "white"
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    renderItem(item) {
        if (item.type_msg === 'STOP') {
            return this.renderStopItem(item);
        } else {
            return this.renderDrivingItem(item);
        }

    }

    renderStopItem(item) {
        return (

            <View style={styles.itemList}>
                <View style={styles.itemDetail}>
                    <View style={styles.itemInfo}>
                        <Text
                            style={styles.labelTime}>{AppUtil.dateFormatString(item.beginTime, 'dd/mm/yyyy HH:MM:ss')}</Text>
                    </View>
                    <View style={styles.itemInfoDetail}>
                        <View style={{flex: 2, flexDirection: 'row'}}>
                            <Text style={styles.labelTitle}>Thời gian dừng: </Text>
                            <Text style={styles.labelValue}>{AppUtil.timeStopString(item.time_long)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.itemStatus}>
                    <Text style={{fontWeight: 'bold', color: '#cd0f0a', textDecorationLine: 'underline'}}>Dừng</Text>
                </View>
            </View>
        );
    }

    renderDrivingItem(item) {
        return (

            <View style={styles.itemList}>
                <View style={styles.itemDetail}>
                    <View style={styles.itemInfo}>
                        <Text
                            style={styles.labelTime}>{AppUtil.dateFormatString(item.time_log, 'dd/mm/yyyy HH:MM:ss')}</Text>
                    </View>
                    <View style={styles.itemInfoDetail}>
                        <View style={{flex: 2, flexDirection: 'row'}}>
                            <Text style={styles.labelTitle}>Vận tốc: </Text>
                            <Text style={styles.labelValue}>{item.gps_speed + ' km/h'}</Text>
                        </View>
                        <View style={{flex: 3, flexDirection: 'row'}}>
                            <Text style={styles.labelTitle}>Quãng đường: </Text>
                            <Text style={styles.labelValue}>{item.path_total + ' km'}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.itemStatus}>
                    <Text style={{fontWeight: 'bold', color: '#11cd36', textDecorationLine: 'underline'}}
                          onPress={() => this.onShowDetail(item)}
                    >Chạy</Text>
                </View>
            </View>
        );
    }

    onShowDetail(item) {
        this.props.screenProps.selected_location.latLng = {
            latitude: item.latitude,
            longitude: item.longitude
        }
        let markers = [];
        markers.push(this.props.screenProps.vehicle.id_xe + '');
        if (this.props.screenProps.map != null) {
            this.props.screenProps.map.fitToSuppliedMarkers(markers, false);
            this.props.navigation.navigate('MapView');
        }
    }

    onEndReached(info) {

    }

    render() {
        if (this.props.screenProps.isLoading) {
            return (
                <View style={[this.props.style, styles.container]}>
                    <ActivityIndicator
                        style={styles.loadingStyle}
                        color='#0D0CCD'
                        animating={this.props.screenProps.isLoading}
                        size="large"
                    />
                </View>
            );
        } else {
            return (
                <View style={[this.props.style, styles.container]}>
                    <FlatList
                        data={this.props.screenProps.history_data}
                        renderItem={({item}) => this.renderItem(item)}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{
                                    justifyContent: 'center',
                                    flex: 1,
                                    paddingTop: 10
                                }}>
                                    <Text style={styles.labelEmpty}>No Data...</Text>
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => index}
                        onEndReached={(info) => {
                            this.onEndReached(info)
                        }}
                        ListFooterComponent={this.renderFooter}
                    >
                    </FlatList>
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
        justifyContent: 'center'
    },
    itemList: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        // borderStyle: 'dotted',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#dadada',
        margin: 5,
        padding: 2,
        shadowColor: '#2b2b2b',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    itemStatus: {
        width: 50,
        padding: 1,
        justifyContent: "center",
    },
    itemDetail: {
        flex: 7,
        paddingLeft: 2,
        paddingRight: 2,
    },
    itemInfo: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 2,
    },
    itemInfoDetail: {
        paddingLeft: 14,
        flex: 1,
        flexDirection: 'row'
    },

    labelTime: {
        fontSize: 18,
        marginLeft: 10,
        textAlign: 'center',
        color: '#2b2b2b',
        fontWeight: '500',
    },
    labelEmpty: {
        textAlign: 'center',
        color: '#0b0dcd',
        fontSize: 18,
    },
    labelTitle: {
        fontSize: 15,
        textAlignVertical: 'bottom'
    },
    labelValue: {
        fontSize: 14,
        marginLeft: 5,
        textAlignVertical: 'bottom',
        fontStyle: 'italic',


    },
    loadingStyle: {},
});

module.exports = ListViewHistory;