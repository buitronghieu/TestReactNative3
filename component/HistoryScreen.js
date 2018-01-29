import React from 'react';
import {Image, TouchableOpacity, TouchableHighlight, StyleSheet, View, Text, AsyncStorage, Alert,StatusBar} from 'react-native';
import AtoZListView from 'react-native-atoz-listview';
let HistoryViewer = require('./HistoryViewer');
let VehicleSearch = require('./VehicleSearch');
let HistoryInput = require('./HistoryInput');
let mainStyle = require('../common/MainScreenStyle');
let ConfigUtil = require('../common/ConfigUtil');
let AppUtil = require('../common/AppUtil');
class HistoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: {
                id_xe: 0,
                bien_kiem_soat: '',
                id_thiet_bi: 0,
            },
            vehicles: [],
            thong_tin_tong_hop: {
                so_dong: 0,
                van_toc_trung_binh: 0,
                v_min: 0,
                v_max: 0,
                quang_duong: 0,
                thoi_gian_hoat_dong: 0,
                thoi_gian_dung_do: 0,
                so_lan_dung: 0,
                so_lan_vuot_toc: 0,
                qua_thoi_gian: 0
            },
            history_data: [],
            point_history: [],
            selected_location: {
                latLng: {
                    latitude: 0.0,
                    longitude: 0.0,
                },
                angle: 0.0
            },
            isLoading: false,
            search: {
                isSearching: false,
                searchValue: '',
                vehicleFilter: [],
            },

        }
    }

    refreshUI() {
        if (this.state.tabView !== null) {
            this.state.tabView.navigate('ListView');
        }
        this.setState((preState) => {
            let nextState = preState;
            nextState.history_data = [];
            nextState.selected_location = {
                latlng: {
                    latitude: 0.0,
                    longitude: 0.0,
                },
                angle: 0.0,
            };
            nextState.thong_tin_tong_hop = {
                so_dong: 0,
                van_toc_trung_binh: 0,
                v_min: 0,
                v_max: 0,
                quang_duong: 0,
                thoi_gian_hoat_dong: 0,
                thoi_gian_dung_do: 0,
                so_lan_dung: 0,
                so_lan_vuot_toc: 0,
                qua_thoi_gian: 0
            };
            return nextState;
        });
    }

    showHistory(beginTime, endTime) {
        this.refreshUI();
        if (this.checkUserInput(beginTime, endTime)) {
            this.setState((state) => {
                state.isLoading = true;
                return state;
            });
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
                            method: "getHistory",
                            params: [{
                                dtype: "Integer",
                                value: this.state.vehicle.id_thiet_bi,
                            }, {
                                dtype: "Long",
                                value: beginTime,
                            }, {
                                dtype: "Long",
                                value: endTime,
                            }]
                        })
                    }).then((response) => {
                        if (response.status === 200) {
                            return AppUtil.toJson(response);
                        }
                    }).then((responseJson) => {
                                if (responseJson.status === 1) {
                                    this.generalHistory(responseJson.return);
                                    this.generalDetail(responseJson.return);
                                    this.setState((prestate) => {
                                        prestate.history_data = responseJson.return;
                                        if (prestate.history_data.length > 0) {
                                            let firstLocation = prestate.history_data[0];
                                            prestate.selected_location = {
                                                latlng: {
                                                    latitude: firstLocation.latitude,
                                                    longitude: firstLocation.longitude
                                                },
                                                angle: 0.0
                                            }
                                        }
                                        prestate.isLoading = false;
                                        return prestate;
                                    });
                                }
                                this.state.isLoading = false;
                            }
                        )
                        .catch((error) => {
                            this.state.isLoading = false;
                            console.error(error);
                        });

                } else {
                    this.state.isLoading = false;
                    this.state.onlineDatas = [];
                }
            });
        }
    }

    checkUserInput(beginTime, endTime) {
        let res = true;
        let checkResult = '';
        if (this.state.vehicle.id_thiet_bi === 0) {
            checkResult = 'Bạn chưa nhập xe';
        } else if (beginTime > endTime) {
            checkResult = 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc';
        } else if ((endTime - beginTime) > (2 * 24 * 60 * 60)) {
            checkResult = 'Khoảng thời gian xem không quá 2 ngày!';
        }
        if (checkResult !== '') {
            Alert.alert(
                'Thông báo!',
                checkResult,
                [
                    {text: 'OK'}
                ]
            );
            res = false;
        }
        return res;
    }

    onSearch(searchValue) {
        let vehicleFilter = this.state.vehicles.filter((vehicle) => {
            let res = false;
            let bien_kiem_soat = (vehicle.bien_kiem_soat.toLocaleLowerCase()).replace('-', '').replace('.', '');
            let strSearch = searchValue.toLocaleLowerCase().replace('-', '').replace('.', '');
            if (bien_kiem_soat.indexOf(strSearch) >= 0) {
                res = true;
            }
            return res;
        });
        this.setState((state) => {
            state.search = {
                isSearching: true,
                searchValue: searchValue,
                vehicleFilter: vehicleFilter,
            };
            return state;
        });
    }

    onChangeText(text) {

    }

    onCancelSearch() {
        this.setState((state) => {
            state.search = {
                isSearching: false,
                searchValue: '',
                vehicleFilter: []
            };
            return state;
        });
    }

    onDeleteSearch() {
        this.setState((state) => {
            state.vehicle = {
                id_xe: 0,
                bien_kiem_soat: '',
                id_thiet_bi: 0,
            };
            state.search.isSearching = true;
            return state;
        });

    }

    onFocusSearch() {
        this.onSearch('');
    }

    generalDetail(history) {
        let currentTime = -1;
        let points = [];
        let latlngs = [];
        history.forEach((point) => {
            if (point.type_msg === 'STOP') {
                points.push(point);
                latlngs.push({
                    latitude: point.latitude,
                    longitude: point.longitude
                })
            } else if (point.type_msg === 'DRIVING') {
                if (currentTime < 0) {
                    currentTime = point.time_log;
                }
                if (point.time_log - currentTime > (1 * 60 * 1000)) {
                    currentTime = point.time_log;
                    points.push(point);
                    latlngs.push({
                        latitude: point.latitude,
                        longitude: point.longitude
                    })
                }
            }
        });
        this.setState((preState) => {
            preState.point_history = points;
            return preState;
        });
        if (this.state.map !== null && latlngs.length > 0) {
            this.state.map.fitToCoordinates(latlngs, {
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

    generalHistory(history) {
        let so_dong = 0;
        let tong_van_toc = 0;
        let v_min = -1;
        let v_max = 0;
        let quang_duong = 0;
        let thoi_gian_hoat_dong = 0;
        let thoi_gian_dung_do = 0;
        let so_lan_dung = 0;
        let so_lan_vuot_toc = 0;
        let qua_thoi_gian = 0;
        so_dong = history.length;
        let previous_latitude = 0;
        let previous_longitude = 0;
        history.forEach((msg) => {
            let lati = msg.latitude;
            let longi = msg.longitude;
            if (previous_latitude ===0 || previous_longitude === 0){
                previous_latitude = lati;
                previous_longitude = longi;
            }else{
                if (lati > 0 && longi > 0){
                    let deltalDistence = AppUtil.distance(previous_longitude,previous_latitude,longi,lati);
                    quang_duong += deltalDistence;
                }else{
                    previous_latitude=0;
                    previous_longitude=0;
                }
            }
            if (msg.type_msg === 'STOP') {
                so_lan_dung++;
                thoi_gian_dung_do += msg.time_long;
            } else {
                let v = msg.gps_speed;
                tong_van_toc += v;
                if (v_min === -1) {
                    v_min = v;
                } else {
                    v_min = v_min > v ? v : v_min;
                }
                v_max = v_max < v ? v : v_max;
            }

        });
        let tong_thoi_gian = 0;
        if (so_dong > 1) {
            let beginPoint = history[0];
            let endPoint = history[so_dong - 1];
            let timebegin = beginPoint.type_msg === 'STOP' ? beginPoint.begin_time : beginPoint.time_log;
            let timeend = endPoint.type_msg === 'STOP' ? endPoint.begin_time : endPoint.time_log;
            tong_thoi_gian = timeend - timebegin;
        }
        thoi_gian_hoat_dong = tong_thoi_gian - thoi_gian_dung_do;
        let vtb = 0;
        if (so_dong > 0) {
            vtb = tong_van_toc / so_dong;
        }
        this.setState((preState) => {
            let nextState = preState;
            nextState.thong_tin_tong_hop = {
                so_dong: so_dong,
                van_toc_trung_binh: vtb.toFixed(2),
                v_min: v_min,
                v_max: v_max,
                quang_duong: (quang_duong/1000).toFixed(2),
                thoi_gian_hoat_dong: thoi_gian_hoat_dong,
                thoi_gian_dung_do: thoi_gian_dung_do,
                so_lan_dung: so_lan_dung,
                so_lan_vuot_toc: so_lan_vuot_toc,
                qua_thoi_gian: qua_thoi_gian,
            };
            return nextState;
        });

    }

    static navigationOptions = ({navigation, screenProps}) => ({
        drawerLabel: 'Lịch sử',
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('../assets/lichsu.png')}
                style={[mainStyle.iconfunction, {tintColor: tintColor}]}
            />
        ),
    });

    toggle() {
        this.props.navigation.navigate('DrawerOpen');
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
                <HistoryInput historyScreen={this}/>
                {this.renderComponentBody(this.state.search.isSearching)}
            </View>
        );
    }

    componentDidMount() {
        AsyncStorage.getItem('terminal-token').then((trackingToken) => {
            if (trackingToken !== null) {
                fetch(ConfigUtil._getTrackingServerURL() + '/rest/terminal/rpc/' + trackingToken, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: "Tracking.Vehicle",
                        method: "getVehicleForMobile",
                        params: []
                    })
                }).then((response) => {
                    if (response.status === 200) {
                        return AppUtil.toJson(response);
                    }
                })
                    .then((responseJson) => {
                            if (responseJson.status === 1) {
                                this.loadVehicle(responseJson.return);
                            }
                        }
                    )
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
    }

    loadVehicle(vehicles) {
        this.setState((state) => {
            state.vehicles = vehicles;
            state.vehicleFilter = vehicles;
            return state;
        });
    }

    renderComponentBody(isSearching) {
        if (isSearching) {
            return this.uiSearch();
        } else {
            return (<HistoryViewer screenProps={this.state}/>);
        }
    }

    uiSearch() {
        return (
            <View style={styles.searchContainer}>
                <AtoZListView
                    style={styles.listStyle}
                    data={this.state.search.vehicleFilter}     // required array|object
                    renderRow={this.renderSearchItem} // required func
                    rowHeight={40}      // required number
                    sectionHeaderHeight={40}   // required number
                />
            </View>
        );
    }

    renderSearchItem = (item, sectionId, index) => {
        return (
            <View style={styles.itemSearch}>
                <TouchableOpacity style={styles.touchableContainer}
                                  onPress={() => this.onSelectSearchItem(item)}
                >
                    <Image
                        source={require('../assets/vehicle.png')} style={styles.imageXe}/>
                    <Text style={styles.labelBienSo}>{item.bien_kiem_soat}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onSelectSearchItem(item) {
        this.setState((state) => {
            state.vehicle = {
                id_xe: item.id_xe,
                bien_kiem_soat: item.bien_kiem_soat,
                id_thiet_bi: item.id_thiet_bi,
            };
            state.search.isSearching = false;
            state.search.searchValue = '';
            return state;
        });
        if (this.searchComponent !== null) {
            this.searchComponent.setValue(item.bien_kiem_soat);
        }
    }
}
const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 3
    },
    touchableContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 2,
        paddingLeft: 10,
    },
    listStyle: {
        flex: 1,
    },
    itemSearch: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        // borderStyle: 'dotted',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#dadada',
        margin: 5,
        height: 30,
        justifyContent: 'flex-start'

    },
    labelBienSo: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 20,
        textAlignVertical: 'bottom',
        textAlign: 'center',
        color: '#2b2b2b',
        marginTop: 2
    },
    imageXe: {
        width: 16,
        height: 16,
        marginTop: 4
    },

});
module.exports = HistoryScreen;