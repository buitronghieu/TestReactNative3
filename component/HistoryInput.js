/**
 * Created by HungDang on 8/28/2017.
 */
import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-datepicker';
var moment = require('moment');
class HistoryInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
            endDate: new Date(Date.now()),

        }
    }

    render() {
        return (
            <View style={styles.containerFilter}>
                <DateTimePicker
                    style={styles.datebox}
                    date={this.state.beginDate}
                    confirmBtnText="Chọn"
                    cancelBtnText="Bỏ qua"
                    format="DD/MM/YYYY HH:mm"
                    mode="datetime"
                    androidMode='spinner'
                    customStyles={{
                        dateInput: {
                            borderWidth: 0,
                            marginTop: 10,
                            padding: 1
                        },
                        dateText: {
                            color: '#808080',
                            fontWeight: 'bold',
                            paddingLeft: 2,
                            textAlign: 'center',
                        },
                        dateIcon: {
                            marginTop: 10,
                        }
                    }
                    }
                    onDateChange={(date) => {
                        this.setState({beginDate: date})
                    }}
                />
                <View style={{width: 4}}/>
                <DateTimePicker
                    style={[styles.datebox]}
                    date={this.state.endDate}
                    confirmBtnText="Chọn"
                    cancelBtnText="Bỏ qua"
                    format="DD/MM/YYYY HH:mm"
                    mode="datetime"
                    androidMode='spinner'
                    customStyles={{
                        dateInput: {
                            borderWidth: 0,
                            marginTop: 10,
                            padding: 1

                        },
                        dateText: {
                            color: '#808080',
                            fontWeight: 'bold',
                            paddingLeft: 2,
                            textAlign: 'center',

                        },
                        dateIcon: {
                            marginTop: 10,
                        }
                    }}
                    onDateChange={(date) => {
                        this.setState({endDate: date});
                    }
                    }
                />
                <TouchableOpacity style={styles.btnXem} onPress={() => this.handleXem()}>
                    <Image
                        source={require('../assets/timkiem.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    handleXem() {
        if (!this.props.historyScreen.state.isLoading){
            let timebegin = moment(this.state.beginDate, 'DD/MM/YYYY HH:mm');
            let timeend = moment(this.state.endDate, 'DD/MM/YYYY HH:mm');
            let zoneTime = 0;
            this.props.historyScreen.showHistory(timebegin.unix() + zoneTime, timeend.unix() + zoneTime);
        }
    }
}
const styles = StyleSheet.create({
    containerFilter: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 10,
        marginRight: 10,

    },
    datebox: {
        flex: 1,
        backgroundColor: '#e8e8e8',
        borderRadius: 5,
    },
    btnXem: {
        height: 50,
        width: 50,
        backgroundColor: '#e8e8e8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 3


    },
    image: {
        height: 24,
        width: 24
    }
});
module.exports = HistoryInput;