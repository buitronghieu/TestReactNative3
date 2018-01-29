/**
 * Created by HungDang on 8/28/2017.
 */
import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, Slider, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
var DetailWindow = require('../component/DetailWindow');
var GoogleServices = require('../common/GoogleUtil');
class MapViewHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_control: 0,
            run_history: {
                run_speed: 50,
                point_current: 0,
                marker: {
                    visiable: false,
                    latLng: {
                        latitude: 0,
                        longitude: 0,
                    },
                    angle: 0,
                },
                paths: []
            }
        };
    }

    componentDidMount() {

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
                         initialRegion={
                             {
                                 latitude: 20.9718999,
                                 longitude: 105.8368575,
                                 latitudeDelta: 0.0922,
                                 longitudeDelta: 0.0421,
                             }
                         }
                         showsMyLocationButton={true}
                         zoomEnabled={true}
                >

                    <MapView.Marker
                        key={this.state.run_history.point_current}
                        coordinate={this.state.run_history.marker.latLng}
                        identifier={this.state.run_history.point_current + ''}
                        anchor={{
                            x: 0.5,
                            y: 0.5
                        }}
                    >
                        <Image source={require('../assets/vehicle/car_running_32.png')}
                               style={this.getIconRotation(this.state.run_history.marker.angle)}/>
                    </MapView.Marker>

                    {
                        this.props.screenProps.point_history.map((msg, index) =>
                            <MapView.Marker
                                style={{width: 24, height: 24}}
                                key={index}
                                coordinate={{
                                    latitude: msg.latitude,
                                    longitude: msg.longitude
                                }}
                                anchor={{
                                    x: 0.5,
                                    y: 0.5
                                }}
                                identifier={index + ''}
                                // onPress={e => this.handerOnPressMarker(e.nativeEvent)}
                            >
                                <Image
                                    source={msg.type_msg === 'STOP' ? require('../assets/pointstop16.png') : require('../assets/pointdriving16.png')}/>
                            </MapView.Marker>
                        )
                    }

                    <MapView.Polyline
                        coordinates={this.state.run_history.paths}
                        strokeWidth={3}
                        strokeColor='#1011DA'
                    >

                    </MapView.Polyline>


                </MapView>
                <View style={styles.controlStyle}>
                    <View style={styles.controlSpeed}>
                        <Slider
                            maximumValue={100}
                            minimumValue={0}
                            value={this.state.run_history.run_speed}
                            onValueChange={value => this.setState((state) => {
                                state.run_history.run_speed = value;
                                return state;
                            })}
                            onSlidingComplete={() => {
                                this._interval = setInterval(() => {
                                    this.runHistory();
                                }, Math.floor(1000 / (this.state.run_history.run_speed / 100)));
                            }}
                        />
                    </View>
                    <View style={styles.controlAction}>
                        <TouchableOpacity
                            style={styles.controlElement}
                            onPress={() => {
                                this.setState((preState) => {
                                    preState.selected_control = 1;
                                    return preState;
                                });
                                this.backControl();
                            }}>
                            <Image
                                source={this.state.selected_control === 1 ? require('../assets/previous1.png') : require('../assets/previous2.png')}
                                style={styles.iconControl}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.controlElement}
                            onPress={() => {
                                this.setState((preState) => {
                                    preState.selected_control = 2;
                                    return preState;
                                });
                                this.pauseControl();
                            }}>
                            <Image
                                source={this.state.selected_control === 2 ? require('../assets/pause1.png') : require('../assets/pause.png')}
                                style={styles.iconControl}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.controlElement}
                            onPress={() => {
                                this.setState((preState) => {
                                    preState.selected_control = 3;
                                    return preState;
                                });
                                this.playControl();
                            }}>
                            <Image
                                source={this.state.selected_control === 3 ? require('../assets/play1.png') : require('../assets/play.png')}
                                style={styles.iconControl}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.controlElement}
                            onPress={() => {
                                this.setState((preState) => {
                                    preState.selected_control = 4;
                                    return preState;
                                });
                                this.nextControl();
                            }}>
                            <Image
                                source={this.state.selected_control === 4 ? require('../assets/next2.png') : require('../assets/next1.png')}
                                style={styles.iconControl}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    getIconRotation(angle) {
        let angleDeg = angle + ' rad';
        return {
            width: 30,
            height: 30,
            transform: [{rotate: angleDeg}]
        }
    }

    backControl() {
        let indexCurrent = this.state.run_history.point_current;
        if (indexCurrent > 0) {
            this.setState((preState) => {
                preState.run_history.point_current--;
                return preState;
            });
            this.updateCurrentPosition();
        }
    }

    nextControl() {
        let indexCurrent = this.state.run_history.point_current;
        let size = this.props.screenProps.history_data.length;
        if (indexCurrent < size - 1) {
            this.setState((preState) => {
                preState.run_history.point_current++;
                return preState;
            });
            this.updateCurrentPosition();
        }
    }

    pauseControl() {
        clearInterval(this._interval);
    }

    playControl() {
        this.props.screenProps.point_history = [];
        let size = this.props.screenProps.history_data.length;
        let indexCurrent = this.state.run_history.point_current;
        if (indexCurrent > size) {
            this.setState((preState) => {
                preState.run_history.point_current = 0;
                return preState;
            });
        }
        this.updateCurrentPosition();
        this._interval = setInterval(() => {
            this.runHistory();
        }, Math.floor(5000 / (this.state.run_history.run_speed / 100)));
    }

    updateCurrentPosition() {
        let pointIndex = this.state.run_history.point_current;
        let point = this.props.screenProps.history_data[pointIndex];
        this.setState((preState) => {
            preState.run_history.marker.latLng = {
                latitude: point.latitude,
                longitude: point.longitude,
            };
            preState.run_history.marker.angle = point.type_msg === 'STOP' ? 0.0 : point.angle;
            return preState;
        });
        let region = {
            latitude: point.latitude,
            longitude: point.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        if(this.props.screenProps.map !== null){
            this.props.screenProps.map.animateToRegion(region, 0);
        }
    }

    runHistory() {
        let indexCurrent = this.state.run_history.point_current;
        let size = this.props.screenProps.history_data.length;
        if (indexCurrent < size - 1) {
            indexCurrent++;
            let point = this.props.screenProps.history_data[indexCurrent];
            let latLng = {
                latitude: point.latitude,
                longitude: point.longitude,
            };
            let latLngs = this.state.run_history.paths.map((itempath) => {
                return itempath
            });
            latLngs.push(latLng);
            this.setState((state) => {
                state.run_history.point_current = indexCurrent;
                state.run_history.marker.latLng = latLng;
                state.run_history.paths = latLngs;
                state.run_history.point_current = indexCurrent;
                return state;
            });
            this.updateCurrentPosition();
        } else {
            this.pauseControl();
        }
    }
    componentWillUnmount() {
        clearInterval(this._interval);
    }
    handerOnPressMarker(event) {
        // this.props.screenProps.onlineDetail.address = '';
        // GoogleServices.getGeoCoder().getFromLatLng(event.coordinate.latitude, event.coordinate.longitude).then((json) => {
        //     this.props.screenProps.onlineDetail.id_xe = event.id;
        //     this.props.screenProps.onlineDetail.address = json.results[0].formatted_address;
        // })
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        zIndex: 1
    },
    marker: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
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
        borderColor: 'gray',
        paddingRight: 2,
        marginLeft: -7,
        // borderStyle: 'dashed',
        height: 20,
        transform: [{rotate: '1 deg'}]

    },
    controlStyle: {
        zIndex: 3,
        height: 80,
        backgroundColor: '#dadada',
        position: 'absolute',
        bottom: 1,
        left: 2,
        right: 2,
        opacity: 0.8,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        shadowColor: '#97C1DA',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        flexDirection: 'column',
    },
    mapStyle: {
        flex: 1,
    },
    controlElement: {
        marginLeft: 10,
    },
    iconControl: {
        height: 32,
        width: 32,
    },
    controlSpeed: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10
    },
    controlAction: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        paddingTop: 3,
        paddingBottom: 2
    },
});

module.exports = MapViewHistory;