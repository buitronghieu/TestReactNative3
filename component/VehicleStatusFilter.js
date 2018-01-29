import React from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet, Text} from 'react-native';
var VehicleStatusFilterItem = require('./VehicleStatusFilterItem');
class VehicleStatusFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle_status: 'TAT_CA',
        };
    }

    onSelect(value) {
        this.setState({vehicle_status: value,});
        this.props.onChangeVehicleStatusFilter(value);
    }

    render() {
        return (
            <View>
                <ScrollView style={[styles.scrollContainer, this.props.style]} horizontal={true}>
                    <VehicleStatusFilterItem
                        selectedStatus={this.state.vehicle_status}
                        selectedColor='#25c7c0'
                        value='TAT_CA' label='Tất Cả' number={this.props.total_by_status.TAT_CA}
                        onPress={(value) => {
                            this.onSelect(value)
                        }}/>
                    <VehicleStatusFilterItem
                        selectedStatus={this.state.vehicle_status}
                        selectedColor='#1dc710'
                        value='DI_CHUYEN' label='Xe Chạy' number={this.props.total_by_status.DI_CHUYEN}
                        onPress={(value) => {
                            this.onSelect(value)
                        }}/>
                    <VehicleStatusFilterItem
                        selectedStatus={this.state.vehicle_status}
                        selectedColor='#d50e42'
                        value='VUOT_TOC' label='Vượt Tốc' number={this.props.total_by_status.VUOT_TOC}
                        onPress={(value) => {
                            this.onSelect(value)
                        }}/>
                    <VehicleStatusFilterItem
                        selectedStatus={this.state.vehicle_status}
                        selectedColor='#ede008'
                        value='DUNG_BAT_MAY' label='Dừng/Nổ Máy' number={this.props.total_by_status.DUNG_BAT_MAY}
                        onPress={(value) => {
                            this.onSelect(value)
                        }}/>
                    <VehicleStatusFilterItem
                        selectedStatus={this.state.vehicle_status}
                        selectedColor='#e22727'
                        value='DUNG_TAT_MAY' label='Dừng/Tắt Máy' number={this.props.total_by_status.DUNG_TAT_MAY}
                        onPress={(value) => {
                            this.onSelect(value)
                        }}/>
                    <VehicleStatusFilterItem
                        selectedStatus={this.state.vehicle_status}
                        selectedColor='#7f51de'
                        value='MAT_TIN_HIEU' label='Mất Tín Hiệu' number={this.props.total_by_status.MAT_TIN_HIEU}
                        onPress={(value) => {
                            this.onSelect(value)
                        }}/>
                    <VehicleStatusFilterItem
                        selectedStatus={this.state.vehicle_status}
                        selectedColor='#25c7c0'
                        value='QUA_GIO_CHAY' label='Quá Thời Gian' number={this.props.total_by_status.QUA_GIO_CHAY}
                        onPress={(value) => {
                            this.onSelect(value)
                        }}/>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    scrollContainer: {
        height: 55,
        marginTop:10,
        // marginLeft:5,
        marginRight:10,
        backgroundColor: '#c20b3b',
    },
});

module.exports = VehicleStatusFilter;