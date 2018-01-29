import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import MapView from 'react-native-maps';
var DetailWindow = require('../component/DetailWindow');
var AppUtil = require('../common/AppUtil');
class MapVehicle extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        tabBarLabel: 'BẢN ĐỒ',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../assets/flag.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle}
                         ref={ref => {
                             this.props.screenProps.map = ref;
                         }}
                         initialRegion={{
                             latitude: 20.9718999,
                             longitude: 105.8368575,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}
                         showsMyLocationButton={true}
                         zoomEnabled={true}
                >
                    {this.props.screenProps.list_online_view_map.map(vehicle =>
                        <MapView.Marker
                            style={styles.marker}
                            key={vehicle.marker.vehicle}
                            coordinate={vehicle.marker.latLng}
                            identifier={vehicle.marker.vehicle}
                            anchor={{
                                x: 0.5,
                                y: 0.5
                            }}
                            onPress={e => this.handerOnPressMarker(vehicle)}
                        >
                            <Image style={this.getIconRotation(vehicle.marker.angle)}
                                   source={this.getIcon(vehicle.trang_thai_xe)}
                            />
                            <View style={styles.markerLabel}>
                                <Text style={styles.textLabel}>{vehicle.marker.description}</Text>
                            </View>
                        </MapView.Marker>
                    )}
                </MapView>
                <View style={styles.detailStyle}>
                    <View style={styles.addressContainer}>
                        <Text style={styles.textAddress}
                              numberOfLines={2}>{this.props.screenProps.onlineDetail.address}</Text>
                    </View>
                    <View style={styles.statusContainer}>
                        <View style={styles.timeContainer}>
                            <Image style={styles.iconStatus}
                                   source={require('../assets/time16.png')}
                            />
                            <Text style={styles.labelValue}>
                                {AppUtil.dateFormat(this.props.screenProps.onlineDetail.time)}
                            </Text>
                        </View>
                        <View style={styles.speedContainer}>
                            <Image style={styles.iconStatus}
                                   source={require('../assets/speed16.png')}
                            />
                            <Text style={styles.labelValue}>
                                {this.props.screenProps.onlineDetail.van_toc + ' km/h'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    handerOnPressMarker(vehicle) {
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
        this.props.screenProps.onSelectedVehicle();
    }

    getIconRotation(angle) {
        let angleDeg = angle + ' rad';
        return {
            width: 30,
            height: 30,
            transform: [{rotate: angleDeg}]
        }
    }

    getIcon(state) {
        let icon;
        switch (state) {
            case 'MAT_TIN_HIEU':
                icon = require('../assets/vehicle/car_lost_gsm_32.png');
                break;
            case 'DI_CHUYEN':
                icon = require('../assets/vehicle/car_running_32.png');
                break;
            case 'DUNG_TAT_MAY':
                icon = require('../assets/vehicle/car_stop_32.png');
                break;
            case 'DUNG_BAT_MAY':
                icon = require('../assets/vehicle/car_pause_32.png');
                break;
            case 'VUOT_TOC':
                icon = require('../assets/vehicle/car_over_speed_32.png');
                break;
            default:
                icon = require('../assets/vehicle/car_lost_gsm_32.png');
                break;
        }
        return icon;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        flexDirection: 'column',
        zIndex: 1
    },
    marker: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
    },

    itemContainer: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'brown',
        height: 50,
        backgroundColor: 'white',
        margin: 5,
    },
    textLabel: {},
    markerLabel: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#2b4570',
        paddingRight: 2,
        marginLeft: -7,
        height: 20,
        transform: [{rotate: '1 deg'}]

    },
    mapStyle: {
        flex: 1,
    },
    detailStyle: {
        zIndex: 3,
        height: 60,
        backgroundColor: '#030302',
        position: 'absolute',
        bottom: 2,
        left: 2,
        right: 2,
        opacity: 0.5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        shadowColor: '#97C1DA',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        flexDirection: 'column',
        paddingTop:3,
    },
    textAddress: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '200',
        textAlign: 'left',
        flexWrap: "wrap"
    },
    addressContainer: {
        paddingLeft: 10,
        flex: 2,
    },
    statusContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 1,
        marginLeft: 10
    },
    speedContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 1,
        marginLeft: 10
    },
    labelValue: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '200',
        textAlignVertical: 'center',
        marginLeft: 3,
    },
    iconStatus: {
        width: 16,
        height: 16,
        marginBottom: 0
    }
});

module.exports = MapVehicle;