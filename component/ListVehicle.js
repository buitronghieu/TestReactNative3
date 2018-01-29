import React from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
var AppUtil = require('../common/AppUtil');

class ListVehicle extends React.Component {
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
        this.state = {loading: false};
        this.props.screenProps.tabView = this.props.navigation;
    };

    componentWillReceiveProps(nextProps) {

    };

    onEndReached(info) {
        this.setState((preState) => {
            let nextState = preState;
            nextState.loading = this.props.screenProps.is_loaded;
            return nextState;
        });
        this.props.screenProps.onLoadMore();
    }

    renderFooter = () => {
        if (!this.state.loading) return null;

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

        return (
            <View style={styles.itemList}>
                <View style={styles.itemIconVehicle}>
                    <Image
                        source={AppUtil.getStateIcon(item.trang_thai_xe)}
                        style={styles.imageBienso}/>
                </View>
                <View style={styles.itemDetail}>
                    <View style={styles.itemInfo}>
                        <Text style={styles.labelBienSo}>{item.bien_so_xe}</Text>
                    </View>
                    <View style={styles.itemInfoDetail}>
                        <View style={{flex: 2, flexDirection: 'row'}}>
                            <Text style={styles.labelTitle}>V.GPS: </Text>
                            <Text style={styles.labelValue}>{item.van_toc}</Text>
                        </View>
                        <View style={{flex: 3, flexDirection: 'row'}}>
                            <Text style={styles.labelTitle}>Thời điểm: </Text>
                            <Text style={styles.labelValue}>{AppUtil.dateFormat(item.thoi_diem)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.itemIcon}>
                    <TouchableOpacity onPress={() => this.selectedVehicle(item)}>
                        <Image
                            source={require('../assets/vehicle/vehicleroute.png')}
                            style={this.getRouterStyle(item.marker.angle)}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    selectedVehicle(vehicle) {
        this.props.screenProps.onlineDetail = {
            id_xe: vehicle.id_xe,
            bien_so_xe: vehicle.bien_so_xe,
            address: '',
            time: vehicle.thoi_diem,
            current_location: {
                latitude: vehicle.marker.latLng.latitude,
                longitude: vehicle.marker.latLng.longitude,
            },
            trang_thai: vehicle.trang_thai_xe,
            van_toc: vehicle.van_toc,
        };
        let markers = [];
        markers.push(vehicle.id_xe + '');
        if (this.props.screenProps.map != null) {
            let region = {
                latitude: vehicle.marker.latLng.latitude,
                longitude: vehicle.marker.latLng.longitude,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0221,
            }
            this.props.screenProps.map.animateToRegion(region, 0);
            this.props.navigation.navigate('MapView');
        }
        this.props.screenProps.onSelectedVehicle();
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <FlatList
                    data={this.props.screenProps.list_online_render}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={(item, index) => item.id_xe}
                    onEndReached={(info) => {
                        this.onEndReached(info)
                    }}
                    ListFooterComponent={this.renderFooter}
                />
            </View>
        );
    }

    getRouterStyle(angle) {
        let angleDeg = angle + ' rad';
        return {
            width: 30,
            height: 30,
            transform: [{rotate: angleDeg}]
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
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
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 5,
    },
    itemIcon: {
        width: 35,
        padding: 1,
        justifyContent: "center",
    },
    itemIconVehicle: {
        width: 35,
        paddingLeft: 10,
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
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'row'
    },
    imageBienso: {
        width: 24,
        height: 24,
    },
    labelBienSo: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
        textAlign: 'center',
        color: '#2b2b2b',
    },
    labelTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlignVertical: 'bottom'
    },
    labelValue: {
        fontSize: 14,
        marginLeft: 5,
        textAlignVertical: 'bottom'

    },
});

module.exports = ListVehicle;