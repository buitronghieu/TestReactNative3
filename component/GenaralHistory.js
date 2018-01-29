/**
 * Created by HungDang on 8/28/2017.
 */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity,ScrollView} from 'react-native';
var AppUtil = require('../common/AppUtil');

class GenaralHistory extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'TỔNG HỢP',
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
    };

    componentWillReceiveProps(nextProps) {

    };


    renderItem(item) {
    }

    render() {
        return (
            <ScrollView style={[this.props.style, styles.container]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleTitle}>THÔNG TIN TỔNG HỢP</Text>
                </View>

                <View style={styles.rowStyle}>
                    <View style={styles.itemLabel}>
                        <Text style={styles.labelStyle}>Biển số xe: </Text>
                    </View>
                    <View style={styles.itemValue}>
                        <Text style={styles.valueStyle}>{this.props.screenProps.vehicle.bien_kiem_soat}</Text>
                    </View>
                </View>

                <View style={styles.rowStyle}>
                    <View style={styles.itemLabel}>
                        <Text style={styles.labelStyle}>Số dòng: </Text>
                    </View>
                    <View style={styles.itemValue}>
                        <Text style={styles.valueStyle}>{this.props.screenProps.thong_tin_tong_hop.so_dong + ' Dòng'}</Text>
                    </View>
                </View>

                <View style={styles.rowStyle}>
                    <View style={styles.itemLabel}>
                        <Text style={styles.labelStyle}>V.Trung bình: </Text>
                    </View>
                    <View style={styles.itemValue}>
                        <Text
                            style={styles.valueStyle}>{this.props.screenProps.thong_tin_tong_hop.van_toc_trung_binh + ' km/h'}</Text>
                    </View>
                </View>
                <View style={styles.rowStyle}>
                    <View style={styles.itemLabel}>
                        <Text style={styles.labelStyle}>V.Min: </Text>
                    </View>
                    <View style={styles.itemValue}>
                        <Text style={styles.valueStyle}>{this.props.screenProps.thong_tin_tong_hop.v_min + ' km/h'}</Text>
                    </View>
                </View>
                <View style={styles.rowStyle}>
                    <View style={styles.itemLabel}>
                        <Text style={styles.labelStyle}>V.Max: </Text>
                    </View>
                    <View style={styles.itemValue}>
                        <Text style={styles.valueStyle}>{this.props.screenProps.thong_tin_tong_hop.v_max + ' km/h'}</Text>
                    </View>
                </View>
                <View style={styles.rowStyle}>
                    <View style={styles.itemLabel}>
                        <Text style={styles.labelStyle}>Quãng đường: </Text>
                    </View>
                    <View style={styles.itemValue}>
                        <Text style={styles.valueStyle}>{this.props.screenProps.thong_tin_tong_hop.quang_duong + ' km'}</Text>
                    </View>
                </View>
                <View style={styles.splitterStyle}></View>

                <View style={styles.rowStyle}>
                    <View style={styles.itemLabel}>
                        <Text style={styles.labelStyle}>T/G hoạt động: </Text>
                    </View>
                    <View style={styles.itemValue}>
                        <Text
                            style={styles.valueStyle}>{AppUtil.timeStopString(this.props.screenProps.thong_tin_tong_hop.thoi_gian_hoat_dong)}</Text>
                    </View>
                </View>

                <View style={styles.rowStyle}>
                    <View style={styles.itemLabel}>
                        <Text style={styles.labelStyle}>T/G dừng đỗ: </Text>
                    </View>
                    <View style={styles.itemValue}>
                        <Text
                            style={styles.valueStyle}>{AppUtil.timeStopString(this.props.screenProps.thong_tin_tong_hop.thoi_gian_dung_do)}</Text>
                    </View>
                </View>

                <View style={styles.rowStyle}>
                    <View style={styles.itemLabel}>
                        <Text style={styles.labelStyle}>Số lần dừng: </Text>
                    </View>
                    <View style={styles.itemValue}>
                        <Text style={styles.valueStyle}>{this.props.screenProps.thong_tin_tong_hop.so_lan_dung + ' lần'}</Text>
                    </View>
                </View>


                <View style={styles.rowStyle}>
                    <View style={styles.itemLabel}>
                        <Text style={styles.labelStyle}>Số lần vượt tốc: </Text>
                    </View>
                    <View style={styles.itemValue}>
                        <Text
                            style={styles.valueStyle}>{this.props.screenProps.thong_tin_tong_hop.so_lan_vuot_toc + ' lần'}</Text>
                    </View>
                </View>

                <View style={styles.rowStyle}>
                    <View style={styles.itemLabel}>
                        <Text style={styles.labelStyle}>Quá thời gian: </Text>
                    </View>
                    <View style={styles.itemValue}>
                        <Text
                            style={styles.valueStyle}>{this.props.screenProps.thong_tin_tong_hop.qua_thoi_gian + ' lần'}</Text>
                    </View>

                </View>

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dadada',
    },
    titleContainer: {
        marginTop:25,
        marginBottom:10
    },
    titleTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    rowStyle: {
        flexDirection: 'row',
        padding: 5

    },
    itemLabel: {
        flex: 1,
        paddingLeft:20
    },
    labelStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemValue: {
        flex: 1,
    },
    valueStyle: {
        fontSize: 16,
        fontWeight:'200'
    },
    splitterStyle: {
        borderTopWidth:1,
        marginLeft: 20,
        marginRight:20,
        marginTop:10,
        marginBottom:10,
        borderColor: '#9a0930'
    }


});

module.exports = GenaralHistory;