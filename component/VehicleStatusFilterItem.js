import React from 'react';
import {TouchableOpacity, StyleSheet, Text, Image, View} from 'react-native';
var AppUtil = require('../common/AppUtil');
class VehicleStatusFilterItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            value: props.value,
            disable: false
        };
    }

    onPress() {
        if (!this.state.disable) {
            this.props.onPress(this.state.value);
        }
    }

    render() {
        return (
            <View style={styles.elementContainer}>
                <TouchableOpacity style={styles.statusContainer} onPress={this.onPress.bind(this)}>
                    {/*<View style={styles.imageContainer}>*/}
                        <Image style={styles.imageStatus}
                               source={AppUtil.getStateIcon(this.props.value)}/>
                    {/*</View>*/}
                    <Text
                        style={this.props.value === this.props.selectedStatus ? this.selectedStyle() : this.deselectedStyle()}>{this.props.label + ": " + this.props.number}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    selectedStyle = function () {
        this.state.disable = true;
        return {
            color: this.props.selectedColor,
            textAlign: 'center',
        }
    }
    deselectedStyle = function () {
        this.state.disable = false;
        return {
            color: '#2b2b2b',
            textAlign: 'center',
        }
    }
}

const styles = StyleSheet.create({
    elementContainer: {
        marginLeft: 10,
        width: 150,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    statusContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#2b2b2b',
        padding:3
    },
    imageStatus: {
        width: 30,
        height: 30,
    },
    textStatus: {
        color: 'white',
        textAlign: 'center',
    },
});

module.exports = VehicleStatusFilterItem;