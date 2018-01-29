'user strict'
import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View, Text, AsyncStorage, StatusBar} from 'react-native';
let VehicleSearch = require('./VehicleSearch');
let VehicleSummary = require('./VehicleSummary');
let VehicleStatusFilter = require('./VehicleStatusFilter');
let OnlineViewer = require('./OnlineViewer');
let ConfigUtil = require('../common/ConfigUtil');
let mainStyle = require('../common/MainScreenStyle');
let GoogleServices = require('../common/GoogleUtil');
let AppUtil = require('../common/AppUtil');
class OnlineScreen extends React.Component {
    componentWillMount() {
        this.state.isView = true;
    }

    componentDidMount() {
        this.updateVehicleOnline();
        this.timerUpdate = setInterval(() => {
            this.updateVehicleOnline();
        }, 10000);

    }

    componentWillUnmount() {
        this.state.isView = false;
        clearInterval(this.timerUpdate);
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        drawerLabel: 'Trang chủ',
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('../assets/trangchu.png')}
                style={[mainStyle.iconfunction, {tintColor: tintColor}]}
            />
        ),
    });


    toggle() {
        this.props.navigation.navigate('DrawerOpen');
    }


    changeVehicleStatusFilter(vehicleStatus) {
        this.setState(state => {
            state.vehicleStatus = vehicleStatus;
            return state;
        });
        this.setState((state) => {
            state.onlineDetail = {
                id_xe: 0,
                bien_so_xe: '',
                address: '',
                time: 0,
                current_location: {
                    latitude: 0,
                    longitude: 0,
                },
                trang_thai: '',
                van_toc: 0
            };
            return state;
        });
        this.refreshSearch();
        this.updateVehicleOnline();
    }

    constructor(props) {
        super(props);
        this.state = {
            vehicleStatus: 'TAT_CA',

            total_by_status: {
                TAT_CA: 0,
                DUNG_BAT_MAY: 0,
                DUNG_TAT_MAY: 0,
                DI_CHUYEN: 0,
                VUOT_TOC: 0,
                MAT_TIN_HIEU: 0,
                QUA_GIO_CHAY: 0,
            },
            list_online_render: [],
            list_online_view_map: [],
            render_size: 20,
            total_size: 0,
            onlineDatas: [],
            onLoadMore: this.handleLoadMore.bind(this),

            onSelectedVehicle: this.onSelectedVehicle.bind(this),
            is_loaded: false,
            isView: true,
            vehicleSearch: '',
            onlineDetail: {
                id_xe: 0,
                bien_so_xe: '',
                address: '',
                time: 0,
                current_location: {
                    latitude: 0,
                    longitude: 0,
                },
                trang_thai: '',
                van_toc: 0
            },
        };
    }

    updateVehicleOnline() {
        if (!this.state.isView)
            return;
        AsyncStorage.getItem('terminal-token').then((tokenValue) => {
            if (tokenValue !== null) {
                fetch(ConfigUtil._getTrackingServerURL() + '/rest/terminal/rpc/' + tokenValue, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: "Tracking.Vehicle",
                        method: "getListVehicle",
                        params: [{
                            dtype: "String",
                            value: this.state.vehicleStatus,
                        }]
                    })
                }).then((response) => {
                    if (response.status === 200) {
                        return AppUtil.toJson(response);
                    }
                }).then((responseJson) => {
                        if (responseJson !== undefined && responseJson.status === 1) {
                            this.syncState(responseJson);
                        }
                    }
                )
                    .catch((error) => {
                        this.clearOnline();
                    });

            } else {
                this.clearOnline();
            }
        });
    }

    clearOnline() {
        this.setState(state => {
            state.is_loaded = false;
            state.onlineDatas = [];
            return state;
        });
    }

    syncState(responseJson) {
        let TAT_CA = responseJson.return.SUMMARY.TAT_CA;
        let DUNG_BAT_MAY = responseJson.return.SUMMARY.DUNG_BAT_MAY;
        let DUNG_TAT_MAY = responseJson.return.SUMMARY.DUNG_TAT_MAY;
        let DI_CHUYEN = responseJson.return.SUMMARY.DI_CHUYEN;
        let VUOT_TOC = responseJson.return.SUMMARY.VUOT_TOC;
        let MAT_TIN_HIEU = responseJson.return.SUMMARY.MAT_TIN_HIEU;
        let QUA_GIO_CHAY = responseJson.return.SUMMARY.QUA_GIO_CHAY;
        let points = [];
        let onlineDatas = responseJson.return.listOnline.map((online) => {
            let marker = {
                vehicle: online.id_xe + '',
                title: online.bien_so_xe,
                angle: online.angle,
                description: online.bien_so_xe,
                latLng: {
                    latitude: parseFloat(online.vi_do),
                    longitude: parseFloat(online.kinh_do),
                }
            };

            if (parseFloat(online.vi_do) > 0 && parseFloat(online.kinh_do) > 0) {
                points.push({
                    latitude: parseFloat(online.vi_do),
                    longitude: parseFloat(online.kinh_do)
                });
            }
            let vehicle = {
                id_xe: online.id_xe,
                bien_so_xe: online.bien_so_xe,
                thoi_diem: online.thoi_diem,
                trang_thai_xe: online.trang_thai_xe,
                van_toc: online.van_toc,
                marker: marker,
            };
            if (vehicle.id_xe === this.state.onlineDetail.id_xe) {
                this.setState((state) => {
                    state.onlineDetail.current_location = {
                        latitude: marker.latLng.latitude,
                        longitude: marker.latLng.longitude,
                    };
                    state.onlineDetail.time = vehicle.thoi_diem;
                    state.onlineDetail.van_toc = vehicle.van_toc;
                    return state;
                });
                GoogleServices.getGeoCoder().getFromLatLng(vehicle.marker.latLng.latitude, vehicle.marker.latLng.longitude).then((json) => {
                    this.state.onlineDetail.address = json.results[0].formatted_address;
                }).catch(e => {
                    this.state.onlineDetail.address = 'Không xác định';
                })
            }
            return vehicle;
        });
        this.setState((state) => {
            state.is_loaded = true;
            state.render_size = 20;
            state.total_by_status = {
                TAT_CA: TAT_CA,
                QUA_GIO_CHAY: QUA_GIO_CHAY,
                MAT_TIN_HIEU: MAT_TIN_HIEU,
                VUOT_TOC: VUOT_TOC,
                DI_CHUYEN: DI_CHUYEN,
                DUNG_TAT_MAY: DUNG_TAT_MAY,
                DUNG_BAT_MAY: DUNG_BAT_MAY,
            };
            state.total_size = onlineDatas.length;
            state.onlineDatas = onlineDatas;
            return state;
        });
        if (this.state.map !== null) {
            if (this.state.onlineDetail.id_xe > 0) {
                let region = {
                    latitude: this.state.onlineDetail.current_location.latitude,
                    longitude: this.state.onlineDetail.current_location.longitude,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0221,
                };
                this.state.map.animateToRegion(region, 0);
            } else if (points.length > 0) {
                this.state.map.fitToCoordinates(points, {
                    edgePadding: {
                        top: 100,
                        right: 80,
                        bottom: 100,
                        left: 80
                    },
                    animated: true
                });
            }
        }
        this.refreshListOnline();
        this.filterMakerOnMap();
    }

    onSelectedVehicle() {
        if (this.searchComponent !== null) {
            this.searchComponent.setValue(this.state.onlineDetail.bien_so_xe);
            this.searchComponent.focusComponent();
        }
    }

    refreshSearch() {
        if (this.searchComponent !== null) {
            this.searchComponent.cancelSearch();
        }
    }

    handleLoadMore() {
        if (!this.state.is_loaded)
            return;
        this.state.render_size += 20;
        let count = 0;
        let onlineDatas = this.state.onlineDatas;
        let online_render = [];
        for (let index in onlineDatas) {
            let onlineData = onlineDatas[index];
            if (count <= this.state.render_size) {
                if (this.checkOnlineDataSearch(onlineData)) {
                    online_render.push(onlineData);
                    count++;
                }
            } else {
                break;
            }
        }
        let loader = true;
        if (this.state.render_size >= this.state.total_size)
            loader = false;
        this.setState((state) => {
            state.list_online_render = online_render;
            state.is_loaded = loader;
            return state;
        });

    }

    refreshListOnline() {
        let count = 0;
        let onlineDatas = this.state.onlineDatas;
        let online_render = [];
        for (let index in onlineDatas) {
            let onlineData = onlineDatas[index];
            if (count <= this.state.render_size) {
                if (this.checkOnlineDataSearch(onlineData)) {
                    online_render.push(onlineData);
                    count++;
                }
            } else {
                break;
            }
        }
        this.setState((state) => {
            state.list_online_render = online_render;
            return state;
        });
    }

    checkOnlineDataSearch(onlineData) {
        let res = false;
        let bien_kiem_soat = (onlineData.bien_so_xe.toLocaleLowerCase()).replace('-', '').replace('.', '');
        let strSearch = this.state.vehicleSearch.toLocaleLowerCase().replace('-', '').replace('.', '');
        if (strSearch === '' || bien_kiem_soat.indexOf(strSearch) >= 0) {
            res = true;
        }
        return res;
    }

    onCancelSearch() {
        this.setState((state) => {
            state.vehicleSearch = '';
            state.is_loaded = true;
            state.render_size = 20;
            return state;
        });
        this.refreshListOnline();
    }

    onChangeText(text) {
        this.setState((state) => {
            state.vehicleSearch = text;
            state.is_loaded = true;
            state.render_size = 20;
            return state;
        });
        this.refreshListOnline();
        this.filterMakerOnMap();


    }

    filterMakerOnMap() {
        let lst_markers = this.state.onlineDatas.filter((online) => {
            return this.checkOnlineDataSearch(online);
        })
        this.setState((state) => {
            state.list_online_view_map = lst_markers;
            return state;
        });
    }

    onDeleteSearch() {
        this.setState((state) => {
            state.vehicleSearch = '';
            state.is_loaded = true;
            state.render_size = 20;
            return state;
        });
        this.refreshListOnline();
    }

    onFocusSearch() {
        this.props.navigation.navigate('ListView');
        if (this.state.tabView !== null) {
            this.state.tabView.navigate('ListView');
        }
    }

    render() {
        return (
            <View style={mainStyle.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View style={mainStyle.header}>
                    <TouchableOpacity style={mainStyle.button} onPress={() => this.toggle()}>
                        <Image
                            source={require('../assets/menuRed.png')} style={mainStyle.iconmenu}/>
                    </TouchableOpacity>
                    <VehicleSearch searchListener={this}/>
                </View>
                <VehicleStatusFilter onChangeVehicleStatusFilter={(value) => this.changeVehicleStatusFilter(value)}
                                     total_by_status={this.state.total_by_status}/>
                <View style={styles.spliter}/>
                <OnlineViewer screenProps={this.state}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    spliter: {
        height: 10,
        backgroundColor: '#c20b3b',
    }
});

module.exports = OnlineScreen;